import React from 'react';
import { StatusBar, StyleSheet, View, ImageBackground, Text } from 'react-native';

export default class TelaInicio extends React.Component {
    render() {
        return (
            <View style={styles}>
                <View style={{width: 50, height: 50, backgroundColor: 'red'}}></View>
                <View style={{width: 50, height: 50, backgroundColor: 'green'}}></View>
                <View style={{width: 50, height: 50, backgroundColor: 'blue'}}></View>
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