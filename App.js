import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Main from './components/Main'

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
  }
})

const AppContainer = createAppContainer(AppNavigator)
