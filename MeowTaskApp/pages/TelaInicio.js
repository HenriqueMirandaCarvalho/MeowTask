import React from 'react';
import { StatusBar, StyleSheet, View, ImageBackground, Button, Text } from 'react-native';
import CustomButton from './components/CustomButton';

export default class TelaInicio extends React.Component {
    componentDidMount() {
        StatusBar.setHidden(true);
    }
    render() {
        const styles = StyleSheet.create({
            container: {
              flex: 1,
              flexDirection: "column"
            },
            image: {
              flex: 1,
              backgroundColor: '#eae6da',
              resizeMode: "cover",
              alignItems: "center"
            },
            button: {
                alignItems: 'center',
                backgroundColor: '#3ba3c5',
                color: '#ffffff',
                padding: 10,
                marginTop: 400,
                marginLeft: 35,
                marginRight: 35,
            },
        });
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./img/icone.png')} style={styles.image}>
                    <CustomButton title='Teste' style={styles.button}/>
                </ImageBackground>
            </View>
        );
    }
}