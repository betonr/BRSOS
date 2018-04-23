import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Menu extends Component {

  constructor(props) {
    super(props);
    
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.props.navigator.setStyle({
      navBarBackgroundColor: '#7188AD'
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

  getCadastro() {
    this.props.navigator.push({
      screen: 'Cadastro',
      title: 'Cadastre ocorrências'
    })
  }

  render() {

    return (
      <View style={ styles.container }>
        
        <TouchableHighlight >
          <Icon.Button style={styles.button} name="add" size={40} backgroundColor="#0B1D3B" onPress={ () => this.getCadastro() }>
            <Text style={styles.textButton}> CADASTRE OCORRÊNCIAS </Text>
          </Icon.Button>
        </TouchableHighlight>

        <Text style={styles.divisoria}></Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: 'center',
    flex: 6
  },
  divisoria: {
    paddingBottom: 30
  },
  button: {
    borderRadius: 10,
    padding: 20,
    paddingBottom: 25,
    paddingTop: 25
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold'
  }
});