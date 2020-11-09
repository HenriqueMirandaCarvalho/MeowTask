import React, { useState } from "react";
import {View, Text, StyleSheet, Image, TouchableNativeFeedback, StatusBar } from "react-native";
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons'; 
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

export default function telaInicial() {
    const imagemTarefa = require("./img/turquesa10.png");
    const nomeTarefa = "Clear Asteroids";

    function btnDescricao() {
        alert("Descrição");
    }

    function btnLista() {
        alert("Lista");
    }

    function btnArquivos() {
        alert("Arquivos");
    }

    function btnConcluir() {
        alert("Concluir");
    }

    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
    });
        
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
    return (
        <View style={styles.container}>
            <View style={styles.cabecalho}>
                <View style={styles.divSetinha}>
                    <Ionicons name="md-arrow-back" size={40} color="#5b5b58" style={styles.setinha}/>
                </View>
                <View style={styles.divImagem}> 
                    <Image source={imagemTarefa} style={styles.imagem}/>
                </View>
            </View>
            <Text style={styles.textoNomeTarefa}>{nomeTarefa}</Text>
            <TouchableNativeFeedback onPress={btnDescricao}>
                <View style={styles.botao}>
                    <AntDesign name="smileo" size={32} color="white"/>
                    <Text style={styles.textoBotao}>Descrição</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={btnLista}>
                <View style={styles.botao}>
                    <AntDesign name="smileo" size={32} color="white"/>
                    <Text style={styles.textoBotao}>Lista</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={btnArquivos}>
                <View style={styles.botao}>
                    <AntDesign name="smileo" size={32} color="white"/>
                    <Text style={styles.textoBotao}>Arquivos</Text>
                </View>
            </TouchableNativeFeedback>
            <View style={styles.divUltimoBotao}>
                <TouchableNativeFeedback onPress={btnConcluir}>
                    <View style={styles.ultimoBotao}>
                        <AntDesign name="smileo" size={32} color="white"/>
                        <Text style={styles.textoBotao}>Concluir</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    );  
    }  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
		flexDirection: 'column',
		backgroundColor: '#EAE6DA',
        alignItems: 'center',
    },
    cabecalho: {
        flexDirection: "row",
        alignSelf: "stretch",
    },
    divSetinha: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    divImagem: {
        width: "100%",
        alignItems: "center",
    },
    imagem: {
        aspectRatio: 1,
        width: '35%',
        height: null,
        marginTop: "9%",
        borderRadius: 1000,
    },
    setinha: {
        marginLeft: '5%',
        marginTop: '9%',
    },
    textoNomeTarefa: {
        fontFamily: "Roboto-Light",
        fontSize: 30,
        marginTop: "5%",
        marginBottom: "10%",
    },
    botao: {
        backgroundColor: "#C4C4C4",
        width: "80%",
        aspectRatio: 5.5,
        borderRadius: 10,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: "4.4%",
        paddingLeft: "4%",
    },
    divUltimoBotao: {
        justifyContent: "flex-end",
        flex: 1,
    },
    ultimoBotao: {
        backgroundColor: "#C4C4C4",
        width: "80%",
        aspectRatio: 5.5,
        borderRadius: 10,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: "15%",
        paddingLeft: "4%",
    },
    textoBotao: {
        fontFamily: "Roboto-Light",
        fontSize: 28,
        marginLeft: "6%",
    },
});