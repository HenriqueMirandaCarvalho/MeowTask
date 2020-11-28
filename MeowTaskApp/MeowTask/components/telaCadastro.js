import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableNativeFeedback, StatusBar, TouchableOpacity, Alert, Modal, ActivityIndicator } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import * as firebase from 'firebase';

const telaCadastro = (props) => {
    const [loading, setLoading] = useState(false);

    function btnCadastrar() {
        setLoading(true);
        if (username.length >= 5 && username.length <= 30) {
            if (senha == confirmarSenha) {
                firebase.auth().createUserWithEmailAndPassword(email, senha)
                    .then(userData => {
                        userData.user.updateProfile({
                            displayName: username,
                            photoURL: "1"
                        });
                        userData.user.sendEmailVerification();
                        let novoCodigo = "0ehzno";
                        firebase.firestore()
                            .collection("Codigos")
                            .where("codigo", "==", novoCodigo)
                            .get().then(snapshot => {
                                if (snapshot.empty) {
                                    firebase.firestore()
                                        .collection("Codigos")
                                        .doc(userData.user.uid)
                                        .set({
                                            nome: username,
                                            imagem: 1,
                                            codigo: novoCodigo
                                        });
                                }
                                else {
                                    novoCodigo = Math.random().toString(36).slice(-6);
                                    firebase.firestore()
                                        .collection("Codigos")
                                        .where("codigo", "==", novoCodigo)
                                        .get().then(snap => {
                                            if (snap.empty) {
                                                firebase.firestore()
                                                    .collection("Codigos")
                                                    .doc(userData.user.uid)
                                                    .set({
                                                        nome: username,
                                                        imagem: 1,
                                                        codigo: novoCodigo
                                                    });
                                            }
                                            else {
                                                novoCodigo = Math.random().toString(36).slice(-6);
                                                firebase.firestore()
                                                    .collection("Codigos")
                                                    .doc(userData.user.uid)
                                                    .set({
                                                        nome: username,
                                                        imagem: 1,
                                                        codigo: novoCodigo
                                                    });
                                            }
                                        });
                                }
                            });
                        Alert.alert("Aviso", "Confirme seu email!");
                        props.navigation.goBack();
                        setLoading(false);
                    })
                    .catch(error => {
                        setLoading(false);
                        switch (error.code) {
                            case "auth/email-already-in-use":
                                Alert.alert("Erro", "Email já está em uso!");
                                break;
                            case "auth/invalid-email":
                                Alert.alert("Erro", "Email inválido!");
                                break;
                            case "auth/operation-not-allowed":
                                Alert.alert("Erro", "Operação não permitida!");
                                break;
                            case "auth/weak-password":
                                Alert.alert("Erro", "Senha fraca!");
                                break;
                            default:
                                Alert.alert("Erro", "Erro desconhecido! (código do erro: " + error.code + ")");
                                break;
                        }
                    });
            }
            else {
                Alert.alert("Erro", "Confirmar senha está diferente de senha!");
                setLoading(false);
            }
        }
        else {
            Alert.alert("Erro", "Nome de usuário deve ter entre 5 e 16 caracteres");
            setLoading(false);
        }
    }

    function togglePassword() {
        if (senhaOculta) {
            setIconeSenha('eye-slash');
        }
        else {
            setIconeSenha('eye');
        }
        var passwordDummy = !senhaOculta;
        setSenhaOculta(passwordDummy);
    }

    function togglePassword2() {
        if (senhaOculta2) {
            setIconeSenha2('eye-slash');

        }
        else {
            setIconeSenha2('eye');
        }
        var passwordDummy = !senhaOculta2;
        setSenhaOculta2(passwordDummy);
    }

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [iconeSenha, setIconeSenha] = useState('eye');
    const [iconeSenha2, setIconeSenha2] = useState('eye');
    const [senhaOculta, setSenhaOculta] = useState(true);
    const [senhaOculta2, setSenhaOculta2] = useState(true);

    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
        'Merienda-Regular': require('./font/Merienda-Regular.ttf'),
    });

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
                            <ActivityIndicator size={70} color="#53A156" />
                        </View>
                    </View>
                </Modal>
                <Text style={styles.titulo}> Cadastro</Text>

                <View style={styles.div}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Nome de usuário'}
                        textContentType="username"
                        onChangeText={(username) => setUsername(username.trim())} />
                </View>

                <View style={styles.div}>
                    <TextInput
                        style={styles.input}
                        placeholder={'E-mail'}
                        textContentType="emailAddress"
                        onChangeText={(email) => setEmail(email.trim())} />
                </View>

                <View style={styles.div}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Senha'}
                        textContentType="password"
                        secureTextEntry={senhaOculta}
                        onChangeText={(senha) => setSenha(senha.trim())} />
                    <View style={styles.olhinho}>
                        <TouchableOpacity onPress={togglePassword}>
                            <FontAwesome name={iconeSenha} size={24} color="#5B5B58" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.div}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Confirmar senha'}
                        textContentType="password"
                        secureTextEntry={senhaOculta2}
                        onChangeText={(confirmarSenha) => setConfirmarSenha(confirmarSenha.trim())} />
                    <View style={styles.olhinho}>
                        <TouchableOpacity onPress={togglePassword2}>
                            <FontAwesome name={iconeSenha2} size={24} color="#5B5B58" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.div}>
                    <TouchableNativeFeedback onPress={btnCadastrar}>
                        <View style={styles.botao}>
                            <Text style={styles.textoEntrar}>Criar Conta</Text>
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
        flexDirection: 'column',
        backgroundColor: '#EAE6DA',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight || 0,
    },
    div: {
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    titulo: {
        fontFamily: 'Merienda-Regular',
        fontSize: 48,
        color: '#5b5b58',
    },
    botao: {
        width: '70%',
        marginTop: '5%',
        aspectRatio: 5,
        borderRadius: 6,
        backgroundColor: '#5b5b58',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoLabel: {
        marginLeft: '15%',
        alignSelf: 'flex-start',
        fontFamily: 'Roboto-Light',
        fontSize: 18,
        color: '#5b5b58',
    },
    input: {
        marginTop: '3%',
        width: '70%',
        borderBottomWidth: 1,
        borderColor: '#5b5b58',
        fontSize: 18,
    },
    textoEntrar: {
        fontFamily: 'Roboto-Light',
        fontSize: 30,
        color: '#eae6da',
    },
    textoCriarConta: {
        fontFamily: 'Roboto-Light',
        fontSize: 30,
        color: '#5b5b58',
    },
    olhinho: {
        marginLeft: '70%',
        marginTop: '4%',
        width: '10%',
        height: '60%',
        position: 'absolute',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
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

export default telaCadastro;