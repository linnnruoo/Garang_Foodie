import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Container, Header, Button, Right, Content, Text } from 'native-base'
import EntryTile from './EntryTile'
import { AppLoading } from 'expo'

export default class MyList extends React.Component {
  constructor() {
    super()
    this.state = { 
      loading: true 
    }
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon type="FontAwesome" name="spoon" style={{ color: tintColor }} />
    )
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    })
    this.setState({ loading: false })
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />
    } else {
      return (
      <Container>
        <Content>
          <EntryTile />
          <EntryTile />
          <EntryTile />
        </Content>
        <TouchableOpacity onPress={() => {}} style={styles.addButton}>
          <Icon name="add" style={styles.icon} />
        </TouchableOpacity>
      </Container>
    );
  }
}
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 20,
    backgroundColor: '#e91e62',
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
  },
  icon: {
    color: '#fff',
  }
});
