import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, StatusBar , FlatList, Modal, TouchableWithoutFeedback, TextInput, Dimensions} from "react-native";
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons'; 
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import {Tarefa} from './tarefa.js';
import * as firebase from 'firebase';

const largura = Dimensions.get('window').width;
const altura = Dimensions.get('window').height;

const telaListaTarefas = (props) => {
    const idGrupo = props.navigation.state.params.idGrupo;
    const [tarefas, setTarefas] = useState([]);

    const logoTarefa = [require("./img/Logos/LogoPraCadaTarefa.png"), require("./img/Logos/CadaTarefaCertinho.png")];

    const [refresco, setRefresco] = useState(false);

    const [modalCriarVisivel, setModalCriarVisivel] = useState(false);
    const [modalEditarVisivel, setModalEditarVisivel] = useState(false);

    const [nomeNovaTarefa, setNomeNovaTarefa] = useState("");

    const [guardaTexto, setGuardaTexto] = useState("");
    const [guardaId, setGuardaId] = useState();

    function trocarTela(id) {
        props.navigation.navigate("Tarefa", {
            idGrupo: idGrupo,
            idTarefa: id
        });
    }

    function criarTarefa() {
        setRefresco(true);
        firebase.firestore()
            .collection("Grupos")
            .doc(idGrupo)
            .collection("Tarefas")
            .add({
                data: new Date().getTime(),
                descricao: "Insira uma descrição aqui.",
                lista: [],
                nome: nomeNovaTarefa
            }).then(() => {
                setRefresco(false);
                toggleModalCriar();
            });
        firebase.firestore()
            .collection("Grupos")
            .doc(idGrupo)
            .get()
            .then(snapshot => {
                let paraEnviar = snapshot.data().membros;
                paraEnviar = paraEnviar.filter((obj) => {return obj != firebase.auth().currentUser.uid;});
                paraEnviar.forEach((id) => {
                    firebase.firestore()
                        .collection("Codigos")
                        .doc(id)
                        .collection("Notificacoes")
                        .add({
                            tipo: "tarefa",
                            nome: nomeNovaTarefa,
                            idGrupo: idGrupo,
                            data: new Date().getTime(),
                        });
                });
            });
    }

    function toggleModalCriar() {
        setModalCriarVisivel(!modalCriarVisivel);
    }

    function toggleModalEditar(id, texto) {
        setModalEditarVisivel(true);
        setGuardaId(id);
        setGuardaTexto(texto);
    }

    function editarItem(_id) {
        setRefresco(true);
        firebase.firestore()
            .collection("Grupos")
            .doc(idGrupo)
            .collection("Tarefas")
            .doc(_id)
            .update({
                nome: guardaTexto
            }).then(() => setRefresco(false));
    }

    function deletarItem(_id) {
        setRefresco(true);
        firebase.firestore()
            .collection("Grupos")
            .doc(idGrupo)
            .collection("Tarefas")
            .doc(_id)
            .delete().then(() => setRefresco(false));
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
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalCriarVisivel}
                onRequestClose={() => {
                    setModalCriarVisivel(false);
                }}
            >
                <TouchableWithoutFeedback onPress={() => toggleModalCriar()}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.textoTituloModal}>Nova Tarefa</Text>
                        <TextInput
                            style={styles.input}
                            textContentType="username"
                            textAlign="center"
                            placeholder="Nome"
                            onChangeText={(nomeNovaTarefa) => setNomeNovaTarefa(nomeNovaTarefa.trim())}
                            maxLength={30}
                            autoCorrect={false}
                            returnKeyType="done"
                        />
                        <View style={styles.divBotaoSalvar}>
                            <TouchableOpacity style={styles.botaoSalvar} onPress={() => criarTarefa()}>
                                <Text style={styles.textoBotaoSalvar}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalEditarVisivel}
                onRequestClose={() => {
                    setModalEditarVisivel(false);
                }}
            >
                <TouchableWithoutFeedback onPress={() => {setModalEditarVisivel(false)}}>
                    <View style={styles.overlay}/>
                </TouchableWithoutFeedback>

                <View style={styles.centeredView}>
                    <View style={styles.modalEditarView}>
                        <View style={styles.overlay}>
                            <TouchableOpacity onPress={() => setModalEditarVisivel(false)}>
                                <AntDesign name="close" size={28} color="#5b5b58" style={styles.Xzinho}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.overlayDelete}>
                            <TouchableOpacity onPress={() => {deletarItem(guardaId), setModalEditarVisivel(false)}}>
                                <FontAwesome5 name="trash-alt" size={24} color="#5b5b58" style={styles.delete}/>
                            </TouchableOpacity>
                        </View>
                        
                        <Text style={styles.textoTituloModal}>Editar</Text>

                        <TextInput 
                            style={styles.input}
                            textContentType="none"
                            returnKeyType="done"
                            textAlign="center"
                            defaultValue={guardaTexto}
                            maxLength={30}
                            onChangeText={(texto) => setGuardaTexto(texto)}
                        />

                        <TouchableOpacity style={styles.botaoSalvarModalEditar} onPress={() => {editarItem(guardaId), setModalEditarVisivel(false)}}>
                            <Text style={styles.textoBotaoSalvarModalEditar}>Salvar</Text>
                        </TouchableOpacity>
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
                    refreshing={refresco}
                    onRefresh={() => {}}
                    renderItem={({item})=>
                        <Tarefa 
                            imagem={logoTarefa[0]}
                            nome={item.nome} 
                            onPress={() => trocarTela(item.id)}
                            onLongPress={() => toggleModalEditar(item.id, item.nome)}
                        />}
                    ListFooterComponent={
                        function rodapeLista() {
                            return (
                                <View style={styles.rodapeLista}>
                                    <TouchableOpacity onPress={() => toggleModalCriar()} style={styles.botoesRodapeLista}>
                                        <AntDesign name="pluscircleo" size={60} color="#5b5b58" />
                                        <Text style={styles.textoBotaoRodapeLista}>Criar nova tarefa</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    }
                />
                
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
        marginBottom: '3%',
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
        marginTop: "7%",
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
    overlay: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: 0.80*largura,
        height: 0.4*largura,
        backgroundColor: "#c4c4c4",
        // borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingBottom: "5%",
    },
    textoTituloModal: {
        marginTop: "2%",
        fontFamily: 'Roboto-Light',
        fontSize: 23,
    },
    divBotaoSalvar: {
        position: "absolute",
        width: 0.80*largura,
        height: 0.4*largura,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    botaoSalvar: {
        width: "80%",
        height: 0.10*largura,
        marginBottom: "5%",
        backgroundColor: "#53A156",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
    },
    textoBotaoSalvar: {
        fontFamily: 'Roboto-Light',
        fontSize: 23,
    },
    input: {
        marginTop: '5%',
        width: '80%',
        borderBottomWidth: 1,
        borderColor: '#5b5b58',
        fontSize: 18,
    },
    modalEditarView: {
        width: "80%",
        height: null,
        aspectRatio: 2,
        backgroundColor: "#c4c4c4",
        // borderRadius: 20,
        justifyContent: "space-evenly",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    botaoSalvarModalEditar: {
        marginTop: "3.5%",
        borderRadius: 40,
        width: "82%",
        height: null,
        aspectRatio: 6.12,
        backgroundColor: "#53A156",
        alignItems: "center",
        justifyContent: "center",
    },
    textoBotaoSalvarModalEditar: {
        fontFamily: 'Roboto-Light',
        fontSize: 25,
        color: '#000000',
    },
    Xzinho: {
        marginLeft: "3%",
        marginTop: "4%",
    },
    overlayDelete: {
        position: "absolute",
        alignItems: "flex-end",
        top: 0, // não faço ideia de como o top, right, bottom e left funcionam
        right: 0, // mas eles fazem o view com absolute ocupar toda a tela
        bottom: 0,
        left: 0,
    },
    delete: {
        marginRight: "3.3%",
        marginTop: "4%",
    },
});

export default telaListaTarefas;