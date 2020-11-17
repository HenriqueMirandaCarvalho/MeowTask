import React from 'react';
import {View, StyleSheet, Image, TouchableNativeFeedback, Text} from "react-native";

export const PostIt = props => 
    <View style={styles.container}>
        <TouchableNativeFeedback onPress={() => props.onPress()} onLongPress={() => props.onLongPress()}>
            <View style={styles.ultimoBotao}>
                <Text style={styles.texto} selectable>{props.texto}</Text>
            </View>
        </TouchableNativeFeedback>
    </View>



let styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: "3%",
        marginBottom: "1%",
        width: "100%",
        // backgroundColor: "mediumspringgreen",
        justifyContent: "center",
    },
    imagem: {
        aspectRatio: 1,
        height: "70%",
        width: null,
    },
    nome: {
        fontFamily: 'Roboto-Light',
        fontSize: 18,
        color: '#000000',
    },
    texto: {
        width: "90%",
        marginBottom: "1%",
        fontFamily: "Roboto-Light",
        fontSize: 20,
        paddingLeft: "2%",
        paddingRight: "2%",
    },
    ultimoBotao: {
        backgroundColor: "#C4C4C4",
        width: "80%",
        paddingTop: "2%",
        paddingBottom: "2%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
});