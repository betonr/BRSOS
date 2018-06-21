import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import t from 'tcomb-form-native';
import _ from 'lodash';

const Form = t.form.Form;
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

const loginStruct = t.struct({
  email: t.String,
  password: t.String
});

const options = {
  fields: {
    email: {
      label: 'E-mail',
      placeholder: 'Seu e-mail',
      error: 'Esse campo não pode ser nulo',
      autoCapitalize: 'none',
      stylesheet: stylesheet
    },
    password: {
      label: 'Senha',
      password: true,
      error: 'Digite sua senha',
      secureTextEntry: true,
      autoCapitalize: 'none',
      stylesheet: stylesheet
    }
  }
}

import Authentication from '../middlewares/Authentication'
export default class Login extends Component {
  componentDidMount() {
    this.refs.login.getComponent('email').refs.input.focus();
  }

  constructor(props) {
    super(props)
    this.state = {
      infos: {
        email: '',
        password: ''
      }
    }
    this.props.navigator.setStyle({
      navBarBackgroundColor: '#7188AD'
    });
  }
  
  onChange(infos) {
    this.setState({infos});
  }

  async login() {
    try {
      let infos = this.refs.login.getValue();
      
      if(infos != null && infos.email != '' && infos.password != ''){
        const response = await Authentication.login(infos)

        AsyncStorage.setItem('token', response.data.token)
        AsyncStorage.setItem('user', response.data.me._id)

        this.props.navigator.resetTo({
          screen: 'Menu',
          title: 'Home' 
        })
      }   

    } catch (error){
      if(typeof error.response.data.errors[0] !== 'undefined' || typeof error.response !== 'undefined'){
        alert(error.response.data.errors[0].messages)
      }else {
        alert('Erro interno, entre em contato com os administradores!')
      }
      
    }
  }  

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          BR-SOS
        </Text>
        <Text style={styles.subtitle}>
          Ajudando a Comunidade
        </Text>

        <Form 
          ref="login" 
          type={loginStruct} value={this.state.infos} onChange={this.onChange.bind(this)}
          style={{ marginTop: 50, color: 'red' }} options={options} />

        <TouchableHighlight style={styles.button} onPress={this.login.bind(this)} underlayColor='#6F9E38'>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1
  },
  title: {
    fontSize: 40,
    color: 'red',
    textAlign: 'center',
    marginTop: 10
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 60
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 40,
    backgroundColor: '#589836',
    borderColor: '#5B8E00',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});