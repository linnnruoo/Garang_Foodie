import React, { Component } from 'react';
import fire from '../fire';
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
    fire
      .auth()
      .signInWithEmailAndPassword(
        this.state.email,
        this.state.password
      )
      .then((res) => {
        console.log(res);
        Alert.alert("Logined!")
      })
      .catch((err) => {
      // Handle Errors here.
      var errorCode = err.code;
      var errorMessage = err.message;
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
