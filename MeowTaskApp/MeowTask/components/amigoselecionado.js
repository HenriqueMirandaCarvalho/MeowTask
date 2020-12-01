import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";

const imagensUsuario = [];
imagensUsuario.push(require("./img/turquesa10.png"));
imagensUsuario.push(require("./img/gato1.png"));
imagensUsuario.push(require("./img/gato2.png"));
imagensUsuario.push(require("./img/gato3.png"));


export const AmigoSelecionado = (props) => {
    function selecionador() {
        if (true) {
            return {backgroundColor: "#DC4C46"}
        } else {
            return {backgroundColor: "#53A156"}
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewImagem}>
                <Image source={imagensUsuario[props.imagem]} style={styles.imagem}/>
            </View>
            <View style={styles.viewTexto}>
                <Text style={styles.nome}> {props.nome} </Text>
                <TouchableOpacity onPressIn={() => props.onPressIn()} style={[selecionador(), styles.botao]}>
                    <Text style={styles.textoBotao}>{true?"Remover":"Adicionar"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

let styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginLeft: "4.6%",
        marginRight: "14%",
        marginTop: "3%",
    },
    botao: {
        borderRadius: 150,
        width: "100%",
        alignItems: "center",
        paddingTop: "0.5%",
        paddingBottom: "0.5%",
    },
    imagem: {
        aspectRatio: 1,
        width: '100%',
        height: null,
        borderRadius: 10,
    },
    viewImagem: {
        flex: 23,
    },
    viewTexto: {
        flex: 77,
        marginLeft: "5%",
        alignItems: "flex-start",
    },
    nome: {
        fontFamily: 'Roboto-Light',
        fontSize: 18,
        color: '#000000',
    },
    textoBotao: {
        fontFamily: 'Roboto-Light',
        fontSize: 15,
        color: '#000000',
    }
});