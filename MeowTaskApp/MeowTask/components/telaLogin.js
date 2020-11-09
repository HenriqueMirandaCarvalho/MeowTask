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
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import Usuario from './classes/Usuario.js';
import Conexao from './classes/Conexao.js'

const telaLogin = (props) => {
    function btnEsqueci() {
        try {
            let user = new Usuario();
            user.setEmail(inputEmail);
            let conn = new Conexao();
            conn.esqueciUsuario(user).then((obj) => {
                Alert.alert("Aviso", "Confira seu email!");
            });
        } catch (err) {
            Alert.alert("Erro", err.toString());
        }
    }
    function btnEntrar() {
        try {
            let user = new Usuario();
            user.setEmail(inputEmail);
            user.setSenha(inputSenha);
            let conn = new Conexao();
            conn.entrarUsuario(user).then((obj) => {
                props.navigation.navigate("ListaGrupos");
            });
        } catch (err) {
            Alert.alert("Erro", err.toString());
        }
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

    let [fontsLoaded] = useFonts({
        "Roboto-Light": require("./font/Roboto-Light.ttf"),
        "Merienda-Regular": require("./font/Merienda-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
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
                    <TouchableOpacity onPress={btnEsqueci} style={styles.botaoEsqueci}>
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
                <StatusBar translucent backgroundColor={"#649DF1"} />
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
});

export default telaLogin;
