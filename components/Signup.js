import React, { Component } from 'react';
import fire from '../services/FireService';
import Toast, { DURATION } from 'react-native-easy-toast'
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { Card, CardItem, Icon, Left, Container} from 'native-base'

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
        fire.auth().onAuthStateChanged((user) => {
          if (user) {
            this.props.navigation.navigate('Profile')
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
            <Icon type="SimpleLineIcons" name="user-follow" style={{ fontSize: 24, color: "gray", marginRight: 10 }} />
            <Text style={{ fontWeight: 'bold'}}>Sign Up</Text>
          </Left>
        </CardItem>

        <CardItem style={{ width: '100%', display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
          <View style={{ display: 'flex',flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 0}}>
            <Icon type="MaterialCommunityIcons" name="email" style={{ fontSize: 24, color: "gray" }} /><TextInput
              value={this.state.email}
              onChangeText={this._onChangeText('email')}
              placeholder="Enter your email here"
              style={{flex: 1}}
            />
          </View>

          <View style={{ display: 'flex',flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Icon type="MaterialCommunityIcons" name="textbox-password" style={{ fontSize: 24, color: "gray" }} />
            <TextInput
              secureTextEntry
              value={this.state.password}
              onChangeText={this._onChangeText('password')}
              placeholder="Enter your password here"
              style={{display:'flex'}}
            />
          </View>

        </CardItem>
        <CardItem footer>
          <Button title="Sign Up" onPress={this._signupUser} />
        <Toast ref="toast" />

        </CardItem>
      </Card>
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

export default Signup;
