import React from 'react';
import MyList from './MyList'
import CVTest from './CVTest'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import {Icon, Button} from 'native-base'

export default class MyListContainer extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon type="FontAwesome" name="spoon" style={{ color: tintColor }} />
    )
  }

  render() {
    return (
      <>
        <ChildContainer />
      </>
    );
  }
}

const ChildNavigator = createStackNavigator({
  MyList: {
    screen: MyList
  },
  CVTest: {
    screen: CVTest
  }
}, {
  headerMode: 'none',
})

const ChildContainer = createAppContainer(ChildNavigator)