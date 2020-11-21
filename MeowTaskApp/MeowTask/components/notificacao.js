import React from 'react';
import {View, StyleSheet, Image, Text, TouchableWithoutFeedback} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'; 

export const Notificacao = props => 
    <TouchableWithoutFeedback style={styles.container}>
        <View style={styles.conteudo}>
            <Image source={props.imagem} style={styles.imagem}/>
            <Text style={styles.texto}>{props.texto}</Text>
        </View>
    </TouchableWithoutFeedback>

let styles = StyleSheet.create({
    container: {
        marginTop: "3%",
        marginBottom: "1%",
        marginLeft: "8.5%",
        marginRight: "8.5%",
        backgroundColor: "#C4C4C4",
        borderRadius: 10,
        justifyContent: "center",
    },
    conteudo: {
        flexDirection: "row",
        width: "100%",
        paddingTop: "3%",
    },
    imagem: {
        width: "7.5%",
        marginLeft: "7.8%",
        height: null,
        aspectRatio: 1,
        borderRadius: 150,
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