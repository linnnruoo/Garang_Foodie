import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Main from './components/Main'
import Signup from './components/Signup'
import Login from './components/Login'

export default class App extends React.Component {
  
  render() {
    return (
      <AppContainer/>
    );
  }
}

const AppNavigator = createStackNavigator({
  Main: {
    screen: Main
  },
  Signup: {
    screen: Signup
  },
  Login: {
    screen: Login
  }
})

const AppContainer = createAppContainer(AppNavigator)
