import React, { useState, version } from "react";
import {View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, StatusBar , FlatList, Modal, TouchableWithoutFeedback, TextInput, ActivityIndicator, Alert, Clipboard } from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons'; 
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import {Amigo} from './amigo.js';
import {AmigoModal} from './amigosmodal';
import Conexao from './classes/Conexao.js';

const telaAmigo = (props) => {   
    const [modalVisivel, setModalVisivel] = useState(false);
    const [meuCodigo, setMeuCodigo] = useState("")
    const [inputCodigo, setInputCodigo] = useState();
    const [loading, setLoading] = useState(true);
    const [amigos, setAmigos] = useState([]);
    const imagensUsuario = [];
    imagensUsuario.push(require("./img/turquesa10.png"));
    imagensUsuario.push(require("./img/gato1.png"));
    imagensUsuario.push(require("./img/gato2.png"));
    imagensUsuario.push(require("./img/gato3.png"));

    function validaNumero(numero) {
        // code to remove non-numeric characters from text
        setInputCodigo(numero.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''));
        // (validação roubada do stack overflow)
    }

    function trocarTela(id) {
        alert("insira uma troca de tela aqui, id do amigo: " + id);
    }

    function toggleModal() {
        setModalVisivel(!modalVisivel);
    }

    function adicionarAmigo() {
        alert(inputCodigo);
    }

    const [loadedAmigos, setLoadAmigos] = useState(false);

    function carregarAmigos() {
        let conn = new Conexao();
        conn.getAmigosByUserId()
            .catch((error) => {
                Alert.alert("Erro", error);
            })
            .then((obj) => {
                setAmigos(obj);
                conn.getUserInfo().then((user) => {
                    setMeuCodigo(user.uid);
                    setLoading(false);
                })
                .catch((err) => {
                    Alert.alert("Erro", err);
                    setUsername("Não logado");
                });
            });
        setLoadAmigos(true);
    }

    if (!loadedAmigos) {
        carregarAmigos();
    }

    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
        'Roboto-Regular': require('./font/Roboto-Regular.ttf'),
        'Merienda-Regular': require('./font/Merienda-Regular.ttf'),
    });
        
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
                <TouchableWithoutFeedback onPress={() => {setModalVisivel(false)}}>
                    <View style={styles.overlay}/>
                </TouchableWithoutFeedback>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.divTituloModal}>
                            <Text style={styles.textoTituloModal}>Insira o código do amigo</Text>
                        </View>
                        <TextInput 
                            style={styles.input}
                            textContentType="none"
                            keyboardType="number-pad"
                            maxLength={6}
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
                visible={loading}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.centeredViewCarregar}>
                    <View style={styles.modalCarregar}>
                        <ActivityIndicator size={70} color="#53A156"/>
                    </View>
                </View>
            </Modal>

            <View style={styles.cabecalho}>
                <View style={styles.divSetinha}>
                    <TouchableNativeFeedback style={{padding: "2%"}} onPress={() => props.navigation.goBack()}>
                        <Ionicons name="md-arrow-back" size={40} color="#5b5b58" style={styles.setinha}/>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.divCabecalho}>
                    <Text style={styles.titulo}>Amigos</Text>
                </View>
            </View>
            <View style={styles.conteudo}>
                <FlatList
                    data={amigos}
                    keyExtractor={item=>item.id}
                    renderItem={({item})=>
                        <Amigo 
                            imagem={imagensUsuario[item.imagem]}
                            nome={item.username} 
                            onPress={() => trocarTela(item.id)}
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
                />
                
            </View>
            <View style={styles.rodape}>
                <TouchableNativeFeedback onPress={() => toggleModal()}>
                    <View style={styles.botao}>
                        <Text style={styles.textoBotao}>Adicionar</Text>
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => Clipboard.setString('123456')}>
                    <View style={styles.botao}>
                        <Text style={styles.textoBotao}>Copiar</Text>
                        <Text style={styles.textoBotao}>Código</Text>
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
        width: '30%',
        height: 40,
        aspectRatio: 2.47,
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
        marginTop: "8%",
        alignSelf:'stretch',
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

export default telaAmigo;