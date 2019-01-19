import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImageSelectContainer from './components/ImageContainer/ImageContainer';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageSelectContainer/>
      </View>
    );
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
