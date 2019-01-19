import React from 'react';
import { StyleSheet, Text, View, AlertButton } from 'react-native';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() => {}} />
    )
  }
}

export default HomeScreen;