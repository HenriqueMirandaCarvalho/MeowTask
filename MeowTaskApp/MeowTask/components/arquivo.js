import React from 'react';
import {View, StyleSheet, Image, TouchableWithoutFeedback, Text, TouchableOpacity} from "react-native";

export const Arquivo = props => 
    <View style={styles.container}>
        <TouchableWithoutFeedback onLongPress={() => props.onLongPress()} style={styles.ultimoBotao}>
            <View style={styles.ultimoBotao}>
                <View style={styles.parteSuperior}>
                    <Image source={require('./img/Logos/Arquivos.png')} style={styles.imagem} />
                    <Text style={styles.texto}>{props.texto}</Text>
                </View>
                <View style={styles.parteInferior}>
                    <TouchableOpacity onPress={() => props.onPress()} style={props.baixando() ? styles.botaoBaixarOff : styles.botaoBaixar}>
                        <Text style={styles.textoBotaoBaixar}>Baixar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
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
        height: "60%",
        width: null,
    },
    nome: {
        fontFamily: 'Roboto-Light',
        fontSize: 18,
        color: '#000000',
    },
    texto: {
        width: "80%",
        paddingTop: "2%",
        fontFamily: "Roboto-Light",
        fontSize: 20,
        alignSelf: "flex-start",
        marginTop: "2%",
        marginLeft: "2%",
    },
    ultimoBotao: {
        backgroundColor: "#C4C4C4",
        width: "80%",
        aspectRatio: 3.38,
        borderRadius: 10,
        justifyContent: "flex-start",
    },
    parteSuperior: {
        width: "100%",
        aspectRatio: 5.7,
        paddingLeft: "4%",
        alignItems: "center",
        flexDirection: "row",
    },
    parteInferior: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: "6.6%",
        paddingBottom: "2.2%",
    },
    botaoBaixar: {
        width: "60%",
        aspectRatio: 6,
        backgroundColor: "#a4a4a4",
        alignItems: "center",
        justifyContent: "center",
    },
    botaoBaixarOff: {
        width: "60%",
        aspectRatio: 6,
        backgroundColor: "#a4a4a4",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.3
    },
    textoBotaoBaixar: {
        fontFamily: "Roboto-Light",
        fontSize: 20,
        color: "black",
    }
});