import React, { useState } from "react";
import {View, Text, StyleSheet, Image, TouchableNativeFeedback, TouchableOpacity, TextInput } from "react-native";
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons'; 
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

export default function telaInicial() {
    const dadoDescricao = "";
    const [descricao, setDescricao] = useState(dadoDescricao);
    function voltar() {
        alert("voltar");
    }

    function btnSalvar() {
        alert("Salvar");
    }

    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
        'Roboto-Regular': require('./font/Roboto-Regular.ttf'),
    });
        
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
    return (
        <View style={styles.container}>
            <View style={styles.cabecalho}>
                <View style={styles.divSetinha}>
                    <TouchableOpacity onPress={() => voltar()}>
                        <Ionicons name="md-arrow-back" size={40} color="#5b5b58" style={styles.setinha}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.divCabecalho}>
                    <Text style={styles.titulo}>Descrição</Text>
                </View>
            </View>
            <View style={styles.conteudo}>
                <TextInput
                    style={styles.input}
                    onChangeText={(texto) => setDescricao(texto)}
                    value={descricao}
                    maxLength={2000}
                    multiline
                />
            </View>
            <View style={styles.divUltimoBotao}>
                <TouchableNativeFeedback onPress={() => btnSalvar()}>
                    <View style={styles.ultimoBotao}>
                        <AntDesign name="smileo" size={32} color="white"/>
                        <Text style={styles.textoBotao}>Salvar</Text>
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
        height: '11%', // 8% se tiver margintop e 11% se não tiver
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    divSetinha: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    divCabecalho: {
        width: '100%',
        alignItems: 'center',
    },
    setinha: {
        marginLeft: '5%',
    },
    titulo: {
        fontFamily: 'Roboto-Light',
        fontSize: 29,
        color: '#000000',
    },
    divUltimoBotao: {
        flex: 1,
        paddingTop: "1%",
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
    conteudo: {
        width: "100%",
        flex: 5,
        alignItems: "center",
        paddingTop: "5%",
    },
    input: {
        width: "90%",
        minHeight: "10%",
        borderColor: 'gray',
        borderWidth: 1,
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        color: '#5b5b58',
        padding: "2%",
    },
});