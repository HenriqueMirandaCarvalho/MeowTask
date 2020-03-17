import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar
} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true}/>
      <Text>Escrevi e saí correndo...</Text>
      <TextInput style={{height: 40, backgroundColor: 'azure', fontSize: 20}} placeholder="complete"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#98b4d4'
  },
});
