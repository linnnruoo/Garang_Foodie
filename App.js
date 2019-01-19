import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Main from './components/Main'
import Login from './components/Login'
import Signup from './components/Signup'
import CVTest from './components/CVTest'
import Auth from './components/Auth'
import Profile from './components/Profile'

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
  },
  Auth: {
    screen: Auth
  },
  Profile: {
    screen: Profile
  }
})

const AppContainer = createAppContainer(AppNavigator)
