import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Icon, Container, Content, Button, Text} from 'native-base'
import fire from '../services/FireService';
import { AppLoading } from 'expo'
import EntryTile from './EntryTile';

export default class Marketplace extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    }
  }

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon type="FontAwesome" name="shopping-bag" style={{color: tintColor}}/>
    )
  }

  componentDidMount= () => {
    this.authSubscription = fire.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    if(this.state.loading) return <AppLoading />

    if (this.state.user) return (
      <Container>
        <Content>
          <EntryTile />
          <EntryTile />
        </Content>
      </Container>
    )

    return (
      <Container>
        <Button onPress={() => this.navigation.navigate('Signup')}>
          <Text>Sign Up</Text>
        </Button>
        <Button onPress={() => this.navigation.navigate('Login')}>
          <Text>Login</Text>
        </Button>
      </Container>
    );
  }
}
