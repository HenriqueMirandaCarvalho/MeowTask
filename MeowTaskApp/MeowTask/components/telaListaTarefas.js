import React, { useState, version } from "react";
import {View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, StatusBar , FlatList, Modal, TouchableWithoutFeedback, TextInput, ActivityIndicator} from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons'; 
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import {Tarefa} from './tarefa.js';
import Conexao from './classes/Conexao.js';

const telaListaTarefas = (props) => {
    const idGrupo = props.navigation.state.params.idGrupo;
    const [tarefas, setTarefas] = useState([]);
    const [loadedTarefas, setLoadTarefas] = useState(false);
    const [loading, setLoading] = useState(true);

    const logoTarefa = [require("./img/Logos/LogoPraCadaTarefa.png"), require("./img/Logos/CadaTarefaCertinho.png")];

    const [refrescando, setRefrescando] = useState(false);

    function refrescar(){
        setRefrescando(true);
        alert("olha o refresco!");
    }

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

    function carregarTarefas() {
        let conn = new Conexao();
        conn.getTarefasByGrupoId(idGrupo)
            .catch((error) => {
                Alert.alert("Erro", error);
            })
            .then((obj) => {
                setTarefas(obj);
                setLoading(false);
            });
        setLoadTarefas(true);
    }
    
    if (!loadedTarefas) {
        carregarTarefas();
    }
        
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
    return (
        <View style={styles.container}>
            <Modal 
                visible={loading}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.centeredViewCarregar}>
                    <View style={styles.modalCarregar}>
                        <ActivityIndicator size={70} color="#53A156"/>
                    </View>
                </View>
            </Modal>
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
                    refreshing={refrescando}
                    onRefresh={() => refrescar()}
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
    },
    centeredViewCarregar: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
    },
    modalCarregar: {
        width: "30%",
        aspectRatio: 1,
        backgroundColor: "#ededed",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: "center",
    }
});

export default telaListaTarefas;