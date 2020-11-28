import React from 'react';
import {View, StyleSheet, Image, Text} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

export const Postagem = props => 
    <TouchableWithoutFeedback delayLongPress={500} onLongPress={() => props.onLongPress()} style={styles.container}>
        <View style={styles.cabecalho}>
            <Image source={props.avatarPostador} style={styles.imagemPostador}/>
            <Text style={styles.nomePostador}>{props.nomePostador}</Text>
        </View>
        <View style={styles.conteudo}>
            <Text style={styles.texto} >{props.texto}</Text>
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
    cabecalho: {
        alignItems: "center",
        flexDirection: "row",
        width: "101%",
        paddingTop: "3%",
        paddingBottom: "2%",
        marginLeft: "-1%",
        backgroundColor: "#444444",
        borderRadius: 10,
    },
    imagemPostador: {
        width: "7.5%",
        marginLeft: "5%",
        height: null,
        aspectRatio: 1,
        borderRadius: 150,
        opacity: 0.8,
    },
    nomePostador: {
        fontFamily: 'Roboto-Light',
        fontSize: 16,
        color: '#aaaaaa',
        marginLeft: "2%",
        marginTop: "-2%",
    },
    conteudo: {
        paddingTop: "2%",
        paddingBottom: "2%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
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