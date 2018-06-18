import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage,
  Picker,
  Dimensions
} from 'react-native';

const width = Dimensions.get('screen').width;
import Ocorrencias from '../middlewares/Ocorrencias'
export default class Cadastro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spinnerAnimating: false,
      descricao: '',
      gravidade:'',
      vitimas:'',
      coordinates: []
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

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ coordinates: [position.coords.longitude, position.coords.latitude] });
      },
      _ => alert('ATIVE SEU GPS / LOCALIZAÇÃO'),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    )
  }

  componentDidMount() {
    this.getLocation()
  }

  async cadastrar() {
    try {
      this.setState({ spinnerAnimating: true })
      
      if( this.state.descricao!= '' || this.state.vitimas != '' || this.state.gravidade != ''){
        let user = await AsyncStorage.getItem('user')

        let ocorrencia = {
          "description": this.state.descricao,
	        "category": parseInt(this.state.gravidade),
	        "coordinates": this.state.coordinates,
	        "user": user,
	        "victims": this.state.vitimas
        }
        let response = await Ocorrencias.register(ocorrencia);
        
        alert('Cadastro realizado com sucesso!')
        this.props.navigator.push({
          screen: 'Menu',
          title: 'Home'
        })

      }else{
        alert('preencha corretamente os campos')
      }   
      setTimeout(() => this.setState({ spinnerAnimating: false }), 1000)   

    }catch (error){
      setTimeout(() => this.setState({ spinnerAnimating: false }), 1000)
      alert(error.response.data.errors[0].messages)
      this.getLocation()
    }
  }
 
  render() {
      return (
        <View style={styles.container}>
          <View style={styles.form}>
  
              <Text style={styles.label}>
              Descrição do acidente
              </Text>  
              <TextInput style={styles.input}
                placeholder="Digite aqui..."
                onChangeText={texto => this.setState({ descricao: texto })}/>
               
              <Text style={styles.divisoria}></Text>

              <Text style={styles.label}>
              Número de Vítimas
              </Text>
              <TextInput style={styles.input}
                placeholder="Digite aqui..."
                keyboardType = 'numeric'
                onChangeText={texto => this.setState({ vitimas: texto })}/>

              <Text style={styles.divisoria}></Text>

              <Picker
                selectedValue={this.state.gravidade}
                onValueChange={(itemValue, _) => this.setState(infos = {...this.state.infos, gravidade: itemValue })}>
                <Picker.Item label="<Selecione a Gravidade>" value="grave" />
                <Picker.Item label="Grave" value="3" />
                <Picker.Item label="Médio" value="2" />
                <Picker.Item label="Leve" value="1" />
            </Picker>

            <Text style={styles.divisoria}></Text>

              <ActivityIndicator size="large" color="#589836" animating={this.state.spinnerAnimating} />
                
              <TouchableHighlight style={styles.button} onPress={this.cadastrar.bind(this)} underlayColor='#6F9E38'>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableHighlight>
              </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 25,
  },
  title: {
    fontSize: 40,
    color: 'red',
    textAlign: 'center',
    marginTop: 5
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40
  },
  label: {
    color: 'black',
    fontSize: 20,
    textAlign: 'left',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
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
  },
  Buttonloc: {
    height: 10,
    width: width * 0.7,
    backgroundColor: '#589836',
    borderColor: '#5B8E00',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form:{
    width: width * 0.9
  },
  input:{
    height:40
  },
  divisoria: {
    paddingBottom: 35
  }
});