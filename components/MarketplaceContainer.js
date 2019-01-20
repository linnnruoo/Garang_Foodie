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
    let childPromises = [];

    const storeRef = fire.storage().ref().child('images/');
    const dbRef = fire.database().ref('/posts');

    dbRef.once('value').then((snapshot) => {
      snapshot.forEach((child) => {
        if (child.isListed) {
          childPromises.push(storeRef.child(child.val().image).getDownloadURL());
          temp.push(child.val());
        }
      });

      Promise.all(childPromises).then((response) => {
        for (let i = 0; i< response.length; i++){
          temp[i].image = response[i];
        }
        this.setState(() => ({
          posts: temp,
        }));
      });
    })
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    return (
      <Container>
        <Content>
          {
            (this.state.posts).map((post, index) => {
              return (<EntryTile key={index} post={post} />)
            })
          }
        </Content>
      </Container>
    )

  }
}
