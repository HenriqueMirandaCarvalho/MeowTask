import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";

export const Tarefa = props => 
    <View style={styles.container}>
        <TouchableOpacity delayLongPress={250} onPress={() => props.onPress()} onLongPress={() => props.onLongPress()} style={styles.botao}>
            <View style={styles.viewImagem}>
                <Image source={props.imagem} style={styles.imagem}/>
            </View>
            <View style={styles.viewTexto}>
                <View style={styles.divNome}>
                    <Text style={styles.nome}> {props.nome} </Text>
                </View>
            </View>
        </TouchableOpacity>
    </View>

let styles = StyleSheet.create({
    container: {
        marginLeft: "12.5%",
        marginRight: "12.5%",
        marginTop: "3%",
        width: "75%",
        aspectRatio: 5,
        
    },
    divNome: {
        height: "50%",
        justifyContent: "center",
    },
    botao: {
        flexDirection: "row",
        height: "100%",
    },
    imagem: {
        aspectRatio: 1,
        width: null,
        height: "100%",
    },
    viewImagem: {
        width: "22%",
    },
    viewTexto: {
        width: "78%",
        paddingBottom: "1%",
        justifyContent: "center",
    },
    nome: {
        fontFamily: 'Roboto-Light',
        fontSize: 20,
        color: '#000000',
    },
});