import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableNativeFeedback, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, TextInput } from "react-native";
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { Arquivo } from './arquivo.js';
import * as DocumentPicker from 'expo-document-picker';
import * as firebase from 'firebase';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

const telaArquivos = (props) => {
    const idTarefa = props.navigation.state.params.idTarefa;

    const [arquivos, setArquivos] = useState([]);
    const [guardaTexto, setGuardaTexto] = useState();
    const [guardaId, setGuardaId] = useState();

    const [refrescando, setRefrescando] = useState(false);

    function refrescar() {
        setRefrescando(true);
        alert("olha o refresco!");
    }

    function voltar() {
        alert("voltar");
    }

    function btnSalvar() {
        alert("Salvar");
    }

    function btnNovoItem() {
        criarItem();
    }

    function baixar(ref, nome) {
        ref.getDownloadURL().then(async function (url) {
            try {
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (status === "granted") {
                    FileSystem.downloadAsync(url, FileSystem.documentDirectory + nome).then(async ({uri}) => {
                        const asset = await MediaLibrary.createAssetAsync(uri);
                        await MediaLibrary.createAlbumAsync("Download", asset, false);
                    });
                }
            } catch (err) {
                console.warn(err);
            }
        });
    }

    function toggleModalEditar(id, texto) {
        setModalEditarVisivel(true);
        setGuardaId(id);
        setGuardaTexto(texto);
    }

    function editarItem(_id) {
        const NewData = arquivos.map(item => {
            if (item.id === _id) {
                item.nomeArquivo = guardaTexto;
                return item;
            }
            return item;
        })
        setArquivos(NewData);
    }

    function deletarItem(_id) {
        const NewData = arquivos.filter(item => item.id !== _id);
        setArquivos(NewData);
    }

    function criarItem() {
        DocumentPicker.getDocumentAsync().then((result) => {
            if (result.type != "cancel") {
                urlParaBlob(result.uri).then((obj) => {
                    firebase.storage().ref().child(idTarefa + "/" + result.name).put(obj);
                });
            }
        });
    }

    function urlParaBlob(url) {
        return new Promise((resolve, reject) => {
            const xmlreq = new XMLHttpRequest();
            xmlreq.onload = () => { resolve(xmlreq.response); }
            xmlreq.onerror = () => { reject(new Error('Erro ao converter URL para Blob!')); }
            xmlreq.responseType = 'blob';
            xmlreq.open("GET", url, true);
            xmlreq.send(null);
        });
    }

    useEffect(() => {
        setRefrescando(true);
        const listener = firebase.storage()
            .ref()
            .child(idTarefa)
            .listAll()
            .then((res) => {
                let arquivos = [];
                res.items.forEach((item) => {
                    arquivos.push({ nome: item.name, ref: item });
                });
                setArquivos(arquivos)
                setRefrescando(false);
            });
        return () => listener();
    }, []);

    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
        'Roboto-Regular': require('./font/Roboto-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.cabecalho}>
                    <View style={styles.divSetinha}>
                        <TouchableOpacity onPress={() => voltar()}>
                            <Ionicons name="md-arrow-back" size={40} color="#5b5b58" style={styles.setinha} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divCabecalho}>
                        <Text style={styles.titulo}>Arquivos</Text>
                    </View>
                </View>
                <View style={styles.conteudo}>
                    <FlatList
                        data={arquivos}
                        keyExtractor={item => item.id}
                        refreshing={refrescando}
                        onRefresh={() => refrescar()}
                        renderItem={({ item }) =>
                            <Arquivo
                                onPress={() => baixar(item.ref, item.nome)}
                                onLongPress={() => toggleModalEditar(item.ref, item.nome)}
                                texto={item.nome}
                            />
                        }
                        style={{ width: "100%" }}
                        ListFooterComponent={
                            function rodapeLista() {
                                return (
                                    <View style={styles.rodapeLista}>
                                        <TouchableOpacity onPress={() => criarItem()} style={styles.botoesRodapeLista}>
                                            <AntDesign name="pluscircleo" size={60} color="#5b5b58" />
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        }
                    />
                </View>
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
        height: '11%', // 8% se tiver margintop e 11% se não tiver
        flexDirection: 'row',
        alignItems: 'flex-end',
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
    },
    titulo: {
        fontFamily: 'Roboto-Light',
        fontSize: 29,
        color: '#000000',
    },
    conteudo: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        paddingTop: "5%",
        // backgroundColor: "royalblue",
    },
    rodapeLista: {
        marginTop: "8%",
        alignSelf: 'stretch',
    },
    botoesRodapeLista: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        marginTop: "2%",
        marginBottom: "2%",
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
    modalEditarView: {
        width: "80%",
        height: null,
        aspectRatio: 2,
        backgroundColor: "#c4c4c4",
        // borderRadius: 20,
        justifyContent: "space-evenly",
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
    textoTituloModal: {
        marginTop: "2%",
        fontFamily: 'Roboto-Light',
        fontSize: 23,
    },
    input: {
        width: '85%',
        borderBottomWidth: 1,
        borderColor: '#5b5b58',
        fontSize: 20,
        paddingBottom: "2%",
    },
    botaoSalvarModalEditar: {
        marginTop: "3.5%",
        borderRadius: 40,
        width: "82%",
        height: null,
        aspectRatio: 6.12,
        backgroundColor: "#53A156",
        alignItems: "center",
        justifyContent: "center",
    },
    textoBotaoSalvarModalEditar: {
        fontFamily: 'Roboto-Light',
        fontSize: 25,
        color: '#000000',
    },
    Xzinho: {
        marginLeft: "3%",
        marginTop: "4%",
    },
    overlayDelete: {
        position: "absolute",
        alignItems: "flex-end",
        top: 0, // não faço ideia de como o top, right, bottom e left funcionam
        right: 0, // mas eles fazem o view com absolute ocupar toda a tela
        bottom: 0,
        left: 0,
    },
    delete: {
        marginRight: "3.3%",
        marginTop: "4%",
    },
});

export default telaArquivos;