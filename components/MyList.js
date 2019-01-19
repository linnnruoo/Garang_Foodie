import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, Container, Header, Content } from 'native-base'
import EntryTile from './EntryTile'

export default class MyList extends React.Component {

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon type="FontAwesome" name="spoon" style={{ color: tintColor }} />
    )
  }

  render() {
    return (
      <Container>
        <Content>
          <EntryTile />
          <EntryTile />
          <EntryTile />
        </Content>
      </Container>
    );
  }
}
