import React from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, StatusBar, Modal, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import * as firebase from 'firebase';

const telaTermos = (props) => {

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
                <View style={styles.cabecalho}>
                    <View style={styles.divSetinha}>
                        <TouchableNativeFeedback onPress={() => props.navigation.goBack()}>
                            <Ionicons name="md-arrow-back" size={40} color="#5b5b58" style={styles.setinha} />
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.divCabecalho}>
                        <Text style={styles.titulo}>Sobre</Text>
                    </View>
                </View>
                <View style={styles.conteudo}>
                    <ScrollView style={{width: "100%"}}>
                        <View style={styles.divTexto}>
                            <Text style={styles.tituloTexto}>Sobre o Meow Task</Text>
                            <Text style={styles.texto}>O Meow Task é um aplicativo para celular que organiza tarefas, permite a criação de grupos, permite que você organize suas ideias em post-its, permite a comunicação em conjunto com seus companheiros e ajude no planejamento de seu projeto. O aplicativo é amigável e intuitívo, mas ao mesmo tempo reune diversas funções para melhorar a produtividade.</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eae6da',
        // marginTop: StatusBar.currentHeight || 0,
    },
    cabecalho: {
        height: '11%', // 8% se tiver margintop e 11% se não tiver
        borderBottomWidth: 1,
        borderColor: '#5b5b58',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingBottom: '1%',
    },
    conteudo: {
        flex: 1,
    },
    divSetinha: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    divCabecalho: {
        width: '100%',
        alignItems: 'center',
    },
    setinha: {
        marginLeft: '5%',
        marginBottom: '1%',
    },
    titulo: {
        fontFamily: 'Roboto-Light',
        fontSize: 35,
        color: '#5b5b58',
    },
    divTexto: {
        width: "95%",
        paddingTop: "5%",
        alignSelf: "center",
    },
    tituloTexto: {
        fontFamily: 'Merienda-Regular',
        fontSize: 25,
        color: 'black',
        marginBottom: "3%",
    },
    texto: {
        fontFamily: 'Roboto-Light',
        fontSize: 19,
        color: 'black',
        textAlign: "justify",
    }
});

export default telaTermos;