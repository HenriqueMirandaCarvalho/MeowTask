import React from "react";
import {View, Text, StyleSheet, Image, TouchableNativeFeedback, StatusBar , TouchableOpacity} from "react-native";
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import icone from './img/icone.png';

const telaInicio = (props) => {   
    function btnComecar() {
        props.navigation.navigate('ListaGrupos');
    }
    function btnLogar() {
        props.navigation.navigate('Login');
    }
    function btnContinuar() {
        alert("continuar");
    }
    
    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
    });
        
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
    return (
        <View style={styles.container}>
            <Image source={icone} style={styles.logo}/>
            <TouchableNativeFeedback onPress={btnComecar}>
                <View style={styles.botao}>
                    <Text style={styles.texto}>Começar</Text>
                </View>
             </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={btnLogar}>
                <View style={styles.botao}>
                    <Text style={styles.texto}>Fazer Login</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableOpacity onPress={btnContinuar}>
                <View>
                    <Text style={styles.texto2}>Continuar sem uma conta</Text>
                </View>
            </TouchableOpacity>
            <StatusBar translucent backgroundColor={'#649DF1'}/>
        </View>
    );  
    }  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
		flexDirection: 'column',
		backgroundColor: '#EAE6DA',
		justifyContent: 'space-evenly',
        alignItems: 'center',
        // marginTop: StatusBar.currentHeight || 0,
    },
    logo: {
        marginTop: 50,
        aspectRatio: 1,
        width: '80%',
        height: null,
    },
    botao: {
        width: '70%',
        aspectRatio: 5,
        borderRadius: 6,
        backgroundColor: '#5b5b58',
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto: {
        fontFamily: 'Roboto-Light',
        fontSize: 30,
        color: '#eae6da',
    },
    texto2: {
        marginBottom: '10%',
        fontFamily: 'Roboto-Light',
        fontSize: 20,
        color: '#5b5b58',
    }
});

export default telaInicio;