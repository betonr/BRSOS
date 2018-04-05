import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native';

import Login from './screens/Login';
import Menu from './screens/Menu';

export default () => {

  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('Menu', () => Menu);

  AsyncStorage.getItem('token')
    .then(token => {
      if(token) {
        return {
          screen: 'Menu',
          title: 'Menu'
        }
      }

      return {
        screen: 'Login',
        title: 'Login'
      }
    })
    .then( screen => Navigation.startSingleScreenApp({screen}) );
}
