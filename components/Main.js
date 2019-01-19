import React from 'react';
import { Platform } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import MyListContainer from './MyListContainer';
import MarketplaceContainer from './MarketplaceContainer'
import {Icon, Button} from 'native-base'

export default class Main extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "GarangFoodies",
    headerRight: (
      <Icon
        name="ios-person"
        onPress={() => {
          navigation.navigate('Login');
        }}
        style={{color: 'black', marginRight: 20}}
      />
    ),
  });

  render() {
    return (
      <>
        <TabContainer/>
      </>
    );
  }
}

const AppTabNavigator = createBottomTabNavigator({
  Marketplace: {
    screen: MarketplaceContainer
  },
  "My Food": {
    screen: MyListContainer
  }, 
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