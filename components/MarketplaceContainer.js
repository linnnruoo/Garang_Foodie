import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Icon, Container, Content, Button, Text, Spinner} from 'native-base'
import fire from '../services/FireService';
import { AppLoading } from 'expo'
import EntryTile from './EntryTile';

export default class Marketplace extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      posts: []
    }
  }

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon type="FontAwesome" name="shopping-bag" style={{color: tintColor}}/>
    )
  }

  componentDidMount= () => {
    let temp = [];

    const dbRef = fire.database().ref('/posts');
    dbRef.once('value').then((snapshot) => {
      snapshot.forEach((child) => {
        temp.push(child.val());
      })

      this.setState({
        posts: temp
      })
    })
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    return (
      <Container>
        <Content>
          <EntryTile />
          {
            (this.state.posts).map((post, index) => {
              return (<EntryTile />)
            })
          }
        </Content>
      </Container>
    )

  }
}
