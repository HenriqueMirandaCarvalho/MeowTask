import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar, LayoutAnimation, Platform, UIManager } from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { Notificacao } from './notificacao.js';
import SwipeRow from './swipe.js';
import * as firebase from 'firebase';

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
    
    const [refrescando, setRefrescando] = useState(false);

    function refrescar(){
        setRefrescando(true);
        alert("olha o refresco!");
    }

    function aceitar(_id, _idAmizade) {
        firebase.firestore()
            .collection("Codigos")
            .doc(firebase.auth().currentUser.uid)
            .collection("Notificacoes")
            .doc(_id)
            .delete();
        firebase.firestore()
            .collection("Amigos")
            .doc(_idAmizade)
            .update({
                confirmado: true
            });
    }

    const [notificacoes, setNotificacoes] = useState([]);

    useEffect(() => {
        setRefrescando(true);
        const listener = firebase.firestore()
            .collection("Codigos")
            .doc(firebase.auth().currentUser.uid)
            .collection("Notificacoes")
            .orderBy('data', 'desc')
            .onSnapshot(snapshot => {
                const notificacoes = snapshot.docs.map(doc => {
                    const notificacao = doc.data();
                    notificacao.id = doc.id;
                    return notificacao;
                });
                if (notificacoes[0] != undefined)
                    setNotificacoes(notificacoes);
                else
                    setNotificacoes([]);
                setRefrescando(false);
            });
        return () => listener();
    }, []);

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
                        <TouchableOpacity onPress={() => props.navigation.goBack()}>
                            <Ionicons name="md-arrow-back" size={44} color="#5b5b58"/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titulo}>Notificações</Text>
                </View>
                <View style={styles.conteudo}>
                    <FlatList
                        data={notificacoes}
                        keyExtractor={item=>item.id}
                        refreshing={refrescando}
                        onRefresh={() => refrescar()}
                        renderItem={({item})=>
                            <SwipeRow
                                key={item.key}
                                item={item}
                                swipeThreshold={-150}
                                onSwipe={() => deletar(item.id)} 
                            >
                                <Notificacao
                                    tipo={item.tipo}
                                    nome={item.nome}
                                    nomeGrupo={item.nomeGrupo}
                                    aceitar={() => aceitar(item.id, item.idAmizade)}
                                    recusar={() => recusar(item.id, item.idAmizade)}
                                />
                            </SwipeRow>
                        }
                        style={{width: "101%"}}
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
        // paddingTop: "5%",
        // backgroundColor: "royalblue",
    },
});

export default telaNotificacoes;