import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

const telaSemConexao = (props) => {

    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
        'Roboto-Regular': require('./font/Roboto-Regular.ttf'),
        'Merienda-Regular': require('./font/Merienda-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <Feather name="wifi-off" size={40} color="black" />
                <Text style={styles.texto}>Sem Conexão</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eae6da',
        justifyContent: "center",
        alignItems: "center",
    },
    texto: {
        fontFamily: 'Roboto-Light',
        fontSize: 25,
        color: 'black',
        marginTop: "3%",
    },
});

export default telaSemConexao;