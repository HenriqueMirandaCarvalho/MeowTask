import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableNativeFeedback, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, TextInput } from "react-native";
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons'; 
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import {PostIt} from './postit.js';
import * as firebase from 'firebase';


const telaPostIts = (props) => {
    const idGrupo = props.navigation.state.params.idGrupo;
    const [postIts, setPostIts] = useState([]);
    const [modalEditarVisivel, setModalEditarVisivel] = useState(false);
    const [guardaTexto, setGuardaTexto] = useState();
    const [guardaId, setGuardaId] = useState();

    function voltar() {
        props.navigation.goBack();
    }

    const [refresco, setRefresco] = useState(false);

    function toggleModalEditar(id, texto) {
        setModalEditarVisivel(true);
        setGuardaId(id);
        setGuardaTexto(texto);
    }
    
    function editarItem(_id) {
        setRefresco(true);
        firebase.firestore()
            .collection("Grupos")
            .doc(idGrupo)
            .collection("PostIts")
            .doc(_id)
            .set({
                descricao: guardaTexto,
                data: firebase.database.ServerValue.TIMESTAMP
            }).then(() => { setRefresco(false); });
    }

    function deletarItem(_id) {
        setRefresco(true)
        firebase.firestore()
            .collection("Grupos")
            .doc(idGrupo)
            .collection("PostIts")
            .doc(_id)
            .delete()
            .then(() => setRefresco(false));
    }

    function criarItem() {
        setRefresco(true);
        firebase.firestore()
            .collection("Grupos")
            .doc(idGrupo)
            .collection("PostIts")
            .add({
                descricao: "",
                data: firebase.database.ServerValue.TIMESTAMP
            }).then(() => { setRefresco(false); });
    }

    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
        'Roboto-Regular': require('./font/Roboto-Regular.ttf'),
    });

    useEffect(() => {
        setRefresco(true);
        const listener = firebase.firestore()
            .collection("Grupos")
            .doc(idGrupo)
            .collection("PostIts")
            .orderBy('data', 'desc')
            .onSnapshot(snapshot => {
                const postIts = snapshot.docs.map(doc => {
                    const postIt = doc.data();
                    postIt.id = doc.id;
                    return postIt;
                });
                if (postIts[0] != undefined) {
                    setPostIts(postIts);
                    if (!postIts.includes(guardaId))
                        setModalEditarVisivel(false);
                }
                else
                    setPostIts([]);
                setRefresco(false);
            });
        return () => listener();
    }, []);
        
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
                <TouchableWithoutFeedback onPress={() => {setModalEditarVisivel(false)}}>
                    <View style={styles.overlay}/>
                </TouchableWithoutFeedback>

                <View style={styles.centeredView}>
                    <View style={styles.modalEditarView}>
                        <View style={styles.overlay}>
                            <TouchableOpacity onPress={() => setModalEditarVisivel(false)}>
                                <AntDesign name="close" size={28} color="#5b5b58" style={styles.Xzinho}/>
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
                            textAlign="center"
                            defaultValue={guardaTexto}
                            maxLength={2000}
                            multiline
                            onChangeText={(texto) => setGuardaTexto(texto)}
                        />

                        <TouchableOpacity style={styles.botaoSalvarModalEditar} onPress={() => {editarItem(guardaId), setModalEditarVisivel(false)}}>
                            <Text style={styles.textoBotaoSalvarModalEditar}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>     
            </Modal>

            <View style={styles.cabecalho}>
                <View style={styles.divSetinha}>
                    <TouchableOpacity onPress={() => voltar()}>
                        <Ionicons name="md-arrow-back" size={40} color="#5b5b58" style={styles.setinha}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.divCabecalho}>
                    <Text style={styles.titulo}>Post-Its</Text>
                </View>
            </View>
            <View style={styles.conteudo}>
                <FlatList
                    data={postIts}
                    keyExtractor={item=>item.id}
                    refreshing={refresco}
                    onRefresh={() => {}}
                    renderItem={({item})=>
                        <PostIt 
                            onPress={() => toggleModalEditar(item.id, item.descricao)}
                            onLongPress={() => toggleModalEditar(item.id, item.descricao)}
                            texto={item.descricao}
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
                        ListEmptyComponent={() =>
                            <Text style={{alignSelf: "center", fontFamily: "Roboto-Light", fontSize: 20}}>Nenhum Post-it!</Text>
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
        marginBottom: "3%",
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
    }
});

export default telaPostIts;