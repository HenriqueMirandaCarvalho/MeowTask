import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar, Image, Dimensions, Modal, TouchableWithoutFeedback, TextInput, SafeAreaView, Switch } from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { Avatar } from './avatar';
import * as firebase from 'firebase';
import { NavigationActions, StackActions } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const largura = Dimensions.get('window').width;
const altura = Dimensions.get('window').height;

const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('notificacoes');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
    }
}

const setData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('notificacoes', jsonValue);
    } catch (e) {
    }
}

const telaNotificacoes = (props) => {
    const [modalContaVisivel, setModalContaVisivel] = useState(false);
    const [modalContaEstaNaSegundaPagina, setModalContaEstaNaSegundaPagina] = useState(false);

    const [modalNotificacaoVisivel, setModalNotificacaoVisivel] = useState(false);
    const [notificacoesTodas, setNotificacoesTodas] = useState(true);
    const [notificacoesAmigos, setNotificacoesAmigos] = useState(true);
    const [notificacoesPostagens, setNotificacoesPostagens] = useState(true);
    const [notificacoesTarefas, setNotificacoesTarefas] = useState(true);

    const [username, setUsername] = useState(firebase.auth().currentUser.displayName);
    const [avatar, setAvatar] = useState(firebase.auth().currentUser.photoURL);
    const [email, setEmail] = useState(firebase.auth().currentUser.email);
    const [senha, setSenha] = useState("");

    const avatares = [require('./img/gato1.png'), require('./img/gato2.png'), require('./img/gato3.png')];

    function toggleModalConta() {
        if (!modalContaVisivel) {
            setModalContaVisivel(true);
            setModalContaEstaNaSegundaPagina(false);
        }
        else {
            setModalContaVisivel(false);
            setModalContaEstaNaSegundaPagina(false);
            firebase.auth().currentUser.updateProfile({
                displayName: username,
                photoURL: avatar
            });
            firebase.firestore()
                .collection("Codigos")
                .doc(firebase.auth().currentUser.uid)
                .update({
                    nome: username,
                    imagem: avatar
                });
        }
    }

    async function toggleModalNotificacao() {
        setModalNotificacaoVisivel(!modalNotificacaoVisivel);
    }

    function switchNotificacoesTodas() {
        if (notificacoesTodas == false) {
            setNotificacoesTodas(true);
        } else {
            setNotificacoesTodas(false);
        }
    }
    function switchNotificacoesTarefas() {
        if (notificacoesTodas == false) {
            setNotificacoesTodas(true);
            setNotificacoesTarefas(true);
        } else {
            setNotificacoesTarefas(!notificacoesTarefas);
        }
    }
    function switchNotificacoesPostagens() {
        if (notificacoesTodas == false) {
            setNotificacoesTodas(true);
            setNotificacoesPostagens(true);
        } else {
            setNotificacoesPostagens(!notificacoesPostagens);
        }
    }
    function switchNotificacoesAmigos() {
        if (notificacoesTodas == false) {
            setNotificacoesTodas(true);
            setNotificacoesAmigos(true);
        } else {
            setNotificacoesAmigos(!notificacoesAmigos);
        }
    }

    function selecionarAvatar(_index) {
        if (_index == (avatar-1)) {
            return true;
        } else {
            return false;
        }
    }

    function salvarEmail() {
        firebase.auth()
            .signInWithEmailAndPassword(firebase.auth().currentUser.email, senha)
            .then(function (userData) {
                userData.user.updateEmail(email);
                setModalContaVisivel(false);
            })
            .catch(error => {
                setLoading(false);
                switch (error.code) {
                    case "auth/invalid-email":
                        Alert.alert("Erro", "Email inválido!");
                        break;
                    case "auth/user-disabled":
                        Alert.alert("Erro", "Usuário desabilitado!");
                        break;
                    case "auth/user-not-found":
                        Alert.alert("Erro", "Usuário não encontrado!");
                        break;
                    case "auth/wrong-password":
                        Alert.alert("Erro", "Senha incorreta!");
                        break;
                    case "auth/too-many-requests":
                        Alert.alert("Erro", "Muitas tentativas!");
                        break;
                    default:
                        Alert.alert("Erro", "Erro desconhecido! (código do erro: " + error.code + ")");
                        break;
                }
            });
    }

    async function salvarNotificacao() {
        setModalNotificacaoVisivel(false);
        setData({ "amigos": notificacoesAmigos, "postagens": notificacoesPostagens, "tarefas": notificacoesTarefas, "exibir": notificacoesTodas });
    }

    function sair() {
        firebase.auth().signOut().then(() => {
            props.navigation.navigate('Inicio');
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Inicio' })],
                key: null,
            });
            props.navigation.dispatch(resetAction);
        });
    }

    function estaDesativado(_value, ) { // troca a cor dos switches dependendo do estado

    }
    
    useEffect(() => {
        getData().then((obj) => {
            if (obj != null) {
                setNotificacoesAmigos(obj.amigos);
                setNotificacoesPostagens(obj.postagens);
                setNotificacoesTarefas(obj.tarefas);
                setNotificacoesTodas(obj.exibir);
            }
        });
    }, []);

    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
        'Roboto-Regular': require('./font/Roboto-Regular.ttf'),
        'Merienda-Regular': require('./font/Merienda-Regular.ttf'),
    });

    const modalContaPagina1 =
        <View>
            <View style={styles.modalView}>
                <Text style={styles.textoTituloModal}>Conta</Text>
                <TextInput
                    style={styles.input}
                    textContentType="username"
                    textAlign="center"
                    defaultValue={username}
                    onChangeText={(username) => setUsername(username.trim().replace(/(\r\n|\n|\r)/gm, " "))}
                    maxLength={30}
                    autoCorrect={false}
                    returnKeyType="done"
                />
                <SafeAreaView style={{ width: "80%", marginTop: "5%", aspectRatio: 3 }}>
                    <FlatList
                        data={avatares}
                        keyExtractor={(index) => index.toString()}
                        horizontal={true}
                        renderItem={({ item, index }) =>
                            <Avatar
                                onPressIn={() => setAvatar(index+1)}
                                imagem={item}
                                selecionada={selecionarAvatar(index)}
                            />
                        }
                        style={{ backgroundColor: "#69665E" }}
                    />
                </SafeAreaView>
                <TouchableOpacity style={styles.botaoTrocarEmail} onPress={() => setModalContaEstaNaSegundaPagina(true)}>
                    <Text style={styles.textoModalConta}>Trocar E-mail</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoDeslogar} onPress={() => sair()}>
                    <Text style={[styles.textoModalConta, { color: "white" }]}>Deslogar</Text>
                </TouchableOpacity>
            </View>
        </View>
    const modalContaPagina2 =
        <View>
            <View style={styles.modalView2}>
                <Text style={styles.textoTituloModal}>Trocar E-mail</Text>
                <TextInput
                    style={styles.input}
                    textContentType="emailAddress"
                    textAlign="center"
                    defaultValue={email}
                    onChangeText={(email) => setEmail(email.trim())}
                    maxLength={30}
                    autoCorrect={false}
                    returnKeyType="next"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    textContentType="password"
                    textAlign="center"
                    placeholder="senha atual"
                    onChangeText={(senha) => setSenha(senha.trim())}
                    returnKeyType="done"
                    maxLength={24}
                    secureTextEntry={true}
                />
                <View style={styles.divBotaoSalvar}>
                    <TouchableOpacity style={styles.botaoSalvar} onPress={() => salvarEmail()}>
                        <Text style={styles.textoBotaoSalvar}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalContaVisivel}
                    onRequestClose={() => {
                        toggleModalConta();
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => toggleModalConta()}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback>

                    <View style={styles.centeredView}>
                        {modalContaEstaNaSegundaPagina ? modalContaPagina2 : modalContaPagina1}
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalNotificacaoVisivel}
                    onRequestClose={() => {
                        salvarNotificacao()
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => salvarNotificacao()}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback>

                    <View style={styles.centeredView}>
                        <View style={styles.modalView3}>
                            <Text style={styles.textoTituloModalNotificacoes}>Notificações</Text>
                            <View style={styles.opcaoNotificacao}>
                                <Text style={styles.textoModalNotificacoes}>Exibir Notificações:</Text>
                                <Switch
                                    trackColor={{ false: "#adadad", true: "#4cca61" }}
                                    thumbColor={"#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => switchNotificacoesTodas()}
                                    value={notificacoesTodas}
                                />
                            </View>
                            <View style={styles.opcaoNotificacao}>
                                <Text style={[styles.textoModalNotificacoes, {color: notificacoesTodas?"black":"rgba(0, 0, 0, 0.2)"}]}>Novas tarefas:</Text>
                                <Switch
                                    trackColor={{ false: notificacoesTodas?"#adadad":"rgba(173, 173, 173, 0.4)", true: notificacoesTodas?"#4cca61":"rgba(76, 202, 97, 0.4)" }}
                                    thumbColor={notificacoesTodas?"#f4f3f4":"rgba(244, 243, 244, 0.4)"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => switchNotificacoesTarefas()}
                                    value={notificacoesTarefas}
                                    disabled={!notificacoesTodas}
                                />
                            </View>
                            <View style={styles.opcaoNotificacao}>
                                <Text style={[styles.textoModalNotificacoes, {color: notificacoesTodas?"black":"rgba(0, 0, 0, 0.2)"}]}>Postagens:</Text>
                                <Switch
                                    trackColor={{ false: notificacoesTodas?"#adadad":"rgba(173, 173, 173, 0.4)", true: notificacoesTodas?"#4cca61":"rgba(76, 202, 97, 0.4)" }}
                                    thumbColor={notificacoesTodas?"#f4f3f4":"rgba(244, 243, 244, 0.4)"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => switchNotificacoesPostagens()}
                                    value={notificacoesPostagens}
                                    disabled={!notificacoesTodas}
                                />
                            </View>
                            <View style={styles.opcaoNotificacao}>
                                <Text style={[styles.textoModalNotificacoes, {color: notificacoesTodas?"black":"rgba(0, 0, 0, 0.2)"}]}>Pedidos de amizade:</Text>
                                <Switch
                                    trackColor={{ false: notificacoesTodas?"#adadad":"rgba(173, 173, 173, 0.4)", true: notificacoesTodas?"#4cca61":"rgba(76, 202, 97, 0.4)" }}
                                    thumbColor={notificacoesTodas?"#f4f3f4":"rgba(244, 243, 244, 0.4)"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => switchNotificacoesAmigos()}
                                    value={notificacoesAmigos}
                                    disabled={!notificacoesTodas}
                                />
                            </View>
                            <View style={styles.divBotaoSalvarNotificacao}>
                                <TouchableOpacity style={styles.botaoSalvar} onPress={() => salvarNotificacao()}>
                                    <Text style={styles.textoBotaoSalvar}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={styles.cabecalho}>
                    <View style={styles.divSetinha}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()}>
                            <Ionicons name="md-arrow-back" size={44} color="#5b5b58" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titulo}>Configurações</Text>
                </View>
                <View style={styles.conteudoConfig1}>
                    <View style={styles.botoesConfig}>
                        <TouchableOpacity onPress={() => toggleModalConta()}>
                            <Image source={require('./img/Logos/LogoConta.png')} style={styles.icones} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleModalConta()} style={styles.divTextoBotoesConfig}>
                            <Text style={styles.textoBotoesConfig}>Conta</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.conteudoConfig1}>
                    <View style={styles.botoesConfig}>
                        <TouchableOpacity onPress={() => toggleModalNotificacao()}>
                            <Image source={require('./img/Logos/Notificacoes.png')} style={styles.icones} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleModalNotificacao()} style={styles.divTextoBotoesConfig}>
                            <Text style={styles.textoBotoesConfig}>Notificações</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.conteudoConfig2}>
                    <View style={styles.botoesConfig}>
                        <TouchableOpacity onPress={() => props.navigation.navigate("Termos")}>
                            <Image source={require('./img/Logos/LogoPrivacidadeeTermos.png')} style={styles.icones} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate("Termos")} style={styles.divTextoBotoesConfig}>
                            <Text style={styles.textoBotoesConfig}>Privacidade e Termos</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.botoesConfig}>
                        <TouchableOpacity onPress={() => props.navigation.navigate("Sobre")}>
                            <Image source={require('./img/Logos/About.png')} style={styles.icones} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate("Sobre")} style={styles.divTextoBotoesConfig}>
                            <Text style={styles.textoBotoesConfig}>Sobre o Meow Task</Text>
                        </TouchableOpacity>
                    </View>
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
    botoesConfig: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingLeft: "5%",
    },
    divTextoBotoesConfig: {
        marginLeft: "2.6%",
        width: "100%",
        height: 0.08 * altura,
        justifyContent: "center",
    },
    textoBotoesConfig: {
        fontFamily: 'Roboto-Light',
        fontSize: 20,
        color: '#5b5b58',
    },
    icones: {
        height: null,
        width: 0.14 * largura,
        aspectRatio: 1,
    },
    conteudoConfig1: {
        height: "12%",
        justifyContent: "space-evenly",
        borderBottomWidth: 1,
        borderBottomColor: "#5b5b58",
    },
    conteudoConfig2: {
        height: "20.5%",
        justifyContent: "space-evenly",
        borderBottomWidth: 1,
        borderBottomColor: "#5b5b58",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        position: "absolute",
        top: 0, // não faço ideia de como o top, right, bottom e left funcionam
        right: 0, // mas eles fazem o view com absolute ocupar toda a tela
        bottom: 0,
        left: 0,
    },
    modalView: {
        width: 0.80 * largura,
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
    input: {
        marginTop: '5%',
        width: '80%',
        borderBottomWidth: 1,
        borderColor: '#5b5b58',
        fontSize: 18,
    },
    textoModalConta: {
        fontFamily: 'Roboto-Light',
        fontSize: 20,
        color: "white",
    },
    botaoTrocarEmail: {
        width: "80%",
        height: 0.10 * largura,
        // backgroundColor: "#A4A4A4",
        backgroundColor: "#838487",
        marginTop: "5%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
    },
    botaoDeslogar: {
        width: "80%",
        height: 0.10 * largura,
        backgroundColor: "#DC4C46",
        marginTop: "5%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
    },
    modalView2: {
        width: 0.80 * largura,
        height: 0.5 * largura,
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
    modalView3: {
        width: 0.80 * largura,
        height: 0.65 * largura,
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
    divBotaoSalvar: {
        position: "absolute",
        width: 0.8 * largura,
        height: 0.5 * largura,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    divBotaoSalvarNotificacao: {
        position: "absolute",
        width: 0.80 * largura,
        height: 0.65 * largura,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    botaoSalvar: {
        width: "80%",
        height: 0.1 * largura,
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
    opcaoNotificacao: {
        flexDirection: "row",
        marginTop: "2%",
        width: "75%",
        justifyContent: "space-between",
        alignContent: "center",
        // backgroundColor: "red",
    },
    textoModalNotificacoes: {
        fontFamily: 'Roboto-Light',
        fontSize: 18,
        paddingBottom: 3,
    },
    textoTituloModalNotificacoes: {
        marginTop: "2%",
        marginBottom: "4%",
        fontFamily: 'Roboto-Light',
        fontSize: 23,
    },
});

export default telaNotificacoes;