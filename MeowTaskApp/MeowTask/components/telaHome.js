import React, { useEffect } from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image,
    Modal,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Alert,
    SafeAreaView,
    FlatList,
    Dimensions
} from "react-native";

import { AntDesign, Octicons, Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { useState } from "react";
import * as firebase from 'firebase';
import { Avatar } from './avatar';

const largura = Dimensions.get('window').width;
const altura = Dimensions.get('window').height;

const telaHome = (props) => {
    const user = firebase.auth().currentUser;
    const [username, setUsername] = useState(firebase.auth().currentUser.displayName);
    const [avatar, setAvatar] = useState(firebase.auth().currentUser.photoURL);
    const [loading, setLoading] = useState(false);

    const [modalAvatarVisivel, setModalAvatarVisivel] = useState(false);
    const avatares = [require('./img/gato1.png'), require('./img/gato2.png'), require('./img/gato3.png')];

    const imagensUsuario = [];
    imagensUsuario.push(require("./img/turquesa10.png"));
    imagensUsuario.push(require("./img/gato1.png"));
    imagensUsuario.push(require("./img/gato2.png"));
    imagensUsuario.push(require("./img/gato3.png"));
    const imagensModulos = [];
    imagensModulos.push(require("./img/LogoGrupo.png"));
    imagensModulos.push(require("./img/LogoPaineis.png"));
    imagensModulos.push(require("./img/LogoNotificacoes.png"));
    imagensModulos.push(require("./img/LogoPomodoro.png"));

    function trocarTela(id) {
        switch (id) {
            case 1:
                props.navigation.navigate("ListaGrupos");
                break;
            case 2:
                props.navigation.navigate("Notificacoes");
                break;
            case 3:
                props.navigation.navigate("Pomodoro");
                break;
            case 4:
                props.navigation.navigate("Amigos");
                break;
            default:
                break;
        }
    }

    function toggleModalConfig() {
        props.navigation.navigate("Configuracoes");
    }

    function selecionarAvatar(_index) {
        if (_index == (avatar-1)) {
            return true;
        } else {
            return false;
        }
    }

    function toggleModalAvatar() {
        if (!modalAvatarVisivel) {
            setModalAvatarVisivel(true);
        }
        else {
            setModalAvatarVisivel(false);

            firebase.auth().currentUser.updateProfile({
                photoURL: avatar
            });
            firebase.firestore()
                .collection("Codigos")
                .doc(firebase.auth().currentUser.uid)
                .update({
                    imagem: avatar
                });
        }
    }
    
    useEffect(() => {
        const listener = firebase.firestore()
            .collection("Codigos")
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot(snapshot => {
                setUsername(snapshot.data().nome);
                setAvatar(snapshot.data().imagem);
            });
        return () => listener();
    }, []);

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
                    visible={modalAvatarVisivel}
                    onRequestClose={() => {
                        toggleModalAvatar();
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => toggleModalAvatar()}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback>

                    <View style={styles.centeredView}>
                        <View>
                            <View style={styles.modalView}>
                                <SafeAreaView style={{ width: "92.5%", aspectRatio: 3 }}>
                                    <FlatList
                                        data={avatares}
                                        keyExtractor={(index) => index.toString()}
                                        horizontal={true}
                                        renderItem={({ item, index }) =>
                                            <Avatar
                                                onPressIn={() => setAvatar(index+1)}
                                                imagem={item}
                                                selecionada={selecionarAvatar(index)}
                                            />
                                        }
                                        style={{ backgroundColor: "#69665E" }}
                                    />
                                </SafeAreaView>
                            </View>
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
                            <ActivityIndicator size={70} color="#53A156" />
                        </View>
                    </View>
                </Modal>

                <View style={styles.cabecalho}>
                    <View style={styles.divAvatar}>
                        <TouchableOpacity onPress={() => toggleModalAvatar()}>
                            <Image source={imagensUsuario[avatar]} style={styles.imagemAvatar}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleModalAvatar()}>
                            <Text style={styles.textoAvatar}>{username}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divConfig}>
                        <View style={styles.divConfigMargem}>
                            <TouchableOpacity onPress={() => toggleModalConfig()}>
                                <Octicons name="three-bars" size={34} color="#5b5b58" style={styles.iconeConfig} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.conteudo}>
                    <View style={styles.modulo}>
                        <View style={styles.divImagemModulo}>
                            <TouchableOpacity onPress={() => trocarTela(1)}>
                                <Image source={imagensModulos[1]} style={styles.imagemModulo}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.divTextoModulo}>
                            <TouchableOpacity onPress={() => trocarTela(1)}>
                                <Text style={styles.textoModulo}>Grupos</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.modulo}>
                        <View style={styles.divImagemModulo}>
                            <TouchableOpacity onPress={() => trocarTela(2)}>
                                <Image source={imagensModulos[2]} style={styles.imagemModulo}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.divTextoModulo}>
                            <TouchableOpacity onPress={() => trocarTela(2)}>
                                <Text style={styles.textoModulo}>Notificações</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.modulo}>
                        <View style={styles.divImagemModulo}>
                            <TouchableOpacity onPress={() => trocarTela(3)}>
                                <Image source={imagensModulos[3]} style={styles.imagemModulo}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.divTextoModulo}>
                            <TouchableOpacity onPress={() => trocarTela(3)}>
                                <Text style={styles.textoModulo}>Pomodoro</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.modulo}>
                        <View style={styles.divImagemModulo}>
                            <TouchableOpacity onPress={() => trocarTela(4)}>
                                <Image source={imagensModulos[0]} style={styles.imagemModulo}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.divTextoModulo}>
                            <TouchableOpacity onPress={() => trocarTela(4)}>
                                <Text style={styles.textoModulo}>Amigos</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* <View style={styles.rodape}>
                    <TouchableOpacity onPress={() => trocarTela(1)}>
                        <AntDesign name="pluscircleo" size={110} color="#5b5b58" />
                    </TouchableOpacity>
                    <Text style={styles.textoRodape}>lorem ipsum dolor sit amet</Text>
                </View> */}
                <StatusBar translucent backgroundColor={'#eae6da'} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eae6da',
        marginTop: StatusBar.currentHeight || 0,
    },
    cabecalho: {
        height: '18%',
        borderBottomWidth: 1,
        borderColor: '#5b5b58',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingBottom: '1%',
    },
    conteudo: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        paddingTop: "4%",
    },
    rodape: {
        height: '29%',
        borderTopWidth: 1,
        borderColor: '#5b5b58',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: "2%",
    },
    divAvatar: {
        minWidth: "40%",
        maxWidth: '80%',
        height: "62%",
        marginBottom: "5%",
        marginLeft: "7%",
        flexDirection: "row",
        alignItems: "center",
    },
    imagemAvatar: {
        height: "100%",
        width: null,
        aspectRatio: 1,
        borderRadius: 150,
    },
    textoAvatar: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        color: '#5b5b58',
        marginLeft: "10%",
    },
    divConfig: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    divConfigMargem: { // eu fiz um view separado pra colocar a margem, se colocar a margem direto no icone o hitbox dele fica grande demais
        marginRight: "7.2%",
        marginTop: "2.5%",
    },
    iconeConfig: {
        padding: "1%",
    },
    textoRodape: {
        fontFamily: 'Roboto-Regular',
        fontSize: 23,
        color: '#5b5b58',
        paddingBottom: "2%",
    },
    modulo: {
        width: "33%",
        marginTop: "5%",
        marginLeft: "0.25%",
    },
    divTextoModulo: {
        alignItems: "center"
    },
    divImagemModulo: {
        width: "100%",
        paddingLeft: "19.5%",
        paddingRight: "19.5%",
    },
    imagemModulo: {
        aspectRatio: 1,
        width: '100%',
        height: null,
    },
    textoModulo: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        color: '#5b5b58',
        marginLeft: "2.2%",
    },
    containerConfig: {
        backgroundColor: "#eae6da",
        flex: 1,
    },
    cabecalhoConfig: {
        justifyContent: "center",
        alignItems: "center",
        height: "13%",
        borderBottomWidth: 2,
        borderBottomColor: "#5b5b58",
    },
    tituloConfig: {
        fontFamily: 'Roboto-Light',
        fontSize: 40,
        color: '#5b5b58',
    },
    divSetinhaConfig: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: "6.6%",
    },
    conteudoConfig1: {
        height: "18%",
        justifyContent: "space-evenly",
        borderBottomWidth: 1,
        borderBottomColor: "#5b5b58",
    },
    conteudoConfig2: {
        height: "26.5%",
        justifyContent: "space-evenly",
        borderBottomWidth: 1,
        borderBottomColor: "#5b5b58",
    },
    conteudoConfig3: {
        height: "17.5%",
        justifyContent: "space-evenly",
        borderBottomWidth: 1,
        borderBottomColor: "#5b5b58",
    },
    conteudoConfig4: {
        height: "8.85%",
        justifyContent: "space-evenly",
        borderBottomWidth: 1,
        borderBottomColor: "#5b5b58",
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
    rodapeConfig: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    botaoGatos: {
        flexDirection: "row",
        alignItems: "center",
    },
    textoBotaoEstrela: {
        fontFamily: 'Roboto-Light',
        fontSize: 20,
        color: '#5b5b58',
        marginLeft: "3%",
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
    },
    modalView: {
        paddingTop: 0.03*largura,
        paddingBottom: 0.03*largura,
        width: 0.80 * largura,
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
    textoTituloModal: {
        marginTop: "2%",
        fontFamily: 'Roboto-Light',
        fontSize: 23,
    },
});

export default telaHome;