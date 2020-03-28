import React from 'react';
import { StatusBar, StyleSheet, View, ImageBackground, Text } from 'react-native';

export default class TelaInicio extends React.Component {
    render() {
        return (
            <View style={styles}>
                <View style={{height: 20, width: "30%", backgroundColor: 'red'}}><Text>R</Text></View>
                <View style={{height: 20, width: 50, backgroundColor: 'green'}}><Text>G</Text></View>
                <View style={{height: 20, width: 50, backgroundColor: 'blue'}}><Text>B</Text></View>
            </View>
        );
    }
}

const styles = {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
};