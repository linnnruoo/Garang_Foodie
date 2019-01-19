import React, { Component } from 'react';
import fire from '../fire';
import uuid from 'react-native-uuid'
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
    // const id = uuid.v1();
    // fire.database().ref('users/').push({
    //   id: id,
    //   email: this.state.email,
    //   password: this.state.password,
    //   name: this.state.name
    // }, () => {
    //   Alert.alert('Registered!');
    //   console.log("test")
    // })
    fire
      .auth()
      .createUserWithEmailAndPassword(
        this.state.email,
        this.state.password
      )
      .then((res) => {
        console.log("res!", res);
        Alert.alert("Registered successfully!");
      })
      .catch((err) => {
        console.log("error!", err);
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
        <TextInput
          value={this.state.name}
          onChangeText={this._onChangeText('name')}
          placeholder="Enter your full name here"
        />
        <Button title="Sign Up" onPress={this._signupUser} />
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
