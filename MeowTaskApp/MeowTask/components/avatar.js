import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from "react-native";


export const Avatar = (props) => {
    function selecionador() {
        if (props.selecionada) {
            return {backgroundColor: "#00FF00"}
        } else {
            return {backgroundColor: "#0000FF"}
        }
    }

    return (
        <TouchableOpacity onPress={() => props.onPress()}>
            <View style={styles.conteudo, selecionador()}>
                <Image source={props.imagem} style={styles.imagem}/>
            </View>
        </TouchableOpacity>
    );
}

let styles = StyleSheet.create({
    conteudo: {
        height: "100%",
        aspectRatio: 1,
    },
    imagem: {
        height: "100%",
        aspectRatio: 1,
        width: null,
    },
});