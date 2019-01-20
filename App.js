import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Main from './components/Main'
import Login from './components/Login'
import Signup from './components/Signup'
import Auth from './components/Auth'
import Profile from './components/Profile'

export default class App extends React.Component {
  
  render() {
    console.disableYellowBox = true;
    return (
      <AppContainer/>
    );
  }
}

const AppNavigator = createStackNavigator({
  Main: {
    screen: Main
  },
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  },
  Auth: {
    screen: Auth
  },
  Profile: {
    screen: Profile
  }
})

const AppContainer = createAppContainer(AppNavigator)
