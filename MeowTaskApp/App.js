import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar
} from 'react-native';

export default function App() {

  constructor(prop){
    super(prop);
    this.state = {
      nome: "Miranda",
      frase: "Quem espera alcança!",
      alimento: "Abacaxi",
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true}/>
      <Text>Meow Task é o melhor!</Text>
      <Text>this.state.nome</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eae6da'
  }
});
