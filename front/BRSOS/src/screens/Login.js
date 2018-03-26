import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

import t from 'tcomb-form-native';
const Form = t.form.Form;

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
      autoCapitalize: 'none'
    },
    password: {
      label: 'Senha',
      password: true,
      error: 'Digite sua senha',
      secureTextEntry: true,
      autoCapitalize: 'none'
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
      spinnerAnimating: false,
      infos: {
        email: '',
        password: ''
      }
    }
  }
  
  onChange(infos) {
    this.setState({infos});
  }

  async login() {
    try {
      let infos = this.refs.login.getValue();
      
      if(infos != null && infos.email != '' && infos.password != ''){
        this.setState({ spinnerAnimating: true })
        const response = await Authentication.login(infos)

        AsyncStorage.setItem('token', response.data.token)
        //AsyncStorage.setItem('user', response.data.me)

        this.props.navigator.resetTo({
          screen: 'Menu',
          title: 'Menu',
          rightButtons: [
            {
              title: 'Logout',
              id: 'logout',
              buttonColor: 'gray'
            }
          ]
        })
      }   

      this.setState({ spinnerAnimating: false })  

    }catch (error){
      this.setState({ spinnerAnimating: false })
      alert(error.response.data.errors[0].messages)
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
          style={{ marginTop: 50 }} options={options} />

        <ActivityIndicator size="large" color="#589836" animating={this.state.spinnerAnimating} />
        
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
    marginTop: 25,
    flex: 1,
    backgroundColor: '#F5FCFF'
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