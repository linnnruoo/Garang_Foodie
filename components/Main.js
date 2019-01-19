import React from 'react';
import { Platform } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import MyList from './MyList';
import Marketplace from './Marketplace'
import {Icon} from 'native-base'

export default class Main extends React.Component {
  static navigationOptions = {
    title: "GarangFoodies",
    headerRight: <Icon name="ios-person" style={{paddingRight: 8,}}/>
  }

  render() {
    return (
      <TabContainer/>
    );
  }
}

const AppTabNavigator = createBottomTabNavigator({
  "My Food": {
    screen: MyList
  }, 
  Marketplace: {
    screen: Marketplace
  }
}, {
  swipeEnabled: true,
  tabBarOptions: {
    style:{
      ...Platform.select({
        android:{
          backgroundColor:'white'
        }
      })
    }
  },
  showIcon: true
})

const TabContainer = createAppContainer(AppTabNavigator)