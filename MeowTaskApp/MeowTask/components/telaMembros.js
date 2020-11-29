import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, SafeAreaView, StatusBar, FlatList, Modal, TouchableWithoutFeedback, TextInput, ActivityIndicator, Alert, Clipboard, Image } from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { Membro } from './membro.js';
import { AmigoModal } from './amigosmodal';
import * as firebase from 'firebase';

const telaAmigo = (props) => {
    const [meuCodigo, setMeuCodigo] = useState();
    const [modalAdicionarVisivel, setModalAdicionarVisivel] = useState(false);
    const [inputCodigo, setInputCodigo] = useState("");
    const [amigos, setAmigos] = useState([]);
    const [refresco, setRefresco] = useState(false);
    const imagensUsuario = [];
    imagensUsuario.push(require("./img/turquesa10.png"));
    imagensUsuario.push(require("./img/gato1.png"));
    imagensUsuario.push(require("./img/gato2.png"));
    imagensUsuario.push(require("./img/gato3.png"));

    const [guardaImagemMembro, setGuardaImagemMembro] = useState(19);
    const [guardaNomeMembro, setGuardaNomeMembro] = useState("Exemplo Nome");
    const [guardaIdMembro, setGuardaIdMembro] = useState();

    const [modalMembroVisivel, setModalMembroVisivel] = useState(false);
    const [modalMembroBanidoVisivel, setModalMembroBanidoVisivel] = useState(false);

    const [banidos, setBanidos] = useState([
        {
            id: 1,
            imagem: 1,
            nome: "kaio mulek"
        },
        {
            id: 2,
            imagem: 1,
            nome: "luis"
        }
    ]);

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

    function toggleModalAdicionar() {
        setModalAdicionarVisivel(!modalAdicionarVisivel);
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
                            .where("usuarios", "array-contains", {
                                id: firebase.auth().currentUser.uid,
                                nome: firebase.auth().currentUser.displayName,
                                imagem: firebase.auth().currentUser.photoURL
                            })
                            .get().then((snap) => {
                                let cont = true;
                                let sender = false;
                                let idAmg = "";
                                if (!snap.empty) {
                                    snap.forEach(duc => {
                                        if (duc.data().usuarios[0].id == amigo.id || duc.data().usuarios[1].id == amigo.id) {
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
                                            data: new Date().getTime(),
                                            usuarios: [
                                                {
                                                    id: firebase.auth().currentUser.uid,
                                                    nome: firebase.auth().currentUser.displayName,
                                                    imagem: firebase.auth().currentUser.photoURL
                                                }, amigo
                                            ]
                                        })
                                        .then((data) => {
                                            toggleModal();
                                            Alert.alert("Aviso", "Pedido de amizade enviado!");
                                            setRefresco(false);
                                            firebase.firestore()
                                                .collection("Notificacoes")
                                                .doc(amigo.id)
                                                .add({
                                                    tipo: "pedido-amizade",
                                                    titulo: "Pedido de amizade",
                                                    descricao: firebase.auth().currentUser.displayName + " quer ser seu amigo!",
                                                    idAmizade: data.id
                                                });
                                        });
                                }
                                else if (sender) {
                                    toggleModal();
                                    Alert.alert("Aviso", "Você já enviou um convite para este usuário!");
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
                                            Alert.alert("Aviso", "Vocês são amigos agora!");
                                            setRefresco(false);
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

    function adicionarPessoa(_id) {
        alert("id: "+id);
    }

    function salvarAdicaoDePessoas() {
        alert("blz, já salvo");
    }

    function acharAdmin(id, imagem, nome) {
        let idadmin = "bGLRrVZMJLYagThFd2vk2ho883g2";
        if (id == idadmin) {
            return ( 
                <View style={styles.divAdmin}> 
                    <Text style={styles.cargo}>Administrador</Text>
                    <Membro
                        imagem={imagensUsuario[imagem]}
                        nome={nome}
                        onLongPress={() => abrirModalMembro(id, imagensUsuario[imagem], nome)}
                    />
                </View>
            );
        }
    }

    function listaBanidos(_banidos) {
        const membrosBanidos = _banidos.map((item) => {
            return (
                <Membro
                    imagem={imagensUsuario[item.imagem]}
                    nome={item.nome}
                    onLongPress={() => abrirModalMembroBanido(item.id, imagensUsuario[item.imagem], item.nome)}
                />
            );
        });
        return (
            <View style={{borderTopWidth: 1, borderTopColor: "#5b5b58",}}>
                <Text style={styles.cargo}>Membros Banidos</Text>
                {membrosBanidos}
            </View>
        );
    }

    function abrirModalMembro(_id, imagem, nome) {
        setGuardaIdMembro(_id);
        setGuardaImagemMembro(imagem);
        setGuardaNomeMembro(nome);
        setModalMembroVisivel(true);
    }

    function abrirModalMembroBanido(_id, imagem, nome) {
        setGuardaIdMembro(_id);
        setGuardaImagemMembro(imagem);
        setGuardaNomeMembro(nome);
        setModalMembroBanidoVisivel(true);
    }

    function banir() {
        alert("B A N I D O");
    }

    function expulsar() {
        alert("expulsar");
    }

    function desbanir() {
        alert("desbanido!");
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
                const amigos = snapshot.docs.map(doc => {
                    const dados = doc.data();
                    if (dados.confirmado) {
                        const amigo = dados.usuarios.find((dado) => { return dado.id != firebase.auth().currentUser.uid });
                        return amigo;
                    }
                });
                if (amigos[0] != undefined)
                    setAmigos(amigos);
                else
                    setAmigos([]);
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
                    visible={modalAdicionarVisivel}
                    onRequestClose={() => {
                        setModalAdicionarVisivel(false);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => { setModalAdicionarVisivel(false) }}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback>

                    <View style={styles.centeredView}>
                        <View style={styles.modalViewAdicionar}>
                            <Text style={styles.textoTituloModal}>Adicionar Membros</Text>

                            <View style={styles.divListaAmigos}>
                                <SafeAreaView style={{ flex: 1 }}>
                                    <FlatList
                                        data={amigos}
                                        keyExtractor={item => item.id}
                                        ListHeaderComponent={
                                            function rodapeLista() {
                                                return (
                                                    <Text style={styles.tituloListaAmigos}>Convidar amigos</Text>
                                                )
                                            }
                                        }
                                        renderItem={({ item }) =>
                                            <AmigoModal
                                                imagem={item.imagem}
                                                nome={item.nome}
                                                onPress={() => adicionarPessoa(item.id)}
                                            />}
                                        ListEmptyComponent={() =>
                                            <Text style={styles.tituloListaAmigos}>Você não possuí amigos!</Text>
                                        }
                                    />
                                </SafeAreaView>
                            </View>

                            <TouchableOpacity style={styles.botaoAdicionarModal} onPress={() => salvarAdicaoDePessoas()}>
                                <Text style={styles.textoBotaoAdicionarModal}>Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalMembroVisivel}
                    onRequestClose={() => {
                        setModalMembroVisivel(false);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => { setModalMembroVisivel(false); }}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback>

                    <View style={styles.centeredView}>
                        <View style={styles.modalViewMembro}>
                            <View style={{width: "100%", marginTop: "4%", marginBottom: "3%"}}>
                                <Membro
                                    imagem={guardaImagemMembro}
                                    nome={guardaNomeMembro}
                                />
                            </View>
                            <View style={styles.divBotoesMembroModal}>
                                <TouchableOpacity style={styles.botaoMembroModal} onPress={() => banir()}>
                                    <Text style={styles.textoBotaoMembroModal}>Banir</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.botaoMembroModal} onPress={() => expulsar()}>
                                    <Text style={styles.textoBotaoMembroModal}>Expulsar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalMembroBanidoVisivel}
                    onRequestClose={() => {
                        setModalMembroBanidoVisivel(false);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => { setModalMembroBanidoVisivel(false); }}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback>

                    <View style={styles.centeredView}>
                        <View style={styles.modalViewMembro}>
                            <View style={{width: "100%", marginTop: "4%", marginBottom: "3%"}}>
                                <Membro
                                    imagem={guardaImagemMembro}
                                    nome={guardaNomeMembro}
                                />
                            </View>
                            <TouchableOpacity style={[styles.botaoAdicionarModal, {marginTop: "2%"}]} onPress={() => desbanir()}>
                                <Text style={styles.textoBotaoAdicionarModal}>Desbanir</Text>
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
                        <Text style={styles.titulo}>Membros</Text>
                    </View>
                </View>
                <View style={styles.conteudo}>
                        <FlatList
                            data={amigos}
                            keyExtractor={item => item.id}
                            refreshing={refresco}
                            onRefresh={() => { }}
                            renderItem={({ item }) =>
                                <View>
                                    {acharAdmin(item.id, item.imagem, item.nome)}
                                    <View style={styles.divMembroComum}>
                                        <Text style={styles.cargo}>Membros</Text>
                                    </View>
                                    <Membro
                                        imagem={imagensUsuario[item.imagem]}
                                        nome={item.nome}
                                        onLongPress={() => abrirModalMembro(item.id, imagensUsuario[item.imagem], item.nome)}
                                    />
                                </View>}
                            style={{width: "100%"}}
                            ListFooterComponent={
                                function rodapeLista() {
                                    return (
                                        <View style={{paddingBottom: "10%"}}>
                                            <View style={styles.rodapeLista}>
                                                <TouchableOpacity onPress={() => toggleModalAdicionar()} style={styles.botoesRodapeLista}>
                                                    <AntDesign name="pluscircleo" size={50} color="#5b5b58" />
                                                    <Text style={styles.textoBotaoRodapeLista}>Adicionar membros</Text>
                                                </TouchableOpacity>
                                            </View>
                                            {listaBanidos(banidos)}
                                        </View>
                                    )
                                }
                            }
                            ListEmptyComponent={() =>
                                <Text style={{ alignSelf: "center", fontFamily: "Roboto-Light", fontSize: 20, marginTop: "6%" }}>Nenhum membro!</Text>
                            }
                        />
                    </View>
                <View style={styles.rodape}>
                    <TouchableNativeFeedback onPress={() => toggleModalAdicionar()}>
                        <View style={styles.botao}>
                            <Text style={styles.textoBotao}>Adicionar</Text>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={() => gerarCodigo()}>
                        <View style={styles.botao}>
                            <Text style={[styles.textoBotao,{fontSize: 18}]}>Código do grupo</Text>
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
        marginTop: StatusBar.currentHeight || 0,
    },
    cabecalho: {
        height: '8%', // 8% se tiver margintop e 11% se não tiver
        borderBottomWidth: 1.6,
        borderColor: '#5b5b58',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
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
    divAdmin: {
        paddingBottom: "5%",
        borderBottomWidth: 1,
        borderBottomColor: "#5b5b58",
    },
    cargo: {
        marginTop: "3%",
        fontFamily: 'Roboto-Light',
        fontSize: 23,
        alignSelf: "center",
    },
    modalViewAdicionar: {
        width: "80%",
        height: null,
        aspectRatio: 1,
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
    divListaAmigos: {
        marginTop: "3.3%",
        width: "80%",
        height: "62%",
        backgroundColor: "#a4a4a4",
    },
    botaoAdicionarModal: {
        marginTop: "3.5%",
        borderRadius: 40,
        width: "82%",
        height: null,
        aspectRatio: 6.12,
        backgroundColor: "#53A156",
        alignItems: "center",
        justifyContent: "center",
    },
    botaoMembroModal: {
        marginTop: "3.5%",
        borderRadius: 40,
        width: "40%",
        height: null,
        aspectRatio: 3.5,
        backgroundColor: "#53A156",
        alignItems: "center",
        justifyContent: "center",
    },
    textoBotaoMembroModal: {
        fontFamily: 'Roboto-Light',
        fontSize: 20,
        color: '#000000',
    },
    tituloListaAmigos: {
        fontFamily: 'Roboto-Light',
        fontSize: 18,
        color: '#000000',
        alignSelf: "center",
    },
    textoBotaoAdicionarModal: {
        fontFamily: 'Roboto-Light',
        fontSize: 25,
        color: '#000000',
    },
    divBotoesMembroModal: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
});

export default telaAmigo;