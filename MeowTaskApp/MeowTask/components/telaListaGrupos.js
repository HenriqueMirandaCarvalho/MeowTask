import React, { useState, version } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, StatusBar , FlatList, Modal } from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons'; 
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import {Grupo} from './objGrupo.js';
import * as firebase from 'firebase';

let grupos = [
    {
        id: "1",
        nome: "grupo de atividades",
        membros: "20",
        imagem: require('./img/turquesa10.png'),
    },
    {
        id: "2",
        nome: "grupo de atividades",
        membros: "20",
        imagem: require('./img/turquesa10.png'),
    },
    {
        id: "3",
        nome: "grupo de atividades",
        membros: "20",
        imagem: require('./img/turquesa10.png'),
    },
    {
        id: "4",
        nome: "grupo de atividades",
        membros: "20",
        imagem: require('./img/turquesa10.png'),
    },
    {
        id: "5",
        nome: "grupo de atividades",
        membros: "20",
        imagem: require('./img/turquesa10.png'),
    },
    {
        id: "6",
        nome: "grupo de atividades",
        membros: "20",
        imagem: require('./img/turquesa10.png'),
    },
    {
        id: "7",
        nome: "grupo de atividades",
        membros: "20",
        imagem: require('./img/turquesa10.png'),
    },
    {
        id: "8",
        nome: "grupo de atividades",
        membros: "20",
        imagem: require('./img/turquesa10.png'),
    },
    {
        id: "9",
        nome: "grupo de atividades",
        membros: "20",
        imagem: require('./img/turquesa10.png'),
    },
    {
        id: "10",
        nome: "grupo de atividades",
        membros: "20",
        imagem: require('./img/turquesa10.png'),
    },
]

const telaListaGrupos = (props) => {   
    function voltar() {
        
    }

    function trocarTela(id) {
        alert("insira uma troca de tela aqui, id do grupo: " + id);
    }

    function criarGrupo() {
        setModalCriarGrupo(true);
    }

    function entrarGrupo() {
        setModalEntrarGrupo(true);
    }
    
    async function carregarGrupos() {
        let gruposRef = firebase.firestore().collection("Grupos");
        let usuariosRef = firebase.firestore().collection("Usuarios");
        let usuarioAtualId = "";
        usuariosRef.where('email', '==', firebase.auth().currentUser.email).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    alert("Você precisa estar logado para acessar esta função!");
                    return;
                }
                
                snapshot.forEach(doc => {
                    usuarioAtualId = doc.id;
                });
                gruposRef.where('membros', 'array-contains', usuarioAtualId).get()
                    .then(snapshot => {
                        if (snapshot.empty) {
                            grupos = [];
                            return;
                        }

                        grupos = [];
                        snapshot.forEach(doc => {
                            grupos.push({
                                id: doc.id,
                                nome: doc.data().nome,
                                membros: doc.data().membros.length,
                                imagem: require('./img/turquesa10.png'),
                            });
                        });
                    });
            });
    }

    const [modalCriarGrupo, setModalCriarGrupo] = useState(false);
    const [modalEntrarGrupo, setModalEntrarGrupo] = useState(false);

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
                    <TouchableOpacity onPress={voltar}>
                        <Ionicons name="md-arrow-back" size={40} color="#5b5b58" style={styles.setinha}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.divCabecalho}>
                    <Text style={styles.titulo}> Grupos</Text>
                </View>
            </View>
            <View style={styles.conteudo}>
                <FlatList
                    data={grupos}
                    extraData={grupos}
                    keyExtractor={item=>item.id}
                    renderItem={({item})=>
                        <Grupo 
                            imagem={item.imagem}
                            nome={item.nome} 
                            membros={item.membros} 
                            atividades={item.atividades}
                            onPress={() => trocarTela(item.id)}
                        />}
                    ListFooterComponent={
                        function rodapeLista() {
                            return (
                                <View style={styles.rodapeLista}>
                                    <TouchableOpacity onPress={criarGrupo} style={styles.botoesRodapeLista}>
                                        <AntDesign name="pluscircleo" size={60} color="#5b5b58" />
                                        <Text style={styles.textoBotaoRodapeLista}>Criar novo grupo</Text>
                                    </TouchableOpacity>
                                    <View style={styles.tracinho}/>
                                    <TouchableOpacity onPress={entrarGrupo} style={styles.botoesRodapeLista}>
                                        <AntDesign name="pluscircleo" size={60} color="#5b5b58" />
                                        <Text style={styles.textoBotaoRodapeLista}>Entrar em um grupo</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    }
                />
                
            </View>
            <View style={styles.rodape}>
                <TouchableNativeFeedback onPress={criarGrupo}>
                    <View style={styles.botao}>
                        <Text style={styles.textoBotao}>Criar</Text>
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={entrarGrupo}>
                    <View style={styles.botao}>
                        <Text style={styles.textoBotao}>Entrar</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
            <Modal
                animationType={'slide'}
                transparent={false}
                visible={modalCriarGrupo}
                onRequestClose={() => {
                    setModalCriarGrupo(false);
                }}
            >
                <View style={styles.container}>
                    <Text>Modal de Criar</Text>
                </View>
            </Modal>
            <Modal
                animationType={'slide'}
                transparent={false}
                visible={modalEntrarGrupo}
                onRequestClose={() => {
                    setModalEntrarGrupo(false);
                }}
            >
                <View style={styles.container}>
                    <Text>Modal de Entrar</Text>
                </View>
            </Modal>
            <StatusBar translucent backgroundColor={'#649DF1'}/>
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
        aspectRatio: 5, //2.47,
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
    tracinho: {
        width: '70%',
        borderBottomWidth: 1,
        borderColor: '#5b5b58',
        alignSelf: "center",
        backgroundColor: "yellow",
    },
    textoBotaoRodapeLista: {
        fontSize: 25,
        fontFamily: 'Roboto-Light',
        color: '#5b5b58',
        marginLeft: "5%",
    },
});

export default telaListaGrupos;