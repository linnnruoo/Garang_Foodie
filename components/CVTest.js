import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Right, Body, Spinner, Container, Content, Badge } from 'native-base'
import { AppLoading } from 'expo'
import { ImagePicker, Permissions } from 'expo';
import { retrieveTags } from './../services/VisionService';
import * as _ from 'lodash';
import uuid from 'react-native-uuid';
import fire from '../services/FireService'

class CVTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      image: null,
      uploading: false,
      tags: [],
      filtered_tags: []
    };
    this._onSubmit = this._onSubmit.bind(this);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    })
    this.setState({loading: false})
  }

  _urlToBlob = (url) => { 
    return new Promise((resolve, reject) => { 
      var xhr = new XMLHttpRequest(); 
      xhr.onerror = reject; 
      xhr.onreadystatechange = () => { 
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        } 
      }; 
      xhr.open('GET', url); 
      xhr.responseType = 'blob'; 
      xhr.send();
    }) 
  }

  _onSubmit = async () => {
    const user = fire.auth().currentUser;
    const blob = await this._urlToBlob(this.state.image);
    const uuidStr = uuid.v1();
    fire.storage().ref().child('images/' + uuidStr).put(blob, {}).then((snapshot) =>{
      console.log('File uploaded');
      fire.database().ref('posts/').push({
        image: uuidStr,
        tags: this.state.tags,
        expiry_date: "2 days",
        user_id: user.uid,
        owner: user.displayName,
        photoURL: user.photoURL
        
      })
      .then(() => {
        console.log("success");
        this.props.navigation.navigate('Main');
      })
      .catch((err) => console.log(err));  
    })
    .catch((err) => console.log(err));
  }

  render() {
    let { image, tags } = this.state;

    const formatTags = () => {
      return (<>{
        _.map(tags, (tag) => {
          if (parseFloat(tag.confidence) > 0.5) {
            return (
              <Badge key={tag.name} primary style={{ margin: 3}}>
                <Text key={tag.name}>{tag.name}</Text>
              </Badge>
            );
          }
        })
      }</>)
    };

    const displayCard = (
      <>
        <CardItem cardBody>
        {
          image &&
          <Image source={{ uri: image }}  style={{height: 200, width: null, flex: 1}}/>
        }
        </CardItem>
        
        {
          image &&
          <CardItem cardBody>
            <Body style={{ display: 'flex',flex: 1, flexDirection: 'row', width: '100%', flexWrap: 'wrap'}}>
            {tags ? tags.length > 0 ? formatTags() : (<Spinner color='blue'/>) : (<></>)}
            </Body>
          </CardItem>
        }
        {
          image &&
          <CardItem footer>
            <Button onPress={this._onSubmit}>
              <Text>Submit</Text>
            </Button>
          </CardItem>
        }
      </>
    )

    if (this.state.loading) {
      return <AppLoading />
    } else {
      return (
        <Container>
          <Content>
          <Card>
            <CardItem>
              <Left style={{ display: 'flex', flex: 1 }}>
                <Icon type="FontAwesome" name="image" style={{ fontSize: 24, color: "gray" }} />
                <Text style={{ fontWeight: 'bold' }}>Take a picture</Text>
              </Left>
              <Right>
                <Button
                  onPress={this._takePhoto} >
                  <Text>Pick an image</Text>
                </Button>
              </Right>
            </CardItem>
            {displayCard}
          </Card>
        </Content>
        </Container>
      );
    }
  }

  _takePhoto = async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (!pickerResult.cancelled) {
        this.setState(
          {
            image: pickerResult.uri
          }, () => {
            this._processPhoto();
          });
      }
    }
  };

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _processPhoto = async () => {
    //const string = await this.state.imageBase64String;
    //console.log(this.state.imageBase64String.length);
    console.log("trying");
    try {
      console.log("calling");
      const result = await retrieveTags(this.state.image);
      this.setState({
        tags: result
      });
      console.log("done");
    }
    catch {

    }
  };
}



const styles = StyleSheet.create({
});

export default CVTest;