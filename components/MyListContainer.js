import React from 'react';
import MyList from './MyList'
import CVTest from './CVTest'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import fire from '../services/FireService';
import {Icon, Button, Spinner} from 'native-base'
import NoAuth from './NoAuth';

export default class MyListContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    }
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon type="FontAwesome" name="spoon" style={{ color: tintColor }} />
    )
  }

  componentDidMount = () => {
    this.authSubscription = fire.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    if(this.state.loading) return <Spinner />

    if (this.state.user) return <ChildContainer />

    return <NoAuth />
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