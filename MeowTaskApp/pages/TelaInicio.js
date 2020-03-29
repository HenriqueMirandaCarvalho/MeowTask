import React from 'react';
import {AsyncStorage} from 'react-native';
import { StatusBar, StyleSheet, View, ImageBackground } from 'react-native';
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
                backgroundColor: '#3ba3c5',
                color: '#ffffff',
                marginTop: 450,
            },
        });
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./img/icone.png')} style={styles.image}>
                    <CustomButton title='INICIAR' style={styles.button} textStyle={{marginLeft: 20, marginRight: 20,}} onPress={() => {AsyncStorage.setItem('firstAccess', 'true');}}/>
                </ImageBackground>
            </View>
        );
    }
}