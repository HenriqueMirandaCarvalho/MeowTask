import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, SafeAreaView, StatusBar, FlatList, Modal, TouchableWithoutFeedback, TextInput, ActivityIndicator, Alert, Clipboard, Image } from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { Membro } from './membro.js';
import { MembroInclickavel } from './membroinclickavel.js';
import { AmigoModal } from './amigosmodal';
import * as firebase from 'firebase';
import { ScrollView } from "react-native-gesture-handler";

const telaAmigo = (props) => {
    const idGrupo = props.navigation.state.params.idGrupo;
    const [modalAdicionarVisivel, setModalAdicionarVisivel] = useState(false);
    const [idAdm, setIdAdm] = useState("");
    const [meuId, setMeuId] = useState(firebase.auth().currentUser.uid);
    const [membros, setMembros] = useState([]);
    const [refresco, setRefresco] = useState(true);
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

    const [banidos, setBanidos] = useState([]);
    const [amigos, setAmigos] = useState([]);

    function gerarCodigo() {
        Clipboard.setString(idGrupo);
        Alert.alert("Aviso", "Código copiado com sucesso!");
    }

    function toggleModalAdicionar() {
        if (meuId == idAdm) {
            setModalAdicionarVisivel(!modalAdicionarVisivel);
            firebase.firestore()
                .collection("Amigos")
                .orderBy('data', 'desc')
                .onSnapshot(snapshot => {
                    let novoAmigos = [];
                    let idAmigos = []
                    snapshot.docs.forEach(doc => {
                        let dados = doc.data();
                        if (dados.confirmado && dados.usuarios.includes(firebase.auth().currentUser.uid)) {
                            let _id = dados.usuarios.find((dado) => { return dado != firebase.auth().currentUser.uid });
                            idAmigos.push(_id);
                        }
                    });
                    let tamanho = idAmigos.length;
                    idAmigos.forEach((_id) => {
                        firebase.firestore().collection("Codigos").doc(_id).get().then((snap) => {
                            let amigo = snap.data();
                            amigo.id = _id;
                            let alreadyMembro = false;
                            membros.forEach((doc) => {
                                if (doc.id == _id) {
                                    alreadyMembro = true;
                                    tamanho = tamanho - 1;
                                }
                            });
                            banidos.forEach((doc) => {
                                if (doc.id == _id) {
                                    alreadyMembro = true;
                                    tamanho = tamanho - 1;
                                }
                            })
                            if (!alreadyMembro) {
                                novoAmigos.push(amigo);
                                console.log(novoAmigos);
                            }
                            if (idAmigos.length == novoAmigos.length) {
                                setAmigos([...novoAmigos]);
                                console.log(amigos);
                                setRefresco(false);
                            }
                        });
                    });
                });
        }
    }

    function adicionarPessoa(_id) {
        firebase.firestore()
            .collection("Grupos")
            .doc(idGrupo)
            .get()
            .then(snapshot => {
                let novoMembros = snapshot.data().membros;
                novoMembros.push(_id);
                firebase.firestore()
                    .collection("Grupos")
                    .doc(idGrupo)
                    .update({
                        membros: novoMembros
                    });
                toggleModalAdicionar();
            });
    }

    function acharAdmin(id, imagem, nome) {
        if (id == idAdm) {
            return (
                <View>
                    <View style={styles.divAdmin}>
                        <Text style={styles.cargo}>Administrador</Text>
                        <MembroInclickavel
                            imagem={imagensUsuario[imagem]}
                            nome={nome}
                        />
                    </View>
                    <View style={styles.divMembroComum}>
                        <Text style={styles.cargo}>Membros</Text>
                    </View>
                </View>
            );
        }
    }

    function acharMembro(id, imagem, nome) {
        if (id != idAdm) {
            if (meuId == idAdm) {
                return (
                    <Membro
                        imagem={imagensUsuario[imagem]}
                        nome={nome}
                        onPress={() => abrirModalMembro(id, imagensUsuario[imagem], nome)}
                    />
                );
            }
            else {
                return (
                    <MembroInclickavel
                        imagem={imagensUsuario[imagem]}
                        nome={nome}
                    />
                );
            }
        }
    }

    function listaBanidos(_banidos) {
        if (_banidos.length == 0) {
            return (
                <View style={{ borderTopWidth: 1, borderTopColor: "#5b5b58", }}>
                    <Text style={[styles.cargo, { color: "#DC4C46" }]}>Banimentos</Text>
                    <Text style={styles.semBanidos}>Não há banimentos</Text>
                </View>
            )
        } else {
            const membrosBanidos = _banidos.map((item) => {
                if (meuId == idAdm) {
                return (
                    <Membro
                        imagem={imagensUsuario[item.imagem]}
                        nome={item.nome}
                        estiloExtra={{ color: '#DC4C46', }}
                        onPress={() => abrirModalMembroBanido(item.id, imagensUsuario[item.imagem], item.nome)}
                    />
                );
                }
                else {
                    return (
                        <MembroInclickavel
                            imagem={imagensUsuario[item.imagem]}
                            nome={item.nome}
                            estiloExtra={{ color: '#DC4C46', }}
                        />
                    );
                }
            });
            return (
                <View style={{ borderTopWidth: 1, borderTopColor: "#5b5b58", }}>
                    <Text style={[styles.cargo, { color: "#DC4C46" }]}>Banimentos</Text>
                    {membrosBanidos}
                </View>
            );
        }
    }

    function abrirModalMembro(_id, imagem, nome) {
        if (meuId == idAdm) {
            setGuardaIdMembro(_id);
            setGuardaImagemMembro(imagem);
            setGuardaNomeMembro(nome);
            setModalMembroVisivel(true);
        }
    }

    function abrirModalMembroBanido(_id, imagem, nome) {
        if (meuId == idAdm) {
            setGuardaIdMembro(_id);
            setGuardaImagemMembro(imagem);
            setGuardaNomeMembro(nome);
            setModalMembroBanidoVisivel(true);
        }
    }

    function banir() {
        firebase.firestore()
            .collection("Grupos")
            .doc(idGrupo)
            .get()
            .then(snapshot => {
                let novoMembros = snapshot.data().membros;
                novoMembros = novoMembros.filter((value, index, arr) => { return value.toString() != guardaIdMembro.toString(); });
                let newBanidos = snapshot.data().banidos;
                newBanidos.push(guardaIdMembro);
                firebase.firestore()
                    .collection("Grupos")
                    .doc(idGrupo)
                    .update({
                        membros: novoMembros,
                        banidos: newBanidos
                    }).then(() => setModalMembroVisivel(false));
            });
    }

    function expulsar() {
        firebase.firestore()
            .collection("Grupos")
            .doc(idGrupo)
            .get()
            .then(snapshot => {
                let novoMembros = snapshot.data().membros;
                novoMembros = novoMembros.filter((value, index, arr) => { return value.toString() != guardaIdMembro.toString(); });
                firebase.firestore()
                    .collection("Grupos")
                    .doc(idGrupo)
                    .update({
                        membros: novoMembros
                    }).then(() => setModalMembroVisivel(false));
            });
    }

    function desbanir() {
        setModalMembroBanidoVisivel(false);
        setRefresco(true);
        firebase.firestore()
            .collection("Grupos")
            .doc(idGrupo)
            .get()
            .then(snapshot => {
                let newBanidos = snapshot.data().banidos;
                newBanidos = newBanidos.filter((value, index, arr) => { return value.toString() != guardaIdMembro.toString(); });
                firebase.firestore()
                    .collection("Grupos")
                    .doc(idGrupo)
                    .update({
                        banidos: newBanidos
                    }).then(() => {
                        firebase.firestore()
                            .collection("Grupos")
                            .doc(idGrupo)
                            .onSnapshot(snapshot => {
                                let newBanidos = [];
                                if (snapshot.data().banidos.length == 0) {
                                    setRefresco(false);
                                    setBanidos([]);
                                }
                                if (snapshot.data().banidos) {
                                    snapshot.data().banidos.forEach((_id) => {
                                        firebase.firestore().collection("Codigos").doc(_id).get().then((snap) => {
                                            let membroB = snap.data();
                                            membroB.id = _id;
                                            newBanidos.push(membroB);
                                            if (snapshot.data().banidos.length == newBanidos.length) {
                                                setBanidos(newBanidos);
                                                setRefresco(false);
                                            }
                                        });
                                    });
                                }
                            });
                    });
            });
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
            .onSnapshot(snapshot => {
                let usuarios = [];
                snapshot.data().membros.forEach((_id) => {
                    firebase.firestore().collection("Codigos").doc(_id).get().then((snap) => {
                        let membro = snap.data();
                        membro.id = _id;
                        usuarios.push(membro);
                        if (usuarios.length == snapshot.data().membros.length) {
                            setMembros(usuarios);
                            setRefresco(false);
                        }
                    });
                });
            });
        return () => listener();
    }, []);

    useEffect(() => {
        const listener = firebase.firestore()
            .collection("Grupos")
            .doc(idGrupo)
            .onSnapshot(snapshot => {
                let newBanidos = [];
                if (snapshot.data().banidos) {
                    snapshot.data().banidos.forEach((_id) => {
                        firebase.firestore().collection("Codigos").doc(_id).get().then((snap) => {
                            let membroB = snap.data();
                            membroB.id = _id;
                            newBanidos.push(membroB);
                            if (snapshot.data().banidos.length == newBanidos.length) {
                                setBanidos(newBanidos);
                            }
                        });
                    });
                }
            });
        return () => listener();
    }, []);

    useEffect(() => {
        const listener = firebase.firestore()
            .collection("Grupos")
            .doc(idGrupo)
            .onSnapshot(snapshot => {
                setIdAdm(snapshot.data().dono);
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
                            <Text style={styles.textoTituloModal}>Adicionar Membro</Text>

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
                                            <View style={{ marginTop: "12%" }}>
                                                <Text style={styles.tituloListaAmigos}>Você não possuí amigos,</Text>
                                                <Text style={styles.tituloListaAmigos}>ou eles já estão neste</Text>
                                                <Text style={styles.tituloListaAmigos}>grupo!</Text>
                                            </View>
                                        }
                                    />
                                </SafeAreaView>
                            </View>
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
                            <View style={{ width: "100%", marginTop: "4%", marginBottom: "3%" }}>
                                <MembroInclickavel
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
                            <View style={{ width: "100%", marginTop: "4%", marginBottom: "3%" }}>
                                <MembroInclickavel
                                    imagem={guardaImagemMembro}
                                    nome={guardaNomeMembro}
                                />
                            </View>
                            <TouchableOpacity style={[styles.botaoAdicionarModal, { marginTop: "2%" }]} onPress={() => desbanir()}>
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
                    <ScrollView>
                    <FlatList
                        data={membros}
                        keyExtractor={item => item.id}
                        refreshing={refresco}
                        onRefresh={() => { }}
                        renderItem={({ item }) =>
                            <View>
                                {acharAdmin(item.id, item.imagem, item.nome)}
                            </View>}
                        style={{ width: "100%" }}
                    />
                    <FlatList
                        data={membros}
                        keyExtractor={item => item.id}
                        // refreshing={refresco}
                        // onRefresh={() => { }}
                        renderItem={({ item }) =>
                            <View>
                                {acharMembro(item.id, item.imagem, item.nome)}
                            </View>}
                        style={{ width: "100%" }}
                        ListFooterComponent={
                            function rodapeLista() {
                                return (
                                    <View style={{ paddingBottom: "10%" }}>
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
                    </ScrollView>
                </View>
                <View style={styles.rodape}>
                    <TouchableNativeFeedback onPress={() => toggleModalAdicionar()}>
                        <View style={styles.botao}>
                            <Text style={styles.textoBotao}>Adicionar</Text>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={() => gerarCodigo()}>
                        <View style={styles.botao}>
                            <Text style={[styles.textoBotao, { fontSize: 18 }]}>Código do grupo</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <StatusBar translucent backgroundColor={'#eae6da'} />
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
        height: '9%', // 8% se tiver margintop e 11% se não tiver
        borderBottomWidth: 1.6,
        borderColor: '#5b5b58',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    divCabecalho: {
        width: '100%',
        alignItems: 'center',
    },
    setinha: {
        marginLeft: '5%',
        marginTop: '0.5%',
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
        marginTop: "2%",
        marginBottom: "2%",
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
        fontFamily: 'Roboto-Regular',
        color: '#5b5b58',
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
    semBanidos: {
        marginTop: "3%",
        alignSelf: "center",
        fontFamily: 'Roboto-Light',
        fontSize: 20,
        color: '#DC4C46',
    }
});

export default telaAmigo;