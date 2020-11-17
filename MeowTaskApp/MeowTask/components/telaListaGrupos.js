import React, { useState, version } from "react";
import { Alert, View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, StatusBar, FlatList, Modal, TouchableWithoutFeedback, TextInput, Image, SafeAreaView } from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { Grupo } from './grupo.js';
import { AmigoModal } from './amigosmodal';
import GrupoClasse from './classes/Grupo.js';
import Conexao from './classes/Conexao.js';

const telaListaGrupos = (props) => {
    const [modalEntrarVisivel, setModalEntrarVisivel] = useState(false);
    const [modalCriarVisivel, setModalCriarVisivel] = useState(false);
    const [inputCodigo, setInputCodigo] = useState();
    const [inputNomeGrupo, setInputNomeGrupo] = useState();
    const [inputImagem, setInputImagem] = useState(1);

    const imagensGrupos = [];
    imagensGrupos.push(require("./img/turquesa10.png"));
    imagensGrupos.push(require("./img/LogoGrupos1.png"));
    imagensGrupos.push(require("./img/LogoGrupos2.png"));
    imagensGrupos.push(require("./img/LogoGrupos3.png"));

    function validaNumero(numero) {
        // code to remove non-numeric characters from text
        setInputCodigo(numero.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''));
        // (validação roubada do stack overflow)
    }

    function voltar() {
        props.navigation.goBack();
    }

    function trocarTela(id) {
        props.navigation.navigate('Grupo', {
            idGrupo: id
        });
    }

    function toggleModalCriar() {
        setModalCriarVisivel(!modalCriarVisivel);

    }

    function criarGrupo() {
        try {
            let grupo = new GrupoClasse();
            grupo.setNome(inputNomeGrupo);
            grupo.setImagem(inputImagem);
            let conn = new Conexao();
            conn.cadastrarGrupo(grupo).then((data) => {
                Alert.alert("Aviso", "Grupo criado com sucesso!");
                toggleModalCriar();
                carregarGrupos();
            });
        } catch (err) {
            Alert.alert("Erro", err.toString());
        }
    }

    function toggleModalEntrar() {
        setModalEntrarVisivel(!modalEntrarVisivel);
    }

    function entrarGrupo() {
        alert(inputCodigo);
    }

    function selecionarImagem() {
        switch (inputImagem) {
            case 1:
                setInputImagem(2);
                break;
            case 2:
                setInputImagem(3);
                break;
            case 3:
                setInputImagem(1);
                break;
        }
    }

    const [grupos, setGrupos] = useState([]);
    const [amigos, setAmigos] = useState([]);

    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
        'Roboto-Regular': require('./font/Roboto-Regular.ttf'),
        'Merienda-Regular': require('./font/Merienda-Regular.ttf'),
    });

    function carregarGrupos() {
        let conn = new Conexao();
        conn.getGruposByUserId()
        .catch((error) => {
            Alert.alert("Erro", error);
        })
        .then((obj) => {
            setGrupos(obj);
        });
    }

    carregarGrupos();

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalEntrarVisivel}
                    onRequestClose={() => {
                        setModalEntrarVisivel(false);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => { setModalEntrarVisivel(false) }}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback>

                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.divTituloModal}>
                                <Text style={styles.textoTituloModal}>Insira o código do Grupo</Text>
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
                            <TouchableOpacity onPress={() => entrarGrupo(inputCodigo)}>
                                <View style={styles.botaoModal}>
                                    <Text style={styles.textoBotaoModal}>Adicionar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalCriarVisivel}
                    onRequestClose={() => {
                        setModalCriarVisivel(false);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => { setModalCriarVisivel(false) }}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback>

                    <View style={styles.centeredView}>
                        <View style={styles.modalView2}>
                            <Text style={styles.textoTituloModal}>Informações</Text>
                            <TouchableOpacity onPress={() => selecionarImagem()}>
                                <Image source={imagensGrupos[inputImagem]} style={styles.imagemModal} />
                            </TouchableOpacity>

                            <TextInput
                                style={styles.input2}
                                textContentType="none"
                                returnKeyType="done"
                                textAlign="center"
                                placeholder="Insira o nome do grupo"
                                placeholderTextColor="#a4a4a4"
                                onChangeText={(nome) => setInputNomeGrupo(nome)}
                            />

                            <View style={styles.divListaAmigos}>
                                <SafeAreaView style={{flex: 1}}>
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
                                                onPress={() => trocarTela(item.id)}
                                            />}
                                        ListEmptyComponent={() => 
                                            <Text style={styles.tituloListaAmigos}>Você não possuí amigos!</Text>
                                        }
                                    />
                                </SafeAreaView>
                            </View>

                            <TouchableOpacity style={styles.botaoCriarGrupoModal} onPress={() => criarGrupo()}>
                                <Text style={styles.textoBotaoCriarGrupoModal}>Criar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View style={styles.cabecalho}>
                    <View style={styles.divSetinha}>
                        <TouchableOpacity onPress={voltar}>
                            <Ionicons name="md-arrow-back" size={40} color="#5b5b58" style={styles.setinha} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divCabecalho}>
                        <Text style={styles.titulo}>Grupos</Text>
                    </View>
                </View>
                <View style={styles.conteudo}>
                    <FlatList
                        data={grupos}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <Grupo
                                imagem={imagensGrupos[item.imagem]}
                                nome={item.nome}
                                membros={item.membros.length}
                                onPress={() => trocarTela(item.id)}
                            />}
                        ListFooterComponent={
                            function rodapeLista() {
                                if (grupos.length == 0) {
                                    return (
                                        <View style={styles.rodapeLista}>
                                            <TouchableOpacity onPress={() => toggleModalCriar()} style={styles.botoesRodapeLista}>
                                                <AntDesign name="pluscircleo" size={60} color="#5b5b58" />
                                                <Text style={styles.textoBotaoRodapeLista}>Criar novo grupo</Text>
                                            </TouchableOpacity>
                                            <View style={styles.tracinho} />
                                            <TouchableOpacity onPress={() => toggleModalEntrar()} style={styles.botoesRodapeLista}>
                                                <AntDesign name="pluscircleo" size={60} color="#5b5b58" />
                                                <Text style={styles.textoBotaoRodapeLista}>Entrar em um grupo</Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }
                                else
                                {
                                    return(<View></View>);
                                }
                            }
                        }
                        ListEmptyComponent={() => 
                            <Text style={{marginTop: '10%', fontFamily: 'Roboto-Light', fontSize: 18, alignSelf: 'center'}}>Você não possuí nenhum grupo!</Text>
                        }
                    />

                </View>
                <View style={styles.rodape}>
                    <TouchableNativeFeedback onPress={toggleModalCriar}>
                        <View style={styles.botao}>
                            <Text style={styles.textoBotao}>Criar</Text>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={toggleModalEntrar}>
                        <View style={styles.botao}>
                            <Text style={styles.textoBotao}>Entrar</Text>
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
    tracinho: {
        width: '70%',
        borderBottomWidth: 1,
        borderColor: '#5b5b58',
        alignSelf: "center",
        backgroundColor: "yellow",
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
    modalView2: {
        width: "80%",
        height: null,
        aspectRatio: 0.98,
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
        marginTop: "2%",
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
    input2: {
        width: '85%',
        borderBottomWidth: 1,
        borderColor: '#5b5b58',
        fontSize: 20,
    },
    imagemModal: {
        borderRadius: 150,
        width: "25.5%",
        height: null,
        aspectRatio: 1,
    },
    divListaAmigos: {
        marginTop: "3.3%",
        width: "80%",
        height: "31%",
        backgroundColor: "#a4a4a4",
    },
    tituloListaAmigos: {
        fontFamily: 'Roboto-Light',
        fontSize: 18,
        color: '#000000',
        alignSelf: "center",
    },
    botaoCriarGrupoModal: {
        marginTop: "3.5%",
        borderRadius: 40,
        width: "82%",
        height: null,
        aspectRatio: 6.12,
        backgroundColor: "#53A156",
        alignItems: "center",
        justifyContent: "center",
    },
    textoBotaoCriarGrupoModal: {
        fontFamily: 'Roboto-Light',
        fontSize: 25,
        color: '#000000',
    },
});

export default telaListaGrupos;