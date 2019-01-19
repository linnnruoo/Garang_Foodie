import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { retrieveTags } from './../service/VisionService';
import * as _ from 'lodash';

class CVTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      uploading: false,
      tags: []
    };
  }
  render() {
    let { image, tags } = this.state;

    const formatTags = ()=> {
       return(<>{
       _.map(tags, (tag) => {
        //console.log(tag.name, tag.confidence);
        return(<Text key={tag.name}>{tag.name} : {tag.confidence}</Text>);  
      })
    }</>)
    };
    
    return (
      <>
        <Text>Select an image</Text>
        <Button
          title="Pick an image"
          onPress={this._takePhoto}
        />
        {image &&
          <Image source={{ uri: image }} style={{ paddingTop: 20, width: 300, height: 200 }} />}
        {image &&
                  <Button title="Get tags" onPress={this._processPhoto} />}
        { tags ? tags.length > 0 ? formatTags(): (<></>) : (<></>)}
      </>
    );
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
        aspect: [4, 3],
        base64: true
      });

      if (!pickerResult.cancelled) {
        this.setState(
          { 
            image: pickerResult.uri,
            imageBase64String: pickerResult.base64
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
    try {
      const result = await retrieveTags(this.state.image);
      this.setState({
        tags: result
      });
    }
    catch {
      
    }
  };
}



const styles = StyleSheet.create({
});

export default CVTest;