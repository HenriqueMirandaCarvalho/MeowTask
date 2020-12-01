import React from 'react';
import {View, StyleSheet, Image, Text, TouchableWithoutFeedback, TouchableOpacity} from "react-native";

export const Notificacao = (props) => {
    const tarefa =
        <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.conteudo}>
                <View style={styles.divImagem}>
                    <Image source={require('./img/Logos/LogoTarefas.png')} style={styles.imagem}/>
                </View>
                <View style={styles.divTexto}>
                    <Text style={styles.texto}>Nova tarefa "{props.nome}" foi criada no grupo {props.nomeGrupo}!</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    const amizade =
        <View style={styles.conteudo}>
            <View style={styles.divImagem}>
                <Image source={require('./img/LogoGrupo.png')} style={styles.imagem}/>
            </View>
            <View style={styles.divTexto}>
                <Text style={styles.texto}>{props.nome} solicitou uma amizade!</Text>
                <View style={styles.divBotoes}>
                    <TouchableOpacity style={styles.botaoAceitar}>
                        <Text style={styles.textoBotaoSalvar}>Aceitar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoAceitar}>
                        <Text style={styles.textoBotaoSalvar}>Aceitar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    const postagem =
        <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.conteudo}>
                <View style={styles.divImagem}>
                    <Image source={require('./img/Logos/Postagens.png')} style={styles.imagem}/>
                </View>
                <View style={styles.divTexto}>
                    <Text style={styles.postador}>{props.enviador} postou uma mensagem no grupo {props.grupo}!</Text>
                    <Text style={styles.texto}>{props.mensagem}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    if (props.tipo == "tarefa") {
        return tarefa;
    } else if (props.tipo == "amizade") {
        return amizade;
    } else {
        return postagem;
    }
}

let styles = StyleSheet.create({
    conteudo: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
    },
    imagem: {
        width: "100%",
        height: null,
        aspectRatio: 1,
    },
    postador: {
        width: "85%",
        marginBottom: "1%",
        fontFamily: "Roboto-Light",
        fontSize: 18,
        textAlign: "justify",
        marginLeft: "3%",
    },
    texto: {
        width: "85%",
        marginBottom: "1%",
        fontFamily: "Roboto-Light",
        fontSize: 18,
        textAlign: "justify",
        marginLeft: "3%",
    },
    divImagem: {
        width: "20%"
    },
    divTexto: {
        width: "80%",
        justifyContent: "center",
    },
    divBotoes: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
    },
    botaoAceitar: {
        width: "40%",
        aspectRatio: 3.2,
        backgroundColor: "#53A156",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    textoBotaoAceitar: {
        fontFamily: 'Roboto-Light',
        fontSize: 20,
    },
});