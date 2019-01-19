import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Signup extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text>HELOOW</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Signup;
