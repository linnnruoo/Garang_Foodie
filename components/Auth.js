import React from 'react';
import {Icon, Container, Content, Button, Text, Spinner} from 'native-base'
import fire from '../services/FireService';

export default class Auth extends React.Component {
  constructor() {
    super()
    this.state = { 
      loading: true 
    }
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

  _onLogout = () => {
    fire.auth().signOut()
      .then(() => this.props.navigation.navigate('Main'))
      .catch((err) => console.log(err))
  }

  render() {
    if(this.state.loading) return <Spinner />

    const authenticated = (
      <Button onPress={this._onLogout}>
        <Text>Log Out</Text>
      </Button>
    )

    const unauthenticated = (
      <>
        <Button onPress={() => this.props.navigation.navigate('Signup')}>
          <Text>Sign Up</Text>
        </Button>
        <Button onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Login</Text>
        </Button>
      </>
    )
    return (
      <Container>
        <Content>
        {
          (this.state.user) ? authenticated : unauthenticated
        }
        </Content>
      </Container>
    );
  }
}
