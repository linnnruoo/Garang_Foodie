import React, { Component } from 'react';
import fire from './fire';
import Toast, { DURATION } from 'react-native-easy-toast'
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      name: ''
    }
    this._onChangeText = this._onChangeText.bind(this);
    this._signupUser = this._signupUser.bind(this);
  }

  _onChangeText = (input_field) => (text) => {
    this.setState({ [input_field]: text });
  }

  _signupUser = () => {
    fire
      .auth()
      .createUserWithEmailAndPassword(
        this.state.email,
        this.state.password
      )
      .then((res) => {
        this.refs.toast.show('Registered Successfully!', DURATION.LENGTH_SHORT);
        this.props.navigation.navigate('Profile');
      })
      .catch((err) => {
        this.refs.toast.show(err.message, DURATION.LENGTH_LONG);
      })
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>SIGN UP</Text>
        <TextInput
          value={this.state.email}
          onChangeText={this._onChangeText('email')}
          placeholder="Enter your email here"
        />
        <TextInput
          secureTextEntry
          value={this.state.password}
          onChangeText={this._onChangeText('password')}
          placeholder="Enter your password here"
        />
        <Button title="Sign Up" onPress={this._signupUser} />
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

export default Signup;
