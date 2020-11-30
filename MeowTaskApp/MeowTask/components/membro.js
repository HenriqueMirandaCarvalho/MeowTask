import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";

export const Membro = props => 
    <TouchableOpacity delayLongPress={250} onPress={() => props.onPress()} style={styles.touch}>
        <View style={styles.container}>
            <View style={styles.viewImagem}>
                <Image source={props.imagem} style={styles.imagem}/>
            </View>
            <View style={styles.viewTexto}>
                <Text style={[styles.nome, props.estiloExtra]}> {props.nome} </Text>
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
        marginTop: "3%",
    },
    imagem: {
        aspectRatio: 1,
        width: '100%',
        height: null,
        borderRadius: 12,
    },
    viewImagem: {
        flex: 23,
    },
    viewTexto: {
        flex: 77,
        marginLeft: "3%",
        alignItems: "flex-start",
    },
    nome: {
        fontFamily: 'Roboto-Light',
        fontSize: 22,
        color: '#5b5b58',
        marginTop: "1%",
    },
});