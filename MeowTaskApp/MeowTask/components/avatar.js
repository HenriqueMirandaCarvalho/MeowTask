import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from "react-native";


export const Avatar = (props) => {
    function selecionador() {
        if (props.selecionada) {
            return {backgroundColor: "black"}
        }
    }

    return (
        <TouchableOpacity onPressIn={() => props.onPressIn()}>
            <View style={[selecionador(), styles.conteudo]}>
                <Image source={props.imagem} style={styles.imagem}/>
            </View>
        </TouchableOpacity>
    );
}

let styles = StyleSheet.create({
    conteudo: {
        height: "100%",
        width: null,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imagem: {
        height: "90%",
        aspectRatio: 1,
        width: null,
    },
});