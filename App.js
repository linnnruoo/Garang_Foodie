import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Main from './components/Main'
import Login from './components/Login'
import Signup from './components/Signup'
import CVTest from './components/CVTest'

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
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  },
  CVTest: {
    screen: CVTest
  }
})

const AppContainer = createAppContainer(AppNavigator)
