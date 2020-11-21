import React, { useState, version } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar, LayoutAnimation, Platform, UIManager } from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { Notificacao } from './notificacao.js';
import SwipeRow from './swipe.js';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const telaNotificacoes = (props) => {

    function deletar(_id) {
        const NewData = notificacoes.filter(item => item.id !== _id);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setNotificacoes(NewData);
    }

    const [notificacoes, setNotificacoes] = useState([
        {
            id: "0",
            imagem: require("./img/turquesa10.png"),
            texto: "Notificação 1",
        },
        {
            id: "1",
            imagem: require("./img/turquesa10.png"),
            texto: "Notificação 2",
        },
        {
            id: "2",
            imagem: require("./img/turquesa10.png"),
            texto: "Notificação 2",
        },
        {
            id: "3",
            imagem: require("./img/turquesa10.png"),
            texto: "Notificação 2",
        },
        {
            id: "4",
            imagem: require("./img/turquesa10.png"),
            texto: "Notificação 2",
        },
        {
            id: "5",
            imagem: require("./img/turquesa10.png"),
            texto: "Notificação 2",
        },
    ]);

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
                        <TouchableOpacity onPress={() => toggleModalConfig()}>
                            <Ionicons name="md-arrow-back" size={44} color="#5b5b58"/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titulo}>Notificações</Text>
                </View>
                <View style={styles.conteudo}>
                    <FlatList
                        data={notificacoes}
                        keyExtractor={item=>item.id}
                        renderItem={({item})=>
                            <SwipeRow
                                key={item.key}
                                item={item}
                                swipeThreshold={-150}
                                onSwipe={() => deletar(item.id)} 
                            >
                                <Notificacao
                                    imagem={item.imagem}
                                    texto={item.texto}
                                />
                            </SwipeRow>
                        }
                        style={{width: "100%"}}
                    />
                </View>
                <StatusBar translucent backgroundColor={'#eae6da'}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eae6da',
    },
    cabecalho: {
        justifyContent: "center",
        alignItems: "center",
        height: "13%",
        borderBottomWidth: 2,
        borderBottomColor: "#5b5b58",
        marginTop: StatusBar.currentHeight || 0,
    },
    divSetinha: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: "6.6%",
    },
    titulo: {
        fontFamily: 'Roboto-Light',
        fontSize: 40,
        color: '#5b5b58',
    },
    conteudo: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        paddingTop: "5%",
        // backgroundColor: "royalblue",
    },
});

export default telaNotificacoes;