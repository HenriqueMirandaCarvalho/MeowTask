import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, Image, TouchableNativeFeedback } from "react-native";
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons'; 
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import * as firebase from 'firebase';

const telaTarefa = (props) => {
    let idGrupo = props.navigation.state.params.idGrupo;
    let idTarefa = props.navigation.state.params.idTarefa;
    const logoTarefa = [require("./img/Logos/LogoPraCadaTarefa.png"), require("./img/Logos/CadaTarefaCertinho.png")];
    const [nomeTarefa, setNomeTarefa] = useState("...");

    function btnDescricao() {
        props.navigation.navigate("Descricao", {
            idGrupo: idGrupo,
            idTarefa: idTarefa
        });
    }

    function btnLista() {
        alert("Lista");
    }

    function btnArquivos() {
        props.navigation.navigate("Arquivos", {
            idGrupo: idGrupo,
            idTarefa: idTarefa
        });
    }

    function btnConcluir() {
        alert("Concluir");
    }

    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
    });

    useEffect(() => {
        const listener = firebase.firestore()
            .collection("Grupos")
            .doc(idGrupo)
            .collection("Tarefas")
            .doc(idTarefa)
            .onSnapshot(snapshot => {
                setNomeTarefa(snapshot.data().nome);
            });
        return () => listener();
    }, []);
        
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
    return (
        <View style={styles.container}>
            <View style={styles.cabecalho}>
                <View style={styles.divSetinha}>
                    <TouchableNativeFeedback style={{padding: "2%"}} onPress={() => props.navigation.goBack()}>
                        <Ionicons name="md-arrow-back" size={40} color="#5b5b58" style={styles.setinha}/>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.divImagem}> 
                    <Image source={logoTarefa[0]} style={styles.imagem}/>
                </View>
            </View>
            <Text style={styles.textoNomeTarefa}>{nomeTarefa}</Text>
            <TouchableNativeFeedback onPress={btnDescricao}>
                <View style={styles.botao}>
                    <Image source={require('./img/Logos/Descricao.png')} style={styles.imagemBotao}></Image>
                    <Text style={styles.textoBotao}>Descrição</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={btnLista}>
                <View style={styles.botao}>
                    <Image source={require('./img/Logos/Lista.png')} style={styles.imagemBotao}></Image>
                    <Text style={styles.textoBotao}>Lista</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={btnArquivos}>
                <View style={styles.botao}>
                    <Image source={require('./img/Logos/Arquivos.png')} style={styles.imagemBotao}></Image>
                    <Text style={styles.textoBotao}>Arquivos</Text>
                </View>
            </TouchableNativeFeedback>
            <View style={styles.divUltimoBotao}>
                <TouchableNativeFeedback onPress={btnConcluir}>
                    <View style={styles.ultimoBotao}>
                        <Image source={require('./img/Logos/CadaTarefaCertinho.png')} style={styles.imagemBotao}></Image>
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
        paddingLeft: "3%",
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
        paddingLeft: "3%",
    },
    imagemBotao: {
        height: "90%",
        width: null,
        aspectRatio: 1,
    },
    textoBotao: {
        fontFamily: "Roboto-Light",
        fontSize: 28,
        marginLeft: "2.5%",
    }
});

export default telaTarefa;