import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, StatusBar , FlatList, Modal, TouchableWithoutFeedback, TextInput, ActivityIndicator} from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons'; 
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import {Tarefa} from './tarefa.js';
import * as firebase from 'firebase';

const telaListaTarefas = (props) => {
    const idGrupo = props.navigation.state.params.idGrupo;
    const [tarefas, setTarefas] = useState([]);

    const logoTarefa = [require("./img/Logos/LogoPraCadaTarefa.png"), require("./img/Logos/CadaTarefaCertinho.png")];

    const [refresco, setRefresco] = useState(false);

    function trocarTela(id) {
        props.navigation.navigate("Tarefa", {
            idTarefa: id
        });
    }

    function btnCriar() {
        alert("Criar");
    }

    function btnExcluir() {
        alert("Excluir");
    }

    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
        'Roboto-Regular': require('./font/Roboto-Regular.ttf'),
        'Merienda-Regular': require('./font/Merienda-Regular.ttf'),
    });

    useEffect(() => {
        setRefresco(true);
        const listener = firebase.firestore()
            .collection("Grupos")
            .doc(idGrupo)
            .collection("Tarefas")
            .orderBy('data', 'desc')
            .onSnapshot(snapshot => {
                const tarefas = snapshot.docs.map(doc => {
                    const tarefa = doc.data();
                    tarefa.id = doc.id;
                    return tarefa;
                });
                if (tarefas[0] != undefined)
                    setTarefas(tarefas);
                else
                    setTarefas([]);
                setRefresco(false);
            });
        return () => listener();
    }, []);
        
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
    return (
        <View style={styles.container}>
            <View style={styles.cabecalho}>
                <View style={styles.divSetinha}>
                    <TouchableNativeFeedback style={{padding: "2%"}} onPress={() => props.navigation.goBack()}>
                        <Ionicons name="md-arrow-back" size={40} color="#5b5b58" style={styles.setinha}/>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.divCabecalho}>
                    <Text style={styles.titulo}>Tarefas</Text>
                </View>
            </View>
            <View style={styles.conteudo}>
                <FlatList
                    data={tarefas}
                    keyExtractor={item=>item.id}
                    refreshing={refresco}
                    onRefresh={() => {}}
                    renderItem={({item})=>
                        <Tarefa 
                            imagem={logoTarefa[0]}
                            nome={item.nome} 
                            onPress={() => trocarTela(item.id)}
                        />}
                    ListFooterComponent={
                        function rodapeLista() {
                            return (
                                <View style={styles.rodapeLista}>
                                    <TouchableOpacity onPress={() => toggleModal()} style={styles.botoesRodapeLista}>
                                        <AntDesign name="pluscircleo" size={60} color="#5b5b58" />
                                        <Text style={styles.textoBotaoRodapeLista}>Criar nova tarefa</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    }
                />
                
            </View>
            <View style={styles.rodape}>
                <TouchableNativeFeedback onPress={() => btnCriar()}>
                    <View style={styles.botao}>
                        <Text style={styles.textoBotao}>Criar</Text>
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => btnExcluir()}>
                    <View style={styles.botao}>
                        <Text style={styles.textoBotao}>Excluir</Text>
                    </View>
                </TouchableNativeFeedback>
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
        flex: 1
    },
    rodape: {
        height: '12%',
        borderTopWidth: 1,
        borderColor: '#5b5b58',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
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
    botao: {
        width: '30%',
        height: 40,
        aspectRatio: 2.47,
        borderRadius: 80,
        backgroundColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoBotao: {
        fontFamily: 'Roboto-Light',
        fontSize: 23,
        color: '#5b5b58',
    },
    rodapeLista: {
        marginTop: "8%",
        alignSelf:'stretch',
    },
    botoesRodapeLista: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        marginLeft: "15%",
        marginTop: "2%",
        marginBottom: "2%",
    },
    textoBotaoRodapeLista: {
        fontSize: 25,
        fontFamily: 'Roboto-Light',
        color: '#5b5b58',
        marginLeft: "5%",
    }
});

export default telaListaTarefas;