import React from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image,
    Modal,
    TouchableNativeFeedback,
    ActivityIndicator,
    Alert
} from "react-native";

import { AntDesign, Octicons, Ionicons, FontAwesome, Entypo } from '@expo/vector-icons'; 
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { useState } from "react";
import Conexao from "./classes/Conexao.js";

const telaHome = (props) => {
    const [username, setUsername] = useState("...");
    const [avatar, setAvatar] = useState(0);
    const [modalConfigVisivel, setModalConfigVisivel] = useState(false);
    const [loading, setLoading] = useState(true);

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
        switch(id) {
            case 1:
                props.navigation.navigate("ListaGrupos");
                break;
            case 3:
                props.navigation.navigate("Notificacoes");
                break;
            case 5:
                props.navigation.navigate("Amigos");
                break;
            default:
                break;
        }
    }

    function toggleModalConfig() {
        setModalConfigVisivel(!modalConfigVisivel);
    }

    function btnConta() {
        alert("Conta");
    }

    function btnVisual() {
        alert("Visual");
    }

    function btnNotificacoes() {
        alert("Notificações");
    }

    function btnIdiomaTexto() {
        alert("sem tempo irmão");
    }

    function btnDataHora() {
        alert("Data e Hora");
    }

    function btnAcessibilidade() {
        alert("Acessibilidade");
    }

    function btnPrivacidadeTermos() {
        alert("Privacidade e Termos");
    }

    function btnSobre() {
        alert("Sobre");
    }

    function btnGatos() {
        alert("(Insira gatos fofos aqui)");
    }

    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
        'Roboto-Regular': require('./font/Roboto-Regular.ttf'),
        'Merienda-Regular': require('./font/Merienda-Regular.ttf'),
    });
        
    function loadUserData() {
        let conn = new Conexao();
        conn.getUserInfo().then((user) => {
            setUsername(user.username);
            setAvatar(user.imagem);
            setLoading(false);
        })
        .catch((err) => {
            Alert.alert("Erro", err);
            setUsername("Não logado");
        });
    }

    loadUserData();

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalConfigVisivel}
                onRequestClose={() => {
                    setModalConfigVisivel(false);
                }}
            >
                <View style={styles.containerConfig}>
                    <View style={styles.cabecalhoConfig}>
                        <View style={styles.divSetinhaConfig}>
                            <TouchableOpacity onPress={() => toggleModalConfig()}>
                                <Ionicons name="md-arrow-back" size={44} color="#5b5b58"/>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.tituloConfig}>Configurações</Text>
                    </View>
                    <View style={styles.conteudoConfig1}>
                        <View style={styles.botoesConfig}>
                            <TouchableOpacity onPress={()=> btnConta()}>
                                <FontAwesome name="circle" size={35} color="#00e6dc" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> btnConta()} style={styles.divTextoBotoesConfig}>
                                <Text style={styles.textoBotoesConfig}>Conta</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.botoesConfig}>
                            <TouchableOpacity onPress={()=> btnVisual()}>
                                <FontAwesome name="circle" size={35} color="#00e6dc" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> btnVisual()} style={styles.divTextoBotoesConfig}>
                                <Text style={styles.textoBotoesConfig}>Visual</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.conteudoConfig2}>
                        <View style={styles.botoesConfig}>
                            <TouchableOpacity onPress={()=> btnNotificacoes()}>
                                <FontAwesome name="circle" size={35} color="#00e6dc" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> btnNotificacoes()} style={styles.divTextoBotoesConfig}>
                                <Text style={styles.textoBotoesConfig}>Notificações</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.botoesConfig}>
                            <TouchableOpacity onPress={()=> btnIdiomaTexto()}>
                                <FontAwesome name="circle" size={35} color="#00e6dc" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> btnIdiomaTexto()} style={styles.divTextoBotoesConfig}>
                                <Text style={styles.textoBotoesConfig}>Idioma e Texto</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.botoesConfig}>
                            <TouchableOpacity onPress={()=> btnDataHora()}>
                                <FontAwesome name="circle" size={35} color="#00e6dc" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> btnDataHora()} style={styles.divTextoBotoesConfig}>
                                <Text style={styles.textoBotoesConfig}>Data e Hora</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.conteudoConfig3}>
                        <View style={styles.botoesConfig}>
                            <TouchableOpacity onPress={()=> btnAcessibilidade()}>
                                <FontAwesome name="circle" size={35} color="#00e6dc" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> btnAcessibilidade()} style={styles.divTextoBotoesConfig}>
                                <Text style={styles.textoBotoesConfig}>Acessibilidade</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.botoesConfig}>
                            <TouchableOpacity onPress={()=> btnPrivacidadeTermos()}>
                                <FontAwesome name="circle" size={35} color="#00e6dc" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> btnPrivacidadeTermos()} style={styles.divTextoBotoesConfig}>
                                <Text style={styles.textoBotoesConfig}>Privacidade e Termos</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.conteudoConfig4}>
                        <View style={styles.botoesConfig}>
                            <TouchableOpacity onPress={()=> btnSobre()}>
                                <FontAwesome name="circle" size={35} color="#00e6dc" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> btnSobre()} style={styles.divTextoBotoesConfig}>
                                <Text style={styles.textoBotoesConfig}>Sobre o Meow Task</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.rodapeConfig}>
                        <TouchableNativeFeedback onPress={() => btnGatos()}>
                            <View style={styles.botaoGatos}>
                                <Entypo name="star" size={60} color={"yellow"} />
                                <Text style={styles.textoBotaoEstrela}>Gatos Fofos!</Text>
                            </View>
                        </TouchableNativeFeedback>
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
                <View style={styles.divAvatar}>
                    <TouchableOpacity onPress={() => trocarTela(1)}>
                        <Image source={imagensUsuario[avatar]} style={styles.imagemAvatar}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => trocarTela(1)}>
                        <Text style={styles.textoAvatar}>{username}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.divConfig}>
                    <View style={styles.divConfigMargem}>
                        <TouchableOpacity onPress={() =>  toggleModalConfig()}>
                            <Octicons name="three-bars" size={34} color="#5b5b58" style={styles.iconeConfig} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.conteudo}>
                <View style={styles.modulo}>
                    <View style={styles.divImagemModulo}>
                        <TouchableOpacity onPress={() => trocarTela(1)}>
                            <Image source={imagensModulos[0]} style={styles.imagemModulo}></Image>
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
                            <Image source={imagensModulos[1]} style={styles.imagemModulo}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divTextoModulo}>
                        <TouchableOpacity onPress={() => trocarTela(2)}>
                            <Text style={styles.textoModulo}>Paineis</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.modulo}>
                    <View style={styles.divImagemModulo}>
                        <TouchableOpacity onPress={() => trocarTela(3)}>
                            <Image source={imagensModulos[2]} style={styles.imagemModulo}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divTextoModulo}>
                        <TouchableOpacity onPress={() => trocarTela(3)}>
                            <Text style={styles.textoModulo}>Notificações</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.modulo}>
                    <View style={styles.divImagemModulo}>
                        <TouchableOpacity onPress={() => trocarTela(4)}>
                            <Image source={imagensModulos[3]} style={styles.imagemModulo}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divTextoModulo}>
                        <TouchableOpacity onPress={() => trocarTela(4)}>
                            <Text style={styles.textoModulo}>Pomodoro</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.modulo}>
                    <View style={styles.divImagemModulo}>
                        <TouchableOpacity onPress={() => trocarTela(5)}>
                            <Image source={imagensModulos[0]} style={styles.imagemModulo}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divTextoModulo}>
                        <TouchableOpacity onPress={() => trocarTela(5)}>
                            <Text style={styles.textoModulo}>Amigos</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.rodape}>
                <TouchableOpacity onPress={() => trocarTela(1)}>
                    <AntDesign name="pluscircleo" size={110} color="#5b5b58" />
                </TouchableOpacity>            
                <Text style={styles.textoRodape}>lorem ipsum dolor sit amet</Text>
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
    }
});

export default telaHome;