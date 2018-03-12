import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Menu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          BR-SOS
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});