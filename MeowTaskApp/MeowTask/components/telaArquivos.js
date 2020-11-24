import React, { useState } from "react";
import {View, Text, StyleSheet, Image, TouchableNativeFeedback, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, TextInput } from "react-native";
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons'; 
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import {Arquivo} from './arquivo.js';
import * as DocumentPicker from 'expo-document-picker';


const telaArquivos = (props) => {

    const [arquivos, setArquivos] = useState([
        {
            id: "0",
            nomeArquivo: "Arquivo 1",
        },
        {
            id: "1",
            nomeArquivo: "Arquivo 2",
        },
    ]);
    const [guardaTexto, setGuardaTexto] = useState();
    const [guardaId, setGuardaId] = useState();

    const [refrescando, setRefrescando] = useState(false);

    function refrescar(){
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

    function baixar(id) {
        alert("Baixar");
    }

    function toggleModalEditar(id, texto) {
        setModalEditarVisivel(true);
        setGuardaId(id);
        setGuardaTexto(texto);
    }
    
    function editarItem(_id) {
        const NewData = arquivos.map( item => {
            if(item.id === _id){
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
        DocumentPicker.getDocumentAsync();
    }

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
                        <Ionicons name="md-arrow-back" size={40} color="#5b5b58" style={styles.setinha}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.divCabecalho}>
                    <Text style={styles.titulo}>Arquivos</Text>
                </View>
            </View>
            <View style={styles.conteudo}>
                <FlatList
                    data={arquivos}
                    keyExtractor={item=>item.id}
                    refreshing={refrescando}
                    onRefresh={() => refrescar()}
                    renderItem={({item})=>
                        <Arquivo 
                            onPress={() => baixar(item.id)}
                            onLongPress={() => toggleModalEditar(item.id, item.nomeArquivo)}
                            texto={item.nomeArquivo}
                        />
                    }
                    style={{width: "100%"}}
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
        alignSelf:'stretch',
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