import React, { Component } from 'react';
import fire from '../services/FireService';
import Toast, { DURATION } from 'react-native-easy-toast'
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { Card, CardItem, Icon, Left, Container} from 'native-base'

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
            this.props.navigation.goBack();
          }
        })
      })
      .catch((err) => {
      this.refs.toast.show(err.message, DURATION.LENGTH_LONG);
    })
  }

  render() {
    return(
      <Container style={styles.container}>
        <Card style={{width: '80%', height: 200}}>

        <CardItem>
          <Left>
            <Icon type="SimpleLineIcons" name="user" style={{ fontSize: 24, color: "gray", marginRight: 10 }} />
            <Text style={{ fontWeight: 'bold'}}>Login</Text>
          </Left>
        </CardItem>

        <CardItem style={{ width: '100%', display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
          <View style={{ display: 'flex',flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 0}}>
            <TextInput
              value={this.state.email}
              onChangeText={this._onChangeText('email')}
              placeholder="Email"
            />
          </View>

          <View style={{ display: 'flex',flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 0}}>
            <TextInput
              secureTextEntry
              value={this.state.password}
              onChangeText={this._onChangeText('password')}
              placeholder="Password"
            />
          </View>
        </CardItem>

        <CardItem footer>
          <Button title="Login" onPress={this._loginUser} style={{color: '#FFB238'}} />
        </CardItem>

        </Card>

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
