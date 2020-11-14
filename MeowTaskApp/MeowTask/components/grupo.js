import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";

export const Grupo = props => 
    <TouchableOpacity onPress={props.onPress} style={styles.touch}>
        <View style={styles.container}>
            <View style={styles.viewImagem}>
                <Image source={props.imagem} style={styles.imagem}>

                </Image>
            </View>
            <View style={styles.viewTexto}>
                <Text style={styles.nome}> {props.nome} </Text>
                <Text style={styles.informacoes}> Membros: {props.membros} </Text>
            </View>
        </View>
    </TouchableOpacity>

let styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    touch: {
        marginRight: "12.5%",
        marginLeft: "12.5%",
        marginTop: "7%",
    },
    imagem: {
        aspectRatio: 1,
        width: '100%',
        height: null,
        borderRadius: 15,
    },
    viewImagem: {
        flex: 30,
    },
    viewTexto: {
        flex: 70,
        marginLeft: "3%",
        alignItems: "center",
    },
    nome: {
        fontFamily: 'Roboto-Regular',
        fontSize: 22,
        color: '#5b5b58',
    },
    informacoes: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        color: '#5b5b58',
    }
});