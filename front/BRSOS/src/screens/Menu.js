import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

export default class Menu extends Component {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'logout') {
        AsyncStorage.removeItem('token')
        //AsyncStorage.removeItem('user')

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

        <TouchableHighlight
         style={styles.button}
         onPress={this.onPress}
        >
          <Text style={styles.textButton}> CADASTRE OCORRÊNCIAS </Text>
        </TouchableHighlight>

        <TouchableHighlight
         style={[ {marginTop: 40}, styles.button ]}
         onPress={this.onPress}
        >
          <Text style={styles.textButton}> VISUALIZE OCORRÊNCIAS </Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#F5FCFF',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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