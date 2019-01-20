import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Right, Body, Spinner, Container, Content, Badge, Picker } from 'native-base'
import { AppLoading } from 'expo'
import { ImagePicker, Permissions } from 'expo';
import { retrieveTags } from './../services/VisionService';
import * as _ from 'lodash';
import uuid from 'react-native-uuid';
import Toast, { DURATION } from 'react-native-easy-toast'
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
    Expo.Font.loadAsync({
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
    fire.storage().ref().child('images/' + uuidStr).put(blob, {}).then((snapshot) => {
      console.log('File uploaded');
      fire.database().ref('posts/').push({
        image: uuidStr,
        tags: this.state.tags,
        expiry_date: this.state.selected,
        user_id: user.uid,
        owner: user.displayName,
        photoURL: user.photoURL,
        selected : null
      })
        .then(() => {
          console.log("success");
          this.refs.toast.show('Submitted Successfully!', DURATION.LENGTH_SHORT);
          this.props.navigation.goBack();
          
        })
        .catch((err) => console.log(err));
    })
      .catch((err) => console.log(err));
  }

  _onPickerChange = (value) => {
    this.setState({
      selected: value
    });
  }

  render() {
    let { image, tags } = this.state;

    const formatTags = () => {
      return (<>{
        _.map(tags, (tag) => {
          if (parseFloat(tag.confidence) > 0.5) {
            return (
              <Badge key={tag.name} primary style={{ margin: 3 }}>
                <Text key={tag.name}>{tag.name}</Text>
              </Badge>
            );
          }
        })
      }</>)
    };

    const submitButton = () => {
      return (
        <>
        <CardItem style={{paddingBottom: 0, paddingBottom: 0}}>
          <Icon type="Feather" name="clock" style={{ fontSize: 24, color: "gray" }} />
          <Text>Select the expiry date: </Text>
          <Picker
              note
              mode="dropdown"
              style={{ width: 120, color: '#000000'}}
              selectedValue={this.state.selected}
              onValueChange={this._onPickerChange.bind(this)}
            >
              <Picker.Item label="24 Hours" value="24 Hours" />
              <Picker.Item label="2 Days" value="2 Days" />
              <Picker.Item label="3 Days" value="3 Days" />
              <Picker.Item label="5 Days" value="5 Days" />
              <Picker.Item label="A week" value="A week" />
          </Picker>
        </CardItem>
        <CardItem footer>
          <Button onPress={this._onSubmit}>
            <Text>Submit</Text>
          </Button>
        </CardItem>
        </>
        );
    }
    const displayCard = (
      <>
        <CardItem cardBody>
          {
            image &&
            <Image source={{ uri: image }} style={{ height: 200, width: null, flex: 1 }} />
          }
        </CardItem>

        {
          image &&
          <CardItem cardBody>
            <Body style={{ display: 'flex', flex: 1, flexDirection: 'row', width: '100%', flexWrap: 'wrap' }}>
              {tags ? tags.length > 0 ? formatTags() : (<Spinner color='blue' />) : (<></>)}
            </Body>
          </CardItem>
        }
        {
          tags ? (tags.length > 0 && image) ? submitButton() : (<></>) : (<></>)
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
            
            <Button onPress={() => this.props.navigation.goBack()} light={true}>
              <Text>Back</Text>
            </Button>
          </Content>
          <Toast ref="toast" />
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