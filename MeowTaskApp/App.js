import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar
} from 'react-native';

export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      nome: "Miranda",
      frase: "Quem espera sempre alcança!",
      alimento: "alimento"
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <Text>Meow Task é o melhor!</Text>
        <Text>Olá, {this.state.nome}</Text>
        <Text>Lembre-se: {this.state.frase}</Text>
        <Text>Coma muitos {this.state.alimento} para evitar o coronga</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eae6da'
  }
});