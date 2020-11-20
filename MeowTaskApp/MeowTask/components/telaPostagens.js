import React, { useState } from "react";
import {View, Text, StyleSheet, Image, TouchableNativeFeedback, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, TextInput, Dimensions } from "react-native";
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons'; 
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import {Postagem} from './postagem.js';

const altura = Dimensions.get('window').height;

export default function telaInicial() {

    const [postagens, setPostagens] = useState([
        {
            id: "0",
            avatarPostador: require('./img/turquesa10.png'),
            nomePostador: "fulano",
            texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis nisl ac eleifend interdum. Sed tellus orci, rutrum vel interdum consectetur, convallis id quam. In vitae hendrerit velit. Donec in urna eget ex tempus lacinia. Quisque euismod pulvinar urna, id efficitur orci porttitor sit amet. Vestibulum hendrerit pretium erat. Cras dignissim dignissim egestas. Aliquam erat volutpat.",
        },
    ]);
    const [modalEditarVisivel, setModalEditarVisivel] = useState(false);
    const [modalCriarVisivel, setModalCriarVisivel] = useState(false);
    const [guardaTexto, setGuardaTexto] = useState();
    const [guardaNovoTexto, setGuardaNovoTexto] = useState();
    const [guardaId, setGuardaId] = useState();

    function voltar() {
        alert("voltar");
    }

    function btnSalvar() {
        alert("Salvar");
    }

    function btnNovoItem() {
        setModalCriarVisivel(true)
    }

    function toggleModalEditar(id, texto) {
        setModalEditarVisivel(true);
        setGuardaId(id);
        setGuardaTexto(texto);
    }
    
    function editarItem(_id) {
        const NewData = postagens.map( item => {
            if(item.id === _id){
                item.texto = guardaTexto;
                return item;
            }
            return item;
        })
        setPostagens(NewData);
    }

    function deletarItem(_id) {
        const NewData = postagens.filter(item => item.id !== _id);
        setPostagens(NewData);
    }

    function postar() {
        postagens.push(
            {
                id: postagens.length,
                avatarPostador: require('./img/turquesa10.png'),
                nomePostador: "fulano",
                texto: guardaNovoTexto,
            }
        )
        setPostagens([...postagens]);
        setGuardaNovoTexto("");
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
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalEditarVisivel}
                onRequestClose={() => {
                    setModalEditarVisivel(false);
                }}
            >
                <View style={styles.modalEditarView}>
                    <View style={styles.overlayXzinho}>
                        <TouchableOpacity style={styles.Xzinho} onPress={() => setModalEditarVisivel(false)}>
                            <AntDesign name="close" size={30} color="#5b5b58"/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.overlayDelete}>
                        <TouchableOpacity onPress={() => {deletarItem(guardaId), setModalEditarVisivel(false)}}>
                            <FontAwesome5 name="trash-alt" size={24} color="#5b5b58" style={styles.delete}/>
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.textoTituloModal}>Editar</Text>

                    <TextInput 
                        style={styles.input}
                        textContentType="none"
                        returnKeyType="done"
                        textAlign="justify"
                        defaultValue={guardaTexto}
                        multiline
                        maxLength={300}
                        onChangeText={(texto) => setGuardaTexto(texto)}
                    />

                    <TouchableOpacity style={styles.botaoSalvarModalEditar} onPress={() => {editarItem(guardaId), setModalEditarVisivel(false)}}>
                        <Text style={styles.textoBotaoSalvarModalEditar}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <View style={styles.cabecalho}>
                <View style={styles.divSetinha}>
                    <TouchableOpacity onPress={() => voltar()}>
                        <Ionicons name="md-arrow-back" size={40} color="#5b5b58" style={styles.setinha}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.divTitulo}>
                    <Text style={styles.titulo}>Postagens</Text>
                </View>
            </View>
            <View style={styles.conteudo}>
                <FlatList
                    data={postagens}
                    keyExtractor={item=>item.id}
                    renderItem={({item})=>
                        <Postagem 
                            avatarPostador={item.avatarPostador}
                            nomePostador={item.nomePostador}
                            texto={item.texto}
                            onLongPress={() => toggleModalEditar(item.id, item.texto)}
                        />
                    }
                    style={{width: "100%"}}
                />
            </View>
            <View style={styles.rodape}>
                <TextInput 
                    style={styles.inputPostar}
                    textContentType="none"
                    returnKeyType="done"
                    textAlign="center"
                    multiline
                    maxLength={300}
                    value={guardaNovoTexto}
                    onChangeText={(texto) => setGuardaNovoTexto(texto)}
                />
                <TouchableOpacity onPress={() => postar()}>
                    <AntDesign name="smileo" size={40} color="white"/>
                </TouchableOpacity>
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
        // height: '11%',
        height: altura*0.11,
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
    setinha: {
        marginLeft: '5%',
    },
    divTitulo: {
        width: '100%',
        alignItems: 'center',
    },
    titulo: {
        fontFamily: 'Roboto-Light',
        fontSize: 29,
        color: '#000000',
    },
    conteudo: {
        width: "100%",
        flex: 6,
        alignItems: "center",
        paddingTop: "5%",
        // backgroundColor: "royalblue",
    },
    rodape: {
        minHeight: altura*0.11,
        maxHeight: altura*0.21,
        width: "100%",
        backgroundColor: "#A4A4A4",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    inputPostar: {
        width: '70.5%',
        minHeight: altura*0.066,
        maxHeight: "90%",
        backgroundColor: "#C4C4C4",
        borderRadius: 10,
        fontSize: 20,
        paddingBottom: "2%",
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
    overlayXzinho: {
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
    },
    modalEditarView: {
        width: "100%",
        height: "100%",
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
        marginBottom: "15%",
        fontFamily: 'Roboto-Light',
        fontSize: 29,
    },
    input: {
        width: '85%',
        borderBottomWidth: 1,
        borderColor: '#5b5b58',
        fontSize: 20,
        paddingBottom: "2%",
    },
    botaoSalvarModalEditar: {
        marginTop: "10%",
        marginBottom: "5%",
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
        position: "absolute",
        aspectRatio: 1,
        marginLeft: "3%",
        marginTop: "2%",
        justifyContent: "center",
        alignItems: "center",
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
        padding: "1%",
    },
});