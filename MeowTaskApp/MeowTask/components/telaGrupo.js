import React, { useState } from "react";
import { Alert, View, Text, StyleSheet, Image, TouchableNativeFeedback, StatusBar} from "react-native";
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons'; 
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import Conexao from './classes/Conexao.js';
import { TouchableOpacity } from "react-native-gesture-handler";

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
        alert("Tarefas");
    }

    function btnAgenda() {
        alert("Agenda");
    }

    function btnPostIts() {
        alert("Post-Its");
    }

    function btnPostagens() {
        alert("Postagens");
    }

    function btnEstrela() {
        if (statusEstrela)
        {
            setCorEstrela('#BBBBBB');
            setStatusEstrela(false);
            alert("A estrelinha quer q vc exploda! ÙwÚ");
        }
        else
        {
            setCorEstrela('#FFFF00');
            setStatusEstrela(true);
            alert("A estrelinha te desejou boa sorte! ^w^");
        }
    }

    const [corEstrela, setCorEstrela] = useState('#BBBBBB');
    const [statusEstrela, setStatusEstrela] = useState('false'); // true = ativado (amarela)

    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
    });
    
    function carregarGrupos() {
        let conn = new Conexao();
        conn.getGrupoById(idGrupo)
        .catch((error) => {
            //alert(error);
        })
        .then((obj) => {
            setNomeGrupo(obj.nome);
            setImagem(obj.imagem);
        });
    }

    carregarGrupos();
        
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
                    <Image source={imagensGrupos[imagem]} style={styles.imagem}/>
                </View>
            </View>
            <Text style={styles.textoNomeGrupo}>{nomeGrupo}</Text>
            <TouchableNativeFeedback onPress={btnTarefas}>
                <View style={styles.botao}>
                    <AntDesign name="smileo" size={32} color="white"/>
                    <Text style={styles.textoBotao}>Tarefas</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={btnAgenda}>
                <View style={styles.botao}>
                    <AntDesign name="smileo" size={32} color="white"/>
                    <Text style={styles.textoBotao}>Agenda</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={btnPostIts}>
                <View style={styles.botao}>
                    <AntDesign name="smileo" size={32} color="white"/>
                    <Text style={styles.textoBotao}>Post-Its</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={btnPostagens}>
                <View style={styles.botao}>
                    <AntDesign name="smileo" size={32} color="white"/>
                    <Text style={styles.textoBotao}>Postagens</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={btnEstrela}>
                <View style={styles.botaoEstrela}>
                    <Entypo name="star" size={60} color={corEstrela} />
                    <Text style={styles.textoBotaoEstrela}>Estrela da sorte</Text>
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
        marginLeft: "6%",
    },
    botaoEstrela: {
        width: "60%",
        aspectRatio: 4,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        marginTop: "1%",
        paddingLeft: "2%",
    },
    textoBotaoEstrela: {
        fontFamily: "Roboto-Light",
        fontSize: 20,
        marginLeft: "3%",
    },
});

export default telaGrupo;