import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, StatusBar, FlatList, Modal, TouchableWithoutFeedback, TextInput, ActivityIndicator, Alert, Clipboard } from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { Amigo } from './amigo.js';
import { AmigoModal } from './amigosmodal';
import { MembroInclickavel } from './membroinclickavel';
import * as firebase from 'firebase';

const telaAmigo = (props) => {
    const [meuCodigo, setMeuCodigo] = useState();
    const [modalVisivel, setModalVisivel] = useState(false);
    const [inputCodigo, setInputCodigo] = useState("");
    const [amigos, setAmigos] = useState([]);
    const [refresco, setRefresco] = useState(false);
    const imagensUsuario = [];
    imagensUsuario.push(require("./img/turquesa10.png"));
    imagensUsuario.push(require("./img/gato1.png"));
    imagensUsuario.push(require("./img/gato2.png"));
    imagensUsuario.push(require("./img/gato3.png"));

    const [modalDesfazerAmizadeVisivel, setModalDesfazerAmizadeVisivel] = useState(false);
    const [guardaImagemAmigo, setGuardaImagemAmigo] = useState(19);
    const [guardaNomeAmigo, setGuardaNomeAmigo] = useState("Exemplo Nome");
    const [guardaIdAmigo, setGuardaIdAmigo] = useState();

    function validaNumero(numero) {
        // code to remove non-numeric characters from text
        setInputCodigo(numero.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''));
        // (validação roubada do stack overflow)
    }

    function gerarCodigo() {
        setRefresco(true);
        firebase.firestore()
            .collection("Codigos")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((data) => {
                setMeuCodigo(data.data().codigo);
                Clipboard.setString(data.data().codigo);
                Alert.alert("Aviso", "Código copiado com sucesso!");
                setRefresco(false);
            });
    }

    function trocarTela(id) {
        alert("insira uma troca de tela aqui, id do amigo: " + id);
    }

    function toggleModal() {
        setModalVisivel(!modalVisivel);
    }

    function adicionarAmigo() {
        setRefresco(true);
        let amigo = {};
        firebase.firestore()
            .collection("Codigos")
            .where("codigo", "==", inputCodigo)
            .get().then((snapshot) => {
                if (snapshot.empty) {
                    Alert.alert("Erro", "Usuário não encontrado!");
                }
                snapshot.forEach(doc => {
                    amigo.id = doc.id;
                    amigo.nome = doc.data().nome;
                    amigo.imagem = doc.data().imagem;
                    if (amigo.id != firebase.auth().currentUser.uid) {
                        firebase.firestore()
                            .collection("Amigos")
                            .where("usuarios", "array-contains", firebase.auth().currentUser.uid)
                            .get().then((snap) => {
                                let cont = true;
                                let sender = false;
                                let idAmg = "";
                                if (!snap.empty) {
                                    snap.docs.forEach(duc => {
                                        if (duc.data().usuarios[0] == amigo.id || duc.data().usuarios[1] == amigo.id) {
                                            cont = false;
                                            if (duc.data().sender == firebase.auth().currentUser.uid) {
                                                sender = true;
                                            }
                                            else {
                                                idAmg = duc.id;
                                            }
                                        }
                                    });
                                }
                                if (cont) {
                                    firebase.firestore()
                                        .collection("Amigos")
                                        .add({
                                            confirmado: false,
                                            sender: firebase.auth().currentUser.uid,
                                            data: firebase.firestore.Timestamp.now(),
                                            usuarios: [firebase.auth().currentUser.uid, amigo.id]
                                        })
                                        .then((data) => {
                                            toggleModal();
                                            Alert.alert("Aviso", "Pedido de amizade enviado!");
                                            setRefresco(false);
                                            firebase.firestore()
                                                .collection("Codigos")
                                                .doc(amigo.id)
                                                .collection("Notificacoes")
                                                .add({
                                                    tipo: "amizade",
                                                    nome: firebase.auth().currentUser.displayName,
                                                    idAmizade: data.id,
                                                    idAmigo: firebase.auth().currentUser.uid,
                                                    data: firebase.firestore.Timestamp.now(),
                                                });
                                        });
                                }
                                else if (sender) {
                                    toggleModal();
                                    Alert.alert("Aviso", "Você já enviou um convite para este usuário!");
                                    setRefresco(false);
                                }
                                else if (snap.docs[0].data().confirmado) {
                                    toggleModal();
                                    Alert.alert("Aviso", "Vocês já são amigos!");
                                    setRefresco(false);
                                }
                                else {
                                    firebase.firestore()
                                        .collection("Amigos")
                                        .doc(idAmg)
                                        .update({
                                            confirmado: true
                                        })
                                        .then((data) => {
                                            toggleModal();
                                            setRefresco(false);
                                            firebase.firestore()
                                            .collection("Codigos")
                                            .doc(firebase.auth().currentUser.uid)
                                            .collection("Notificacoes")
                                            .where("idAmizade", "==", idAmg)
                                            .get()
                                            .then(snapshot => snapshot.docs[0].ref.delete());
                                        });
                                }
                            });
                    }
                    else {
                        Alert.alert("Erro", "Você não pode adicionar você mesmo como amigo!");
                    }
                });
            });
    }

    function desfazerAmizade() {
        firebase.firestore()
            .collection("Amigos")
            .doc(guardaIdAmigo)
            .delete()
            .then(() => {
                setModalDesfazerAmizadeVisivel(false);
                let newAmigos = amigos.filter((obj) => {return obj.idAmizade != guardaIdAmigo});
                setAmigos(newAmigos);
            });
    }

    function abrirModalDesfazerAmizade(_id, imagem, nome) {
        setGuardaIdAmigo(_id);
        setGuardaImagemAmigo(imagem);
        setGuardaNomeAmigo(nome);
        setModalDesfazerAmizadeVisivel(true);
    }

    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
        'Roboto-Regular': require('./font/Roboto-Regular.ttf'),
        'Merienda-Regular': require('./font/Merienda-Regular.ttf'),
    });

    useEffect(() => {
        setRefresco(true);
        const listener = firebase.firestore()
            .collection("Amigos")
            .orderBy('data', 'desc')
            .onSnapshot(snapshot => {
                let amigos = [];
                let idAmigos = []
                snapshot.docs.forEach(doc => {
                    let dados = doc.data();
                    if (dados.confirmado && dados.usuarios.includes(firebase.auth().currentUser.uid)) {
                        let _id = dados.usuarios.find((dado) => { return dado != firebase.auth().currentUser.uid });
                        idAmigos.push({idAmigo: _id, id: doc.id});
                    }
                });
                idAmigos.forEach((obj) => {
                    firebase.firestore().collection("Codigos").doc(obj.idAmigo).get().then((snap) => {
                        let amigo = snap.data();
                        amigo.id = obj.idAmigo;
                        amigo.idAmizade = obj.id;
                        amigos.push(amigo);
                        if (idAmigos.length == amigos.length) {
                            setAmigos(amigos);
                            setRefresco(false);
                        }
                    });
                });
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
                    visible={modalVisivel}
                    onRequestClose={() => {
                        setModalVisivel(false);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => { setModalVisivel(false) }}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback>

                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.divTituloModal}>
                                <Text style={styles.textoTituloModal}>Insira o código do amigo</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                textContentType="none"
                                maxLength={32}
                                returnKeyType="done"
                                textAlign="center"
                                onChangeText={(numero) => validaNumero(numero)}
                                value={inputCodigo}
                            />
                            <TouchableOpacity onPress={() => adicionarAmigo(inputCodigo)}>
                                <View style={styles.botaoModal}>
                                    <Text style={styles.textoBotaoModal}>Adicionar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalDesfazerAmizadeVisivel}
                    onRequestClose={() => {
                        setModalDesfazerAmizadeVisivel(false);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => { setModalDesfazerAmizadeVisivel(false); }}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback>

                    <View style={styles.centeredView}>
                        <View style={styles.modalViewMembro}>
                            <View style={{ width: "100%", marginTop: "4%", marginBottom: "3%" }}>
                                <MembroInclickavel
                                    imagem={guardaImagemAmigo}
                                    nome={guardaNomeAmigo}
                                />
                            </View>
                            <TouchableOpacity style={[styles.botaoAdicionarModal, { marginTop: "2%" }]} onPress={() => desfazerAmizade()}>
                                <Text style={styles.textoBotaoAdicionarModal}>Desfazer Amizade</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View style={styles.cabecalho}>
                    <View style={styles.divSetinha}>
                        <TouchableNativeFeedback style={{ padding: "2%" }} onPress={() => props.navigation.goBack()}>
                            <Ionicons name="md-arrow-back" size={40} color="#5b5b58" style={styles.setinha} />
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.divCabecalho}>
                        <Text style={styles.titulo}>Amigos</Text>
                    </View>
                </View>
                <View style={styles.conteudo}>
                    <FlatList
                        data={amigos}
                        keyExtractor={item => item.id}
                        refreshing={refresco}
                        onRefresh={() => { }}
                        renderItem={({ item }) =>
                            <Amigo
                                imagem={imagensUsuario[item.imagem]}
                                nome={item.nome}
                                onPress={() => abrirModalDesfazerAmizade(item.idAmizade, imagensUsuario[item.imagem], item.nome)}
                            />}
                        ListFooterComponent={
                            function rodapeLista() {
                                return (
                                    <View style={styles.rodapeLista}>
                                        <TouchableOpacity onPress={() => toggleModal()} style={styles.botoesRodapeLista}>
                                            <AntDesign name="pluscircleo" size={60} color="#5b5b58" />
                                            <Text style={styles.textoBotaoRodapeLista}>Adicionar amigo</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        }
                        ListEmptyComponent={() =>
                            <Text style={{ alignSelf: "center", fontFamily: "Roboto-Light", fontSize: 20, marginTop: "6%" }}>Nenhum amigo!</Text>
                        }
                    />

                </View>
                <View style={styles.rodape}>
                    <TouchableNativeFeedback onPress={() => toggleModal()}>
                        <View style={styles.botao}>
                            <Text style={styles.textoBotao}>Adicionar</Text>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={() => gerarCodigo()}>
                        <View style={styles.botao}>
                            <Text style={styles.textoBotao}>Meu Código</Text>
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
        width: '40%',
        height: 40,
        aspectRatio: 3.47,
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
        marginTop: "6%",
        alignSelf: 'stretch',
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
        top: 0, // não faço ideia de como o top, right, bottom e left funcionam
        right: 0, // mas eles fazem o view com absolute ocupar toda a tela
        bottom: 0,
        left: 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: "80%",
        height: null,
        aspectRatio: 1.2,
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
        justifyContent: "flex-end",
    },
    botaoModal: {
        width: "85%",
        aspectRatio: 4.47,
        backgroundColor: "#a4a4a4",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5%",
    },
    textoBotaoModal: {
        fontFamily: 'Roboto-Light',
        fontSize: 23,
    },
    divTituloModal: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    textoTituloModal: {
        marginTop: "5%",
        fontFamily: 'Roboto-Light',
        fontSize: 23,
    },
    input: {
        marginBottom: '8%',
        width: '70%',
        borderBottomWidth: 1,
        borderColor: '#5b5b58',
        fontSize: 25,
    },
    modalViewMembro: {
        width: "80%",
        height: null,
        aspectRatio: 2.12,
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
    },
    botaoAdicionarModal: {
        marginTop: "3.5%",
        borderRadius: 40,
        width: "82%",
        height: null,
        aspectRatio: 6.12,
        backgroundColor: "#DC4C46",
        alignItems: "center",
        justifyContent: "center",
    },
    textoBotaoAdicionarModal: {
        fontFamily: 'Roboto-Light',
        fontSize: 20,
        color: 'white',
    },
});

export default telaAmigo;