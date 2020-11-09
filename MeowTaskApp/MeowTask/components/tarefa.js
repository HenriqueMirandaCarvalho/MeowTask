import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";

export const Tarefa = props => 
    <View style={styles.container}>
        <View style={styles.viewImagem}>
            <Image source={props.imagem} style={styles.imagem}>

            </Image>
        </View>
        <View style={styles.viewTexto}>
            <View style={styles.divNome}>
                <Text style={styles.nome}> {props.nome} </Text>
            </View>
            <TouchableOpacity onPress={props.onPress} style={styles.botao}>
                <Image source={require('./img/turquesa10.png')} style={styles.iconeConcluir}/>
                <Text style={styles.textoBotao}>Concluir</Text>
            </TouchableOpacity>
        </View>
    </View>

let styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginLeft: "12.5%",
        marginRight: "12.5%",
        marginTop: "3%",
        width: "75%",
        aspectRatio: 5,
    },
    botao: {
        flexDirection: "row",
        width: "50%",
        flex: 50,
        alignItems: "center",
        paddingTop: "0.5%",
        paddingBottom: "0.5%",
    },
    imagem: {
        aspectRatio: 1,
        width: "100%",
        height: null,
        borderRadius: 100,
    },
    viewImagem: {
        flex: 19,
    },
    viewTexto: {
        flex: 81,
        marginLeft: "5%",
        justifyContent: "flex-end",
    },
    divNome: {
        flex: 50,
    },
    nome: {
        fontFamily: 'Roboto-Light',
        fontSize: 18,
        color: '#000000',
    },
    textoBotao: {
        marginLeft: "12%",
        fontFamily: 'Roboto-Light',
        fontSize: 15,
        color: '#000000',
    },
    iconeConcluir: {
        height: '100%',
        width: null,
        aspectRatio: 1,
    }
});