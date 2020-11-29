import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar, Dimensions, Image, Modal, TouchableWithoutFeedback, TextInput } from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import Animated from 'react-native-reanimated';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('pomodoro');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log("AA");
    }
}

const setData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('pomodoro', jsonValue);
    } catch (e) {
        console.log("BB");
    }
}

const largura = Dimensions.get('window').width;
const altura = Dimensions.get('window').height;

const telaPomodoro = (props) => {

    const [textoBotao, setTextoBotao] = useState("Iniciar");

    const [minutos, setMinutos] = useState(0);
    const [segundos, setSegundos] = useState(0);
    const [running, setRunning] = useState(false);
    const [pausado, setPausado] = useState(false);
    const [iterador, setIterador] = useState(0);
    const [textoContagem, setTextoContagem] = useState("0:00");
    
    const [modalVisivel, setModalVisivel] = useState(false);

    const [duracaoTrabalho, setDuracaoTrabalho] = useState(10);
    const [duracaoDescanso, setDuracaoDescanso] = useState(5);
    const [quantidadePomodoros, setQuantidadePomodoros] = useState(3);
    const [guardaDuracaoTrabalho, setGuardaDuracaoTrabalho] = useState(duracaoTrabalho);
    const [guardaDuracaoDescanso, setGuardaDuracaoDescanso] = useState(duracaoDescanso);
    const [guardaQuantidadePomodoros, setGuardaQuantidadePomodoros] = useState(quantidadePomodoros);

    const [gato, setGato] = useState(require("./img/gatoestudando.png"));
    
    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
        'Roboto-Regular': require('./font/Roboto-Regular.ttf'),
        'Merienda-Regular': require('./font/Merienda-Regular.ttf'),
    });

    const [intervalos, setIntervalos] = useState([
        {
            id: "0",
            duracao: 2,
            sossego: false,
        },
        {
            id: "1",
            duracao: 1,
            sossego: true,
        },
        {
            id: "2",
            duracao: 2,
            sossego: false,
        },
    ]);
    
    function contagemRegressiva() {
        if (running == true) {
            setSegundos(segundos => segundos - 1);
            if(segundos == 0) {
                setSegundos(59);
                if(minutos!=0) {
                    setMinutos(minutos => minutos - 1);
                } else {
                    if (iterador == (intervalos.length -1)) {
                        alert("sem tempo");
                        setRunning(false);
                        setPausado(false);
                        setSegundos(0);
                        setIterador(0);
                        setTextoBotao("Iniciar");
                    } else {
                        setMinutos(intervalos[(iterador+1)].duracao);
                        setIterador(iterador + 1);
                        setSegundos(0);
                    }
                }
            }
            let segundo2Digitos = "" + segundos;
            if (segundo2Digitos.length == 1){
                segundo2Digitos = "0" + segundos;
            } else {
                segundo2Digitos = "" + segundos;
            }
            setTextoContagem(minutos.toString()+":"+segundo2Digitos.toString());
        }
    }

    function toggleRelogio() {
        if(running == false){
            if(pausado == true){
                setRunning(true);
                setTextoBotao("Pausar");
            } else {
                let segundo2Digitos = "" + segundos;
                if (segundo2Digitos.length == 1){
                    segundo2Digitos = "0" + segundos;
                } else {
                    segundo2Digitos = "" + segundos;
                }
                setTextoContagem(minutos.toString()+":"+segundo2Digitos.toString());
                setSegundos(0);
                setMinutos(intervalos[0].duracao);
                setRunning(true);
                setTextoBotao("Pausar");
            }
        } else {
            setRunning(false);
            setPausado(true);
            setTextoBotao("Continuar");
        }
    }

    useEffect(() => {
        const intervalo = window.setInterval(() => contagemRegressiva(), 1000);

        return () => {
            window.clearInterval(intervalo);
        };
    });

    useEffect(() => {
        getData().then((obj) => {
            console.log(obj);
            if (obj != null) {
                setDuracaoTrabalho(obj.duracaoTrabalho);
                setDuracaoDescanso(obj.duracaoDescanso);
                setQuantidadePomodoros(obj.quantidadePomodoros);
            }
        })
    }, []);
    
    function toggleModal() {
        setModalVisivel(!modalVisivel);
    }

    function estilizador(id) {
        let somaDuracoes = 0;
        intervalos.forEach(item => {
            somaDuracoes += item.duracao;
        });
        let unidadeTamanho = (0.8*largura)/somaDuracoes;
        if (intervalos[id].sossego) {
            return ({
                width: (intervalos[id].duracao*unidadeTamanho),
                backgroundColor: "#70bf42",
                justifyContent: "center",
                alignItems: "center",
            })
        } else {
            return ({
                width: (intervalos[id].duracao*unidadeTamanho),
                backgroundColor: "#ed5e58",
                justifyContent: "center",
                alignItems: "center",
            })
        }
    }

    function posicionador() {
        if (!running && !pausado) {return 0}
        let somaDuracoes = 0;
        intervalos.forEach(item => {
            somaDuracoes += item.duracao;
        });
        let minutoTamanho = (0.8*largura)/somaDuracoes;
        let segundoTamanho = minutoTamanho/60;
        let minutosDecorridos = 0;
        if (segundos > 0) {
            minutosDecorridos = intervalos[iterador].duracao-(minutos+1);
        } else {
            minutosDecorridos = intervalos[iterador].duracao-minutos;
        }
        let segundosDecorridos = 0;
        if (segundos != 0){
            segundosDecorridos = 60-segundos;
        }
        intervalos.forEach(item => {
            if (item.id < iterador){
                minutosDecorridos += item.duracao
            }
        })
        let margin = (minutosDecorridos*minutoTamanho)+(segundosDecorridos*segundoTamanho);
        if(margin > 0) {
            return margin;
        } else {
            return 0;
        }
    }

    function trocaGato(estado) {
        if (estado == "normal") {
            setGato(require("./img/gatoestudando.png"));
        } else if (estado == "descansando") {
            setGato(require("./img/gatoestudando.png"));
        } else if (estado == "trabalhando") {
            setGato(require("./img/gatoestudando.png"));
        }
    }

    function colorizador() {
        if (running) {
            if (intervalos[iterador].sossego) {
                return "#eae6da";
            } else {
                return "#eae6da";
            }
        } else {
            return "#eae6da";
        }
    }

    function validaTrabalho(numero) {
        // code to remove non-numeric characters from text
        let removido = numero.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
        if (removido){
            setGuardaDuracaoTrabalho(Number.parseInt(removido));
            if (removido < 1) {
                setGuardaDuracaoTrabalho('');
            }
        } else {
            setGuardaDuracaoTrabalho('');
        }
    }
    
    function validaDescanso(numero) {
        // code to remove non-numeric characters from text
        let removido = numero.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
        if (removido){
            setGuardaDuracaoDescanso(Number.parseInt(removido));
            if (removido < 1) {
                setGuardaDuracaoDescanso('');
            }
        } else {
            setGuardaDuracaoDescanso(removido);
        }
    }
    
    function salvarPomodoro() {
        let i, i2 = 0;
        let novosIntervalos = [];
        for (i = 0; i <= (guardaQuantidadePomodoros-1); i++) {
            if (i == guardaQuantidadePomodoros - 1 || guardaQuantidadePomodoros == 1) { // caso não tenha descanso nesse pomodoro
                novosIntervalos.push(
                    {
                        id: i2,
                        duracao: guardaDuracaoTrabalho,
                        sossego: false,
                    }
                    )
            } else {
                novosIntervalos.push(
                    {
                        id: i2,
                        duracao: guardaDuracaoTrabalho,
                        sossego: false,
                    },
                    {
                        id: (i2+1),
                        duracao: guardaDuracaoDescanso,
                        sossego: true,
                    }
                    )
                i2 = i2 + 2;
            }
        }
        setIntervalos(novosIntervalos);
        setRunning(false);
        setPausado(false);
        setTextoBotao("Iniciar");
        setSegundos(0);
        setMinutos(guardaDuracaoTrabalho);
        setIterador(0);
        setTextoContagem("0:00");
        toggleModal();
        setData({ "duracaoTrabalho": guardaDuracaoTrabalho, "duracaoDescanso": guardaDuracaoDescanso, "quantidadePomodoros": guardaQuantidadePomodoros });
    }

    function validaPomodoros(numero) {
        // code to remove non-numeric characters from text
        let removido = numero.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
        if (removido){
            if (removido < 1) {
                setGuardaQuantidadePomodoros('');
            } else if (removido > 10) {
            } else {
                setGuardaQuantidadePomodoros(Number.parseInt(removido));
            }
        } else {
            setGuardaQuantidadePomodoros(removido);
        }
    }

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
                    <TouchableWithoutFeedback onPress={() => { setModalVisivel(false) }}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback>

                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.textoTituloModal}>Configurações</Text>
                            <View style={styles.campoModal}>
                                <Text style={styles.textoModal}>Trabalho:</Text>
                                <View style={styles.selecao}>
                                    <TouchableOpacity onPress={() => {if(guardaDuracaoTrabalho>1){setGuardaDuracaoTrabalho(Number.parseInt(guardaDuracaoTrabalho-1))}}} style={styles.quadradoMaisOuMenos}>
                                        <AntDesign name="caretleft" size={24} color="black" />
                                    </TouchableOpacity>
                                    <TextInput
                                        style={styles.input}
                                        textContentType="number"
                                        keyboardType="number-pad"
                                        maxLength={2}
                                        returnKeyType="done"
                                        textAlign="center"
                                        onChangeText={(numero) => validaTrabalho(numero)}
                                        value={guardaDuracaoTrabalho.toString()}
                                    />
                                    <TouchableOpacity onPress={() => {setGuardaDuracaoTrabalho(Number.parseInt(guardaDuracaoTrabalho+1))}} style={styles.quadradoMaisOuMenos}>
                                        <AntDesign name="caretright" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.campoModal}>
                                <Text style={styles.textoModal}>Descanso:</Text>
                                <View style={styles.selecao}>
                                    <TouchableOpacity onPress={() => {if(guardaDuracaoDescanso>1){setGuardaDuracaoDescanso(Number.parseInt(guardaDuracaoDescanso-1))}}} style={styles.quadradoMaisOuMenos}>
                                        <AntDesign name="caretleft" size={24} color="black" />
                                    </TouchableOpacity>
                                    <TextInput
                                        style={styles.input}
                                        textContentType="number"
                                        keyboardType="number-pad"
                                        maxLength={2}
                                        returnKeyType="done"
                                        textAlign="center"
                                        onChangeText={(numero) => validaDescanso(numero)}
                                        value={guardaDuracaoDescanso.toString()}
                                    />
                                    <TouchableOpacity onPress={() => {setGuardaDuracaoDescanso(Number.parseInt(guardaDuracaoDescanso+1))}} style={styles.quadradoMaisOuMenos}>
                                        <AntDesign name="caretright" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.campoModal}>
                                <Text style={styles.textoModal}>Pomodoros:</Text>
                                <View style={styles.selecao}>
                                    <TouchableOpacity onPress={() => {if(guardaQuantidadePomodoros>1){setGuardaQuantidadePomodoros(Number.parseInt(guardaQuantidadePomodoros-1))}}} style={styles.quadradoMaisOuMenos}>
                                        <AntDesign name="caretleft" size={24} color="black" />
                                    </TouchableOpacity>
                                    <TextInput
                                        style={styles.input}
                                        textContentType="number"
                                        keyboardType="number-pad"
                                        maxLength={2}
                                        returnKeyType="done"
                                        textAlign="center"
                                        onChangeText={(numero) => validaPomodoros(numero)}
                                        value={guardaQuantidadePomodoros.toString()}
                                    />
                                    <TouchableOpacity onPress={() => {if(guardaQuantidadePomodoros<10){setGuardaQuantidadePomodoros(Number.parseInt(guardaQuantidadePomodoros+1))}}} style={styles.quadradoMaisOuMenos}>
                                        <AntDesign name="caretright" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => salvarPomodoro()}>
                                <View style={styles.botaoModal}>
                                    <Text style={styles.textoBotaoModal}>Salvar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Animated.View
                    style={[
                        styles.visualizador,
                        {
                            backgroundColor: colorizador(),
                        }
                    ]}>
                    {/* <View style={{marginTop: "5%", borderRadius: 60, width: "90%", aspectRatio: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center"}}>
                        <View style={{borderRadius: 43, width: "83%", backgroundColor: "lime", aspectRatio: 1}}></View>
                    </View> */}
                    <Image source={gato} style={styles.imagem} />
                    <Text style={styles.textoContador}>{textoContagem}</Text>
                </Animated.View>
                <TouchableNativeFeedback onPress={() => toggleRelogio()} style={styles.botao}>
                    <Text style={styles.textoBotao}>{textoBotao}</Text>
                </TouchableNativeFeedback>
                <View style={styles.caminhoIndicador}>
                        <Animated.View
                            style={[
                                {
                                    marginLeft: posicionador()
                                }
                            ]}
                        >
                            <Image source={require("./img/gatoemoji.png")} style={styles.indicador} />
                        </Animated.View>
                </View>
                <TouchableOpacity onPress={() => toggleModal()} style={styles.flatlist}>
                    <FlatList
                        style={{borderRadius: 100, overflow: 'hidden'}}
                        contentContainerStyle={{borderRadius: 100, overflow: 'hidden'}}
                        horizontal
                        data={intervalos}
                        keyExtractor={item=>item.id}
                        renderItem={({item})=>
                            <View style={estilizador(item.id)}>
                                <Text style={styles.textoFlatlist}>{item.duracao}</Text>
                            </View>
                        }
                    />
                </TouchableOpacity>
                <StatusBar translucent backgroundColor={'#eae6da'}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eae6da',
        alignItems: "center",
    },
    visualizador: {
        marginTop: "10%",
        marginBottom: "10%",
        width: "80%",
        maxHeight: 0.55*altura,
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingTop: "5%",
        // backgroundColor: "lime",
    },
    botao: {
        width: 0.8 * largura,
        aspectRatio: 4.7,
        borderRadius: 10,
        backgroundColor: "#A4A4A4",
        justifyContent: "center",
        alignItems: "center",
    },
    textoBotao: {
        fontFamily: 'Roboto-Light',
        fontSize: 40,
        color: "#363636",
    },
    flatlist: {
        marginBottom: 0.06*altura,
        width: 0.8*largura,
        height: "6%",
        overflow: 'hidden',
    },
    textoFlatlist: {
        fontFamily: 'Roboto-Light',
        fontSize: 20,
    },
    caminhoIndicador: {
        marginTop: "5%",
        width: (0.8*largura+0.04*altura),
        height: 0.04*altura,
        // backgroundColor: "blue",
    },
    indicador: {
        height: "100%",
        width: null,
        aspectRatio: 1,
    },
    textoContador: {
        fontFamily: 'Roboto-Light',
        fontSize: 60,
        color: "#363636",
        marginBottom: "10%"
    },
    imagem: {
        width: "75%",
        height: null,
        aspectRatio: 1,
        marginTop: "7%",
        marginBottom: "5%",
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
        marginTop: "7%",
        marginBottom: "5%",
        borderRadius: 40,
        width: "82%",
        height: null,
        aspectRatio: 6.12,
        backgroundColor: "#53A156",
        alignItems: "center",
        justifyContent: "center",
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
    textoModal: {
        fontFamily: 'Roboto-Light',
        fontSize: 20,
    },
    campoModal: {
        marginTop: "4%",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "77.5%",
        alignItems: "center",
    },
    selecao: {
        flexDirection: "row",
        borderWidth: 0.5,
        borderRadius: 3,
        overflow: "hidden",
        height: 0.05*altura,
    },
    quadradoMaisOuMenos: {
        aspectRatio: 1,
        backgroundColor: "#A4A4A4",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        aspectRatio: 1.2,
        fontFamily: 'Roboto-Light',
        fontSize: 23,
    },
});

export default telaPomodoro;