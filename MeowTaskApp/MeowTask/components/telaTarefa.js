import React, { useState } from "react";
import {View, Text, StyleSheet, Image, TouchableNativeFeedback, StatusBar, Modal, ActivityIndicator, Alert } from "react-native";
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons'; 
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import Conexao from './classes/Conexao.js';

const telaTarefa = (props) => {
    let idTarefa = props.navigation.state.params.idTarefa;
    const [loadedTarefa, setLoadTarefa] = useState(false);
    const [loading, setLoading] = useState(true);
    const logoTarefa = [require("./img/Logos/LogoPraCadaTarefa.png"), require("./img/Logos/CadaTarefaCertinho.png")];
    const [nomeTarefa, setNomeTarefa] = useState("...");

    function btnDescricao() {
        props.navigation.navigate("Descricao", {
            idTarefa: idTarefa
        });
    }

    function btnLista() {
        alert("Lista");
    }

    function btnArquivos() {
        props.navigation.navigate("Arquivos", {
            idTarefa: idTarefa
        });
    }

    function btnConcluir() {
        alert("Concluir");
    }

    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
    });

    function carregarTarefa() {
        let conn = new Conexao();
        conn.getTarefaById(idTarefa)
            .catch((error) => {
                Alert.alert("Erro", error);
            })
            .then((obj) => {
                setNomeTarefa(obj.nome);
                setLoading(false);
            });
        setLoadTarefa(true);
    }

    if (!loadedTarefa) {
        carregarTarefa();
    }
        
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
    return (
        <View style={styles.container}>
            <Modal 
                visible={loading}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.centeredViewCarregar}>
                    <View style={styles.modalCarregar}>
                        <ActivityIndicator size={70} color="#53A156"/>
                    </View>
                </View>
            </Modal>
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
    },
    centeredViewCarregar: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
    },
    modalCarregar: {
        width: "30%",
        aspectRatio: 1,
        backgroundColor: "#ededed",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: "center",
    }
});

export default telaTarefa;