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
  Dimensions, 
  Button
} from 'react-native';


const width = Dimensions.get('screen').width;
export default class Cadastro extends Component {
  /*componentDidMount() {
    this.refs.cadastro.getComponent('descricao').refs.input.focus();
  }**/

  constructor(props) {
    super(props);
    this.state = {
      spinnerAnimating: false,
      infos: {
       descricao: '',
      }
    }
  }
  
async enviarLocalizacao(){
  alert('locaização enviada')
 
}

  async cadastrar() {
    try {
      this.setState({ spinnerAnimating: true })
      let infos = this.refs.cadastro.getValue();
      
      if(infos != null && infos.cadastro != ''){
        alert('Cadastradado !')
      }   

      setTimeout(() => this.setState({ spinnerAnimating: false }), 1000)   

    }catch (error){
      setTimeout(() => this.setState({ spinnerAnimating: false }), 1000)
      alert(error.response.data.errors[0].messages)
    }
  }  

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
            <Text style={styles.title}>
              BR-SOS
            </Text>
            <Text style={styles.subtitle}>
              Ajudando a Comunidade
            </Text>

            <Text style={styles.label}>
            Descrição do acidente
            </Text>

            <TextInput style={styles.input}
              placeholder="Digite aqui..."
              onChangeText={texto => this.setState({descricao: texto})}/>


            <Picker
              selectedValue={this.state.language}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              <Picker.Item label="<Selecione a Gravidade>" value="grave" />
              <Picker.Item label="Grave" value="grave" />
              <Picker.Item label="Médio" value="Médio" />
              <Picker.Item label="Leve" value="leve" />
          </Picker>


            <ActivityIndicator size="large" color="#589836" animating={this.state.spinnerAnimating} />


            <Button style={styles.Buttonloc} title="Enviar locaização" onPress={() => console.warn("Localização enviada")} underlayColor='#6F9E38'/>
            
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
    marginTop: 10
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 60
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
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
  }
});