import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Cadastro from './components/Cadastro';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Cadastro />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  }
});