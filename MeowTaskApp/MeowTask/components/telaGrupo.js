import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableNativeFeedback } from "react-native";
import { Ionicons, AntDesign, Entypo, Feather } from '@expo/vector-icons'; 
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import * as firebase from 'firebase';

const telaGrupo = (props) => {
    const idGrupo = props.navigation.state.params.idGrupo;
    const [nomeGrupo, setNomeGrupo] = useState("...");
    const [imagem, setImagem] = useState(0);

    const imagensGrupos = [];
    imagensGrupos.push(require("./img/turquesa10.png"));
    imagensGrupos.push(require("./img/LogoGrupos1.png"));
    imagensGrupos.push(require("./img/LogoGrupos2.png"));
    imagensGrupos.push(require("./img/LogoGrupos3.png"));

    function btnTarefas() {
        props.navigation.navigate("ListaTarefas", {
            idGrupo: idGrupo
        });
    }

    function btnAgenda() {
        alert("Agenda");
    }

    function btnPostIts() {
        props.navigation.navigate("PostIts", {
            idGrupo: idGrupo
        });
    }

    function btnPostagens() {
        props.navigation.navigate("Postagens", {
            idGrupo: idGrupo
        });
    }

    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
    });

    useEffect(() => {
        const listener = firebase.firestore()
            .collection("Grupos")
            .doc(idGrupo)
            .onSnapshot(snapshot => {
                setNomeGrupo(snapshot.data().nome);
                setImagem(snapshot.data().imagem);
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
                    <TouchableOpacity style={[styles.setinha, {padding: "2%", backgroundColor: "green"}]} onPress={() => props.navigation.goBack()}>
                        <Ionicons name="md-arrow-back" size={40} color="#5b5b58" style={{backgroundColor: "blue"}}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.divEngrenagem}>
                    <TouchableOpacity style={[styles.engrenagem, {padding: "2%", backgroundColor: "red"}]} onPress={() => props.navigation.goBack()}>
                        <Feather name="settings" size={33} color="#5b5b58" style={{backgroundColor: "green"}}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.divImagem}> 
                    <Image source={imagensGrupos[imagem]} style={styles.imagem}/>
                </View>
            </View>
            <Text style={styles.textoNomeGrupo}>{nomeGrupo}</Text>
            <TouchableNativeFeedback onPress={btnTarefas}>
                <View style={styles.botao}>
                    <Image source={require('./img/Logos/LogoTarefas.png')} style={styles.imagemIcone}/>
                    <Text style={styles.textoBotao}>Tarefas</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={btnAgenda}>
                <View style={styles.botao}>
                    <Image source={require('./img/Logos/LogoTarefas.png')} style={styles.imagemIcone}/>
                    <Text style={styles.textoBotao}>Membros</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={btnPostIts}>
                <View style={styles.botao}>
                    <Image source={require('./img/Logos/post-it.png')} style={styles.imagemIcone}/>
                    <Text style={styles.textoBotao}>Post-Its</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={btnPostagens}>
                <View style={styles.botao}>
                    <Image source={require('./img/Logos/Postagens.png')} style={styles.imagemIcone}/>
                    <Text style={styles.textoBotao}>Postagens</Text>
                </View>
            </TouchableNativeFeedback>
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
        justifyContent: "flex-start",
        alignItems: "flex-start",
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
    textoNomeGrupo: {
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
        marginTop: "0%",
        marginBottom: "4.4%",
        paddingLeft: "4%",
    },
    textoBotao: {
        fontFamily: "Roboto-Light",
        fontSize: 28,
        marginLeft: "4%",
    },
    imagemIcone: {
        height: "80%",
        width: null,
        aspectRatio: 1,
    },
    divEngrenagem: {
        width: "100%",
        height: "100%",
        position: "absolute",
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },
    engrenagem: {
        marginRight: '5%',
        marginTop: '10%',
    }
});

export default telaGrupo;