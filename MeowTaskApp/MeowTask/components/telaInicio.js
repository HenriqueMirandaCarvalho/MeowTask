import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableNativeFeedback, StatusBar, TouchableOpacity } from "react-native";
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import icone from './img/icone.png';
import * as firebase from 'firebase';

const telaInicio = (props) => {
    const [logado, setLogado] = useState(false);
    function btnComecar() {
        if (!logado)
            props.navigation.navigate('Login');
        else
            props.navigation.navigate('Home');
    }
    function btnLogar() {
        props.navigation.navigate('Login');
    }
    function btnContinuar() {
        props.navigation.navigate('Home');
    }

    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
    });

    if (!firebase.apps.length) {
        var firebaseConfig = {
            apiKey: "AIzaSyApt9TUJkguD9IDJ2LmU4ReiqF06hPLH4o",
            authDomain: "meowtask-ea038.firebaseapp.com",
            databaseURL: "https://meowtask-ea038.firebaseio.com",
            projectId: "meowtask-ea038",
            storageBucket: "meowtask-ea038.appspot.com",
            messagingSenderId: "256053222242",
            appId: "1:256053222242:web:92e7b03603d6674e2d2a3b",
            measurementId: "G-FJH8MESQTJ"
        };
        firebase.initializeApp(firebaseConfig);
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <Image source={icone} style={styles.logo} />
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
                <StatusBar translucent backgroundColor={'#eae6da'} />
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