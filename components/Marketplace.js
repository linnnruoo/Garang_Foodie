import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Icon} from 'native-base'


export default class Marketplace extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon type="FontAwesome" name="shopping-bag" style={{color: tintColor}}/>
    )
  }

  render() {
    return (
      <View>
        <Text>If its not authenticated, Sign up / Login</Text>
      </View>
    );
  }
}
