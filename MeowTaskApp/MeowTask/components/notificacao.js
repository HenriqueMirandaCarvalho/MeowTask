import React from 'react';
import {View, StyleSheet, Image, Text, TouchableWithoutFeedback} from "react-native";

export const Notificacao = props => 
    <TouchableWithoutFeedback>
        <View style={styles.conteudo}>
            <Image source={props.imagem} style={styles.imagem}/>
            <Text style={styles.texto}>{props.texto}</Text>
        </View>
    </TouchableWithoutFeedback>

let styles = StyleSheet.create({
    conteudo: {
        marginTop: "3%",
        marginBottom: "1%",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
    },
    imagem: {
        width: "16%",
        marginLeft: "7.5%",
        height: null,
        aspectRatio: 1,
        borderRadius: 18,
    },
    texto: {
        width: "85%",
        marginBottom: "1%",
        fontFamily: "Roboto-Light",
        fontSize: 18,
        textAlign: "justify",
        marginLeft: "3%",
    },
});