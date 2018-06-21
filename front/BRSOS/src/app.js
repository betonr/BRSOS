import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native';

import Login from './screens/Login';
import Menu from './screens/Menu';
import Cadastro from './screens/Cadastro';
import Maps from './screens/Map';

export default () => {

  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('Menu', () => Menu);
  Navigation.registerComponent('Cadastro', () => Cadastro);
  Navigation.registerComponent('Map', () => Maps);

  AsyncStorage.getItem('token')
    .then(token => {
      if(token) {
        return {
          screen: 'Menu',
          title: 'Home'
        }
      }

      return {
        screen: 'Login',
        title: 'Login'
      }
    })
    .then( screen => Navigation.startSingleScreenApp({screen}) );
}
