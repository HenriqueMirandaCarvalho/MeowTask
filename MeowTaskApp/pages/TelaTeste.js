import React from 'react';
import { StatusBar, StyleSheet, View, ImageBackground, Text } from 'react-native';

export default class TelaInicio extends React.Component {
    render() {
        return (
            <View style={styles}>
                <View style={{width: 50, height: 50, backgroundColor: 'red'}}><Text>R</Text></View>
                <View style={{width: 50, height: 50, backgroundColor: 'green'}}><Text>G</Text></View>
                <View style={{width: 50, height: 50, backgroundColor: 'blue'}}><Text>B</Text></View>
            </View>
        );
    }
}

const styles = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
};