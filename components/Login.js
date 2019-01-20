import React, { Component } from 'react';
import fire from '../services/FireService';
import Toast, { DURATION } from 'react-native-easy-toast'
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { Container, Header, Content, Item, Input, Icon } from 'native-base';

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
        this.refs.toast.show("Welcome back!", DURATION.LENGTH_SHORT);
        fire.auth().onAuthStateChanged((user) => {
          if (user) {
            this.props.navigation.navigate('Main')
          }
        })
      })
      .catch((err) => {
      this.refs.toast.show(err.message, DURATION.LENGTH_LONG);
    })
  }

  render() {
    return(
      <Container>
        <Content>
          <Text>Login</Text>
          <Item>
            <Input
              value={this.state.email}
              onChangeText={this._onChangeText('email')}
              placeholder="Email"
            />
          </Item>
          <Item>
            <Input
              secureTextEntry
              value={this.state.password}
              onChangeText={this._onChangeText('password')}
              placeholder="Password"
            />
          </Item>
          <Button title="Login" onPress={this._loginUser} />
        </Content>
        <Toast ref="toast" />
      </Container>
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
