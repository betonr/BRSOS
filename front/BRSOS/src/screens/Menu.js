import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'; 

export default class Menu extends Component {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.props.navigator.setStyle({
      navBarBackgroundColor: '#7188AD',
    });
    this.props.navigator.setButtons({
      rightButtons: [
        { id: 'logout', 
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

        <Icon.Button style={styles.button} name="add" size={40} backgroundColor="#0B1D3B" onPress={this.onPress}>
          <Text style={styles.textButton}> CADASTRE OCORRÊNCIAS </Text>
        </Icon.Button>

        <Text style={styles.divisoria}></Text>

        <Icon.Button style={styles.button} name="search" size={40} backgroundColor="#000000" onPress={this.onPress}>
          <Text style={styles.textButton}> VISUALIZE OCORRÊNCIAS </Text>
        </Icon.Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#304A73',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divisoria: {
    paddingBottom: 30
  },
  button: {
    borderRadius: 10,
    padding: 40,
    paddingBottom: 60,
    paddingTop: 60
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold'
  }
});