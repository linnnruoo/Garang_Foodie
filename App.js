
/**
 * @source: https://reactnavigation.org/docs/en/hello-react-navigation.html
 */

import React from 'react';
import { View, Text, Button, StyleSheet } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from './components/Main';
import SignupScreen from './components/signup/Signup';
import LoginScreen from './components/login/Login';
import ProfileScreen from './components/profile/Profile';

class HomeScreen extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Main: { screen: Main },
    Signup: { screen: SignupScreen },
    Login: { screen: LoginScreen },
    Profile: { screen: ProfileScreen },
  },
  {
    initialRouteName: "Main"
  }
);

const AppContainer = createAppContainer(AppNavigator)

export default HomeScreen;
