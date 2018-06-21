import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  FlatList,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ocorrencias from '../middlewares/Ocorrencias'
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
    this.state = {
      ocorrencias: []
    }
  }
  
  async componentDidMount() {
    try {
      let token = await AsyncStorage.getItem('token')

      let response = await Ocorrencias.get(token);
      this.setState({ocorrencias: response.data.ocorrencias.reverse()})
      
    } catch (error) {
      console.warn(error)
    }
  }

  // async componentDidUpdate() {
  //   try {
  //     let token = await AsyncStorage.getItem('token')

  //     let response = await Ocorrencias.get(token);
  //     this.setState({ocorrencias: response.data.ocorrencias.reverse()})
      
  //   } catch (error) {
  //     console.warn(error)
  //   }
  // }

  getCat(category){
    switch(category) {
      case 1: 
        return 'Leve'
      case 2:
        return 'Médio'
      case 3:
        return 'Grave'
    }
  }

  getDate(date){
    let data = new Date(date)
    return data.getDate()+"/"+(data.getMonth()+1)+"/"+data.getFullYear()
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
      title: 'Cadastre Ocorrências'
    })
  }

  getMap() {
    this.props.navigator.push({
      screen: 'Map',
      title: 'Visualize a localização'
    })
  }

  async deleteOcorrencia(id) {
    let response = await Ocorrencias.delete(id)
    let newOcorrencias = this.state.ocorrencias.filter(ocorrencia => ocorrencia._id != id)
    this.setState({ ocorrencias: newOcorrencias })
    alert('Ocorrência excluída')
  }

  async isCreator(item) {
    let user = await AsyncStorage.getItem('user')
    return user == item.user    
  }

  render() {
    return (
      <View style={ styles.container }>
        
        <TouchableHighlight>
          <Icon.Button style={styles.button} name="add" size={40} backgroundColor="#0B1D3B" onPress={ () => this.getCadastro() }>
            <Text style={styles.textButton}> CADASTRE OCORRÊNCIAS </Text>
          </Icon.Button>
        </TouchableHighlight>

        <Text style={styles.divisoria}></Text>

        <FlatList
          data={this.state.ocorrencias}
          renderItem={ ({item}) => 
            <View style={styles.boxOcorrencia}>
              <View style={styles.viewTexts}>
                <Text style={{fontWeight: 'bold'}}>{item.description.toUpperCase()}</Text>
                <Text>Data: {this.getDate(item.date)}</Text>
                <Text>Nível: {this.getCat(item.category)}</Text>
                <Text>Número de Vítimas: {item.victims == null ? 'Não informado' : item.victims}</Text>
              </View>

              <View style={styles.viewButtons}>
                <TouchableHighlight>
                  <Icon.Button name="search" size={20} backgroundColor="gray" onPress={ () => this.getMap() } />
                </TouchableHighlight>

                { this.isCreator(item) ? 
                  <TouchableHighlight>
                    <Icon.Button name="delete" size={20} backgroundColor="red" onPress={ () => this.deleteOcorrencia(item._id) } />
                  </TouchableHighlight> : 
                  <Text /> 
                }       
              </View>
            </View>
          }
        />

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
  },
  boxOcorrencia: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EEE',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 10,
  },
  viewButtons: {
    width: 43,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  viewTexts: {
    width: 220
  }
});