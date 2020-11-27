import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar, Image, Dimensions, Modal, TouchableWithoutFeedback, TextInput, SafeAreaView } from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { Avatar } from './avatar';

const largura = Dimensions.get('window').width;
const altura = Dimensions.get('window').height;

const telaNotificacoes = (props) => {

    const [modalContaVisivel, setModalContaVisivel] = useState(false);
    const [modalContaEstaNaSegundaPagina, setModalContaEstaNaSegundaPagina] = useState(false);

    const [modalNotificacaoVisivel, setModalNotificacaoVisivel] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const [avatares, setAvatares] = useState([
        {
            id: "0",
            imagem: require('./img/gato1.png'),
            selecionada: false,
        },
        {
            id: "1",
            imagem: require('./img/gato2.png'),
            selecionada: false,
        },
        {
            id: "2",
            imagem: require('./img/gato3.png'),
            selecionada: false,
        },
    ]);

    function toggleModalConta() {
        setModalContaVisivel(!modalContaVisivel);
        setModalContaEstaNaSegundaPagina(false);
    }

    function toggleModalNotificacao() {
        setModalNotificacaoVisivel(!modalNotificacaoVisivel);
    }

    function selecionarAvatar(_id) {
        const NewData = avatares.map( item => {
            if(item.id === _id){
                item.selecionada = true;
                return item;
            }else{
                item.selecionada = false;
                return item;
            }
        })
        setAvatares(NewData);
    }

    function salvarEmail() {
        setModalContaVisivel(false);
    }

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
                    onChangeText={(username) => setUsername(username.trim())}
                    maxLength={30}
                    autoCorrect={false}
                    returnKeyType="done"
                />
                <SafeAreaView style={{ width: "80%", marginTop: "5%", aspectRatio: 3}}>
                    <FlatList
                        data={avatares}
                        keyExtractor={item=>item.id}
                        horizontal={true}
                        renderItem={({item})=>
                            <Avatar 
                                onPressIn={() => selecionarAvatar(item.id)}
                                imagem={item.imagem}
                                selecionada={item.selecionada}
                            />
                        }
                        style={{ backgroundColor: "#A4A4A4"}}
                    />
                </SafeAreaView>
                <TouchableOpacity style={styles.botaoTrocarEmail} onPress={() => setModalContaEstaNaSegundaPagina(true)}>
                    <Text style={styles.textoModalConta}>Trocar E-mail</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoDeslogar}>
                    <Text style={styles.textoModalConta}>Deslogar</Text>
                </TouchableOpacity>
            </View>
        </View>
    const modalContaPagina2 =
        <View>
            <View style={styles.modalView2}>
                <Text style={styles.textoTituloModal}>Trocar E-mail</Text>
                <TextInput
                    style={styles.input}
                    textContentType="username"
                    textAlign="center"
                    defaultValue={email}
                    onChangeText={(email) => setEmail(email.trim())}
                    maxLength={30}
                    autoCorrect={false}
                    returnKeyType="done"
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
                        toggleModalNotificacao();
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => toggleModalNotificacao()}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback>

                    <View style={styles.centeredView}>
                        <View style={styles.modalView2}>
                            <Text style={styles.textoTituloModal}>Trocar E-mail</Text>
                            <TextInput
                                style={styles.input}
                                textContentType="username"
                                textAlign="center"
                                defaultValue={email}
                                onChangeText={(email) => setEmail(email.trim())}
                                maxLength={30}
                                autoCorrect={false}
                                returnKeyType="done"
                            />
                            <View style={styles.divBotaoSalvar}>
                                <TouchableOpacity style={styles.botaoSalvar} onPress={() => salvarEmail()}>
                                    <Text style={styles.textoBotaoSalvar}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={styles.cabecalho}>
                    <View style={styles.divSetinha}>
                        <TouchableOpacity onPress={() => toggleModalConfig()}>
                            <Ionicons name="md-arrow-back" size={44} color="#5b5b58"/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titulo}>Configurações</Text>
                </View>
                <View style={styles.conteudoConfig1}>
                    <View style={styles.botoesConfig}>
                        <TouchableOpacity onPress={() => toggleModalConta()}>
                            <Image source={require('./img/turquesa10.png')} style={styles.icones} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleModalConta()} style={styles.divTextoBotoesConfig}>
                            <Text style={styles.textoBotoesConfig}>Conta</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.conteudoConfig1}>
                    <View style={styles.botoesConfig}>
                        <TouchableOpacity onPress={() => toggleModalNotificacao()}>
                            <Image source={require('./img/turquesa10.png')} style={styles.icones} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleModalNotificacao()} style={styles.divTextoBotoesConfig}>
                            <Text style={styles.textoBotoesConfig}>Notificações</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.conteudoConfig2}>
                    <View style={styles.botoesConfig}>
                        <TouchableOpacity onPress={() => btnVisual()}>
                            <Image source={require('./img/turquesa10.png')} style={styles.icones} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => btnVisual()} style={styles.divTextoBotoesConfig}>
                            <Text style={styles.textoBotoesConfig}>Privacidade e Termos</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.botoesConfig}>
                        <TouchableOpacity onPress={() => btnVisual()}>
                            <Image source={require('./img/turquesa10.png')} style={styles.icones} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => btnVisual()} style={styles.divTextoBotoesConfig}>
                            <Text style={styles.textoBotoesConfig}>Sobre o Meow Task</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <StatusBar translucent backgroundColor={'#eae6da'}/>
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
    },
    textoBotoesConfig: {
        fontFamily: 'Roboto-Light',
        fontSize: 20,
        color: '#5b5b58',
    },
    icones: {
        height: null,
        width: 0.13*largura,
        aspectRatio: 1,
        borderRadius: 100,
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
        width: 0.80*largura,
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
        marginTop: '3%',
        width: '80%',
        borderBottomWidth: 1,
        borderColor: '#5b5b58',
        fontSize: 18,
    },
    textoModalConta: {
        fontFamily: 'Roboto-Light',
        fontSize: 20,
    },
    botaoTrocarEmail: {
        width: "80%",
        height: 0.10*largura,
        backgroundColor: "#A4A4A4",
        marginTop: "5%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    botaoDeslogar: {
        width: "80%",
        height: 0.10*largura,
        backgroundColor: "#A4A4A4",
        marginTop: "5%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    modalView2: {
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
    }
});

export default telaNotificacoes;