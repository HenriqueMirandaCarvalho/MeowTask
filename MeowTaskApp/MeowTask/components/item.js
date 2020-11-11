import React from 'react';
import {View, StyleSheet, Image, TouchableNativeFeedback, Text} from "react-native";

export const Item = props => 
    <View style={styles.container}>
        <TouchableNativeFeedback onPress={() => props.onPress()} onLongPress={() => props.onLongPress()}>
            <View style={styles.ultimoBotao}>
                {
                props.check == true
                ? <Image source={require('./img/turquesa10.png')} style={styles.imagem} />
                : <Image source={require('./img/menta.png')} style={styles.imagem} />
                }
                <Text style={styles.texto}>{props.texto}</Text>
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
        width: "80%",
        marginBottom: "1%",
        fontFamily: "Roboto-Light",
        fontSize: 20,
        marginLeft: "2%",
    },
    ultimoBotao: {
        backgroundColor: "#C4C4C4",
        width: "80%",
        aspectRatio: 5.7,
        borderRadius: 10,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: "4%",
    },
});