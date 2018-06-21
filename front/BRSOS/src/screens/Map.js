import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import {
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native';

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }

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

  render() {
    return (
      <View style ={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        ></MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
});
