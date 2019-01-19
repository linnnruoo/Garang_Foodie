
/**
 * @source: https://reactnavigation.org/docs/en/hello-react-navigation.html
 */

import React from 'react';
import { View, Text, Button, StyleSheet } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SignupScreen from './components/signup/Signup';
import LoginScreen from './components/login/Login';

class HomeScreen extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </View>
    );
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

const AppNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Signup: { screen: SignupScreen },
    Login: { screen: LoginScreen }
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);
