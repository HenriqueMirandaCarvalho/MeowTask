import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableNativeFeedback,
    TouchableOpacity,
    StatusBar,
    Alert,
    Modal,
    ActivityIndicator
} from "react-native";
import Dialog from 'react-native-dialog';
import { FontAwesome } from "@expo/vector-icons";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import * as firebase from 'firebase';

const telaLogin = (props) => {
    const [loading, setLoading] = useState(false);

    function esqueciMinhaSenha(email) {
        setLoading(true);
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                setEsqueci(false);
                setLoading(false);
                Alert.alert("Aviso", "Redefinição de senha enviada para seu email!");
            })
            .catch(error => {
                setLoading(false);
                switch (error.code) {
                    case "auth/invalid-email":
                        Alert.alert("Erro", "Email inválido!");
                        break;
                    case "auth/user-not-found":
                        Alert.alert("Erro", "Usuário não encontrado!");
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
    function btnEntrar() {
        setLoading(true);
        firebase.auth().signInWithEmailAndPassword(inputEmail, inputSenha)
            .then(() => {
                if (firebase.auth().currentUser.emailVerified) {
                    setLoading(false);
                    props.navigation.navigate("Home");
                }
                else {
                    setLoading(false);
                    firebase.auth().signOut();
                    Alert.alert("Aviso", "Seu email não está verificado!");
                }
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
    function btnCriarConta() {
        props.navigation.navigate("Cadastro");
    }

    function togglePassword() {
        if (senhaOculta) {
            setIconeSenha("eye-slash");
        } else {
            setIconeSenha("eye");
        }
        var passwordDummy = !senhaOculta;
        setSenhaOculta(passwordDummy);
    }

    const [inputEmail, setInputEmail] = useState("");
    const [inputSenha, setInputSenha] = useState("");
    const [iconeSenha, setIconeSenha] = useState("eye");
    const [senhaOculta, setSenhaOculta] = useState(true);
    const [esqueci, setEsqueci] = useState(false);
    const [emailEsqueci, setEmailEsqueci] = useState("");

    let [fontsLoaded] = useFonts({
        "Roboto-Light": require("./font/Roboto-Light.ttf"),
        "Merienda-Regular": require("./font/Merienda-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <Dialog.Container visible={esqueci}>
                    <Dialog.Title>Recuperar Senha</Dialog.Title>
                    <Dialog.Input label="Insira seu E-mail" wrapperStyle={styles.input} onChangeText={(email) => setEmailEsqueci(email)}></Dialog.Input>
                    <Dialog.Button label="Enviar" onPress={() => esqueciMinhaSenha(emailEsqueci)}></Dialog.Button>
                </Dialog.Container>
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
                <Text style={styles.titulo}>Login</Text>

                <View style={styles.div}>
                    <TextInput
                        style={styles.input}
                        placeholder={"E-mail"}
                        textContentType="emailAddress"
                        onChangeText={(inputEmail) => setInputEmail(inputEmail.trim())}
                    />
                </View>

                <View style={styles.div}>
                    <TextInput
                        style={styles.input}
                        placeholder={"Senha"}
                        textContentType="password"
                        secureTextEntry={senhaOculta}
                        onChangeText={(inputSenha) => setInputSenha(inputSenha.trim())}
                    />
                    <View style={styles.olhinho}>
                        <TouchableOpacity onPress={togglePassword}>
                            <FontAwesome name={iconeSenha} size={24} color="#5B5B58" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => setEsqueci(true)} style={styles.botaoEsqueci}>
                        <View>
                            <Text style={styles.textoEsqueci}>Esqueci minha senha</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.div}>
                    <TouchableNativeFeedback onPress={btnEntrar}>
                        <View style={styles.botao}>
                            <Text style={styles.textoEntrar}>Entrar</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableOpacity onPress={btnCriarConta}>
                        <View>
                            <Text style={styles.textoCriarConta}>Criar conta</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <StatusBar translucent backgroundColor={'#eae6da'} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#EAE6DA",
        justifyContent: "space-evenly",
        alignItems: "center",
        // marginTop: StatusBar.currentHeight || 0,
    },
    div: {
        alignSelf: "stretch",
        alignItems: "center",
    },
    titulo: {
        fontFamily: "Merienda-Regular",
        fontSize: 65,
        color: "#5b5b58",
    },
    botao: {
        width: "70%",
        marginBottom: "5%",
        aspectRatio: 5,
        borderRadius: 6,
        backgroundColor: "#5b5b58",
        justifyContent: "center",
        alignItems: "center",
    },
    textoLabel: {
        marginLeft: "15%",
        alignSelf: "flex-start",
        fontFamily: "Roboto-Light",
        fontSize: 18,
        color: "#5b5b58",
    },
    input: {
        marginTop: "3%",
        width: "70%",
        borderBottomWidth: 1,
        borderColor: "#5b5b58",
        fontSize: 18,
    },
    textoEsqueci: {
        fontFamily: "Roboto-Light",
        fontSize: 15,
        color: "#5b5b58",
    },
    botaoEsqueci: {
        alignSelf: "flex-end",
        marginRight: "15%",
        marginTop: "5%",
        opacity: 0.8,
    },
    textoEntrar: {
        fontFamily: "Roboto-Light",
        fontSize: 30,
        color: "#eae6da",
    },
    textoCriarConta: {
        fontFamily: "Roboto-Light",
        fontSize: 24,
        color: "#5b5b58",
    },
    olhinho: {
        marginLeft: "68%",
        marginTop: "1%",
        width: "10%",
        height: "60%",
        position: "absolute",
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
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

export default telaLogin;
