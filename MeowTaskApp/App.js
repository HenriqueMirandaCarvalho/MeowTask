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
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#98b4d4'
  },
});
