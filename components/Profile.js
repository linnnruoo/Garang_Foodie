import React, { Component } from 'react';
import fire from '../services/FireService';
import Toast, { DURATION } from 'react-native-easy-toast'
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      profile_url: ''
    }
    this._onChangeText = this._onChangeText.bind(this);
    this._updateProfile = this._updateProfile.bind(this);
  }

  _onChangeText = (input_field) => (text) => {
    this.setState({ [input_field]: text });
  }

  _updateProfile = () => {
    const user = fire.auth().currentUser;
    user.updateProfile({
      displayName: this.state.name,
      profile_url: this.state.profile_url
    }).then(() => {
      this.refs.toast.show('Updated Successfully!', DURATION.LENGTH_SHORT);
      this.props.navigation.navigate('Main')
    }).catch((err) => console.log(err))
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>Complete Your Profile</Text>
        <TextInput
          value={this.state.name}
          onChangeText={this._onChangeText('name')}
          placeholder="Enter your full name here"
        />
        <TextInput
          value={this.state.profile_url}
          onChangeText={this._onChangeText('profile_url')}
          placeholder="Give a profile url here"
        />
        <Button title="Update" onPress={this._updateProfile} />
        <Toast ref="toast" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Profile;
