import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body, Spinner, Container, Content, Badge } from 'native-base'
import { AppLoading } from 'expo'
import { ImagePicker, Permissions } from 'expo';
import { retrieveTags } from './../services/VisionService';
import * as _ from 'lodash';

class CVTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      image: null,
      uploading: false,
      tags: []
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    })
    this.setState({ loading: false })
  }

  render() {
    let { image, tags } = this.state;

    const formatTags = () => {
      return (<>{
        _.map(tags, (tag) => {
          console.log(tag.name, tag.confidence);
          if (Float(tag.confidence) > 0.5) {
          return (<Badge key={tag.name} primary style={{ margin: 3}}>
            <Text key={tag.name}>{tag.name}</Text>
            </Badge>);
          }
        })
      }</>)
    };
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
            <CardItem cardBody>
            {image &&
            <Image source={{ uri: image }}  style={{height: 200, width: null, flex: 1}}/>}
            </CardItem>
            {image &&
            <CardItem footer>
              <Body style={{ display: 'flex',flex: 1, flexDirection: 'row', width: '100%', flexWrap: 'wrap'}}>
              {tags ? tags.length > 0 ? formatTags() : (<Spinner color='blue'/>) : (<></>)}
              </Body>
            </CardItem>}
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
            image: pickerResult.uri,
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