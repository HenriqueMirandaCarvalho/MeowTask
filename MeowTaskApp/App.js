import React from 'react';
import {
  StyleSheet,
  ImageBackground,
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
      alimento: "alimento",
      imagem: {uri: "https://reactjs.org/logo-og.png"}
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <ImageBackground source={this.state.imagem}>
          <Text>Meow Task é o melhor!</Text>
          <Text>Olá, {this.state.nome}</Text>
          <Text>Lembre-se: {this.state.frase}</Text>
          <Text>Coma muitos {this.state.nome} para evitar o coronga</Text>
        </ImageBackground>
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