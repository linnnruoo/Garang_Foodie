import React from 'react';
import {Icon, Container, Content, Button, Text} from 'native-base'

export default class NoAuth extends React.Component {

  render() {
    return (
      <Container>
        <Content>
          <Button onPress={() => this.props.navigation.navigate('Signup')}>
            <Text>Sign Up</Text>
          </Button>
          <Button onPress={() => this.props.navigation.navigate('Login')}>
            <Text>Login</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
