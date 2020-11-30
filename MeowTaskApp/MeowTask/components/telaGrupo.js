import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableNativeFeedback, Modal, TouchableWithoutFeedback } from "react-native";
import { Ionicons, AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import * as firebase from 'firebase';
import { MembroInclickavel } from './membroinclickavel';

const telaGrupo = (props) => {
    const idGrupo = props.navigation.state.params.idGrupo;
    const [nomeGrupo, setNomeGrupo] = useState("...");
    const [imagem, setImagem] = useState(0);

    const [idAdm, setIdAdm] = useState("");
    const [meuId, setMeuId] = useState(firebase.auth().currentUser.uid);

    const [modalOpcoesVisivel, setModalOpcoesVisivel] = useState(false);

    const imagensGrupos = [];
    imagensGrupos.push(require("./img/turquesa10.png"));
    imagensGrupos.push(require("./img/LogoGrupos1.png"));
    imagensGrupos.push(require("./img/LogoGrupos2.png"));
    imagensGrupos.push(require("./img/LogoGrupos3.png"));

    function btnTarefas() {
        props.navigation.navigate("ListaTarefas", {
            idGrupo: idGrupo
        });
    }

    function btnMembros() {
        props.navigation.navigate("Membros", {
            idGrupo: idGrupo
        });
    }

    function btnPostIts() {
        props.navigation.navigate("PostIts", {
            idGrupo: idGrupo
        });
    }

    function btnPostagens() {
        props.navigation.navigate("Postagens", {
            idGrupo: idGrupo
        });
    }

    function toggleModalOpcoes() {
        setModalOpcoesVisivel(!modalOpcoesVisivel);
    }

    function deletarGrupo() {
        props.navigation.goBack();
        toggleModalOpcoes();
        firebase.firestore()
            .collection("Grupos")
            .doc(idGrupo)
            .delete();
    }

    function sair() {
        props.navigation.goBack();
        toggleModalOpcoes();
        firebase.firestore()
            .collection("Grupos")
            .doc(idGrupo)
            .get()
            .then(snapshot => {
                let novoMembros = snapshot.data().membros;
                novoMembros = novoMembros.filter((value, index, arr) => { return value.toString() != meuId.toString(); });
                firebase.firestore()
                    .collection("Grupos")
                    .doc(idGrupo)
                    .update({
                        membros: novoMembros
                    });
            });
    }

    function ehAdmin() {
        if (meuId == idAdm) {
            return true
        } else {
            return false
        }
    }

    const botaoDeletar =
        <TouchableOpacity style={[styles.botaoModalOpcoes, { backgroundColor: "#DC4C46" }]} onPress={() => deletarGrupo()}>
            <Text style={styles.textoBotaoModalOpcoes}>Deletar</Text>
        </TouchableOpacity>
    const botaoSair =
        <TouchableOpacity style={[styles.botaoModalOpcoes, { backgroundColor: "#DC4C46" }]} onPress={() => sair()}>
            <Text style={styles.textoBotaoModalOpcoes}>Sair</Text>
        </TouchableOpacity>

    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
    });

    useEffect(() => {
        try {
            const listener = firebase.firestore()
                .collection("Grupos")
                .doc(idGrupo)
                .onSnapshot(snapshot => {
                    setNomeGrupo(snapshot.data().nome);
                    setImagem(snapshot.data().imagem);
                });
            return () => listener();
        }
        catch (e) { }
    }, []);

    useEffect(() => {
        try {
            const listener = firebase.firestore()
                .collection("Grupos")
                .doc(idGrupo)
                .onSnapshot(snapshot => {
                    setIdAdm(snapshot.data().dono);
                });
            return () => listener();
        }
        catch (e) { }
    }, []);

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalOpcoesVisivel}
                    onRequestClose={() => {
                        setModalOpcoesVisivel(false);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => { setModalOpcoesVisivel(false); }}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback>

                    <View style={styles.centeredView}>
                        <View style={styles.modalViewMembro}>
                            <View style={{ width: "100%", marginTop: "4%", marginBottom: "3%" }}>
                                <MembroInclickavel
                                    imagem={imagensGrupos[imagem]}
                                    nome={nomeGrupo}
                                    estiloExtra={{ color: "black" }}
                                />
                            </View>
                            {ehAdmin() ? botaoDeletar : botaoSair}
                        </View>
                    </View>
                </Modal>
                <View style={styles.cabecalho}>
                    <View style={styles.divSetinha}>
                        <TouchableOpacity style={[styles.setinha, { padding: "2%" }]} onPress={() => props.navigation.goBack()}>
                            <Ionicons name="md-arrow-back" size={40} color="#5b5b58" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divEngrenagem}>
                        <TouchableOpacity style={[styles.engrenagem, { padding: "2%" }]} onPress={() => toggleModalOpcoes()}>
                            <Feather name="settings" size={33} color="#5b5b58" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divImagem}>
                        <Image source={imagensGrupos[imagem]} style={styles.imagem} />
                    </View>
                </View>
                <Text style={styles.textoNomeGrupo}>{nomeGrupo}</Text>
                <TouchableNativeFeedback onPress={btnTarefas}>
                    <View style={styles.botao}>
                        <Image source={require('./img/Logos/LogoTarefas.png')} style={styles.imagemIcone} />
                        <Text style={styles.textoBotao}>Tarefas</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={btnMembros}>
                    <View style={styles.botao}>
                        <Image source={require('./img/Logos/LogoTarefas.png')} style={styles.imagemIcone} />
                        <Text style={styles.textoBotao}>Membros</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={btnPostIts}>
                    <View style={styles.botao}>
                        <Image source={require('./img/Logos/post-it.png')} style={styles.imagemIcone} />
                        <Text style={styles.textoBotao}>Post-Its</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={btnPostagens}>
                    <View style={styles.botao}>
                        <Image source={require('./img/Logos/Postagens.png')} style={styles.imagemIcone} />
                        <Text style={styles.textoBotao}>Postagens</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EAE6DA',
        alignItems: 'center',
    },
    cabecalho: {
        flexDirection: "row",
        alignSelf: "stretch",
    },
    divSetinha: {
        width: "100%",
        height: "100%",
        position: "absolute",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    divImagem: {
        width: "100%",
        alignItems: "center",
    },
    imagem: {
        aspectRatio: 1,
        width: '35%',
        height: null,
        marginTop: "9%",
        borderRadius: 1000,
    },
    setinha: {
        marginLeft: '5%',
        marginTop: '9%',
    },
    textoNomeGrupo: {
        fontFamily: "Roboto-Light",
        fontSize: 30,
        marginTop: "5%",
        marginBottom: "10%",
    },
    botao: {
        backgroundColor: "#C4C4C4",
        width: "80%",
        aspectRatio: 5.5,
        borderRadius: 10,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        marginTop: "0%",
        marginBottom: "4.4%",
        paddingLeft: "4%",
    },
    textoBotao: {
        fontFamily: "Roboto-Light",
        fontSize: 28,
        marginLeft: "4%",
    },
    imagemIcone: {
        height: "80%",
        width: null,
        aspectRatio: 1,
    },
    divEngrenagem: {
        width: "100%",
        height: "100%",
        position: "absolute",
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },
    engrenagem: {
        marginRight: '5%',
        marginTop: '10%',
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
    botaoModalOpcoes: {
        marginTop: "2%",
        borderRadius: 40,
        width: "82%",
        height: null,
        aspectRatio: 6.12,
        backgroundColor: "#53A156",
        alignItems: "center",
        justifyContent: "center",
    },
    textoBotaoModalOpcoes: {
        fontFamily: 'Roboto-Regular',
        fontSize: 25,
        color: 'white',
    },
});

export default telaGrupo;