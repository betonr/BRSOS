import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

export default class Cadastro extends Component {

  constructor(props) {
    super(props);
    
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.props.navigator.setStyle({
      navBarBackgroundColor: '#7188AD',
      navBarTextColor: '#FFFFFF'
    });
    this.props.navigator.setButtons({
      rightButtons: [
        { 
          id: 'logout', 
          title: 'Logout' 
        }
      ]
    });
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'logout') {
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('user')

        this.props.navigator.resetTo({
          screen: 'Login',
          title: 'Login',
        })
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={ {color: '#FFFFFF'} }> cadastro </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#304A73',
    alignItems: 'center',
    flex: 6
  }
});