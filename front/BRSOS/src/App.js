import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  View
} from 'react-native';

import Login from './components/Login';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Login />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});