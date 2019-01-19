import React, { Component } from 'react';
import fire from '../fire';
import uuid from 'react-native-uuid'
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    }
    this._onChangeText = this._onChangeText.bind(this);
    this._loginUser = this._loginUser.bind(this);
  }

  _onChangeText = (input_field) => (text) => {
    this.setState({ [input_field]: text });
  }

  _loginUser = () => {
    fire.database().ref('users/').push({
      id: id,
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    }, () => {
      Alert.alert('Registered!');
      console.log("test")
    })
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>Login</Text>
        <TextInput
          value={this.state.email}
          onChangeText={this._onChangeText('email')}
          placeholder="Email"
        />
        <TextInput
          secureTextEntry
          value={this.state.password}
          onChangeText={this._onChangeText('password')}
          placeholder="Password"
        />
        <Button title="Login" onPress={this._loginUser} />
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

export default Login;
