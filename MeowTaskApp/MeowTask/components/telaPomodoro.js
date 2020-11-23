import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar, Dimensions, Image } from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { TouchableNativeFeedback } from "react-native-gesture-handler";

const largura = Dimensions.get('window').width;
const altura = Dimensions.get('window').height;

const telaNotificacoes = (props) => {

    const [textoContagem, setTextoContagem] = useState("0:00");
    const [textoBotao, setTextoBotao] = useState("Iniciar");
    const [segundos, setSegundos] = useState(10);
    const [minutos, setMinutos] = useState(0);
    const [running, setRunning] = useState(false);
    const [iterador, setIterador] = useState(0);
    

    let [fontsLoaded] = useFonts({
        'Roboto-Light': require('./font/Roboto-Light.ttf'),
        'Roboto-Regular': require('./font/Roboto-Regular.ttf'),
        'Merienda-Regular': require('./font/Merienda-Regular.ttf'),
    });

    const [intervalos, setIntervalos] = useState([
        {
            id: "0",
            duracao: 10,
            sossego: false,
        },
        {
            id: "1",
            duracao: 5,
            sossego: true,
        },
        {
            id: "2",
            duracao: 10,
            sossego: false,
        },
        {
            id: "3",
            duracao: 5,
            sossego: true,
        },
        {
            id: "4",
            duracao: 10,
            sossego: false,
        },
    ]);

    function contagemRegressiva() {
        if (running == true) {
            setSegundos(segundos => segundos - 1);
            console.debug(segundos);
            console.debug("iterador: "+iterador);
            if(segundos == 0) {
                setSegundos(59);
                setIterador(iterador + 1);
                if(minutos!=0){setMinutos(minutos => minutos - 1);}
                if(minutos==0){
                    if(iterador == intervalos.length - 1){
                        alert("sem tempo irmão");
                    } else {
                        
                        
                        setSegundos(0);
                        setMinutos(intervalos[iterador].duracao);
                    }
                }
            }
            setTextoContagem(minutos+":"+segundos);
        } else {
            console.debug("parado")
        }
    }

    function toggleRelogio() {
        setRunning(!running);
    }

    useEffect(() => {
        const intervalo = window.setInterval(() => contagemRegressiva(), 300);
        return () => {
            window.clearInterval(intervalo);
        };
    });

    function estilizador(id) {
        let somaDuracoes = 0;
        intervalos.forEach(item => {
            somaDuracoes += item.duracao;
        });
        let unidadeTamanho = (0.8*largura)/somaDuracoes;
        if (intervalos[id].sossego) {
            return ({
                width: (intervalos[id].duracao*unidadeTamanho),
                backgroundColor: "#22b14c",
                justifyContent: "center",
                alignItems: "center",
            })
        } else {
            return ({
                width: (intervalos[id].duracao*unidadeTamanho),
                backgroundColor: "#ed1c24",
                justifyContent: "center",
                alignItems: "center",
            })
        }
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.visualizador}>
                    <View style={{marginTop: "5%", borderRadius: 60, width: "90%", aspectRatio: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center"}}>
                        <View style={{borderRadius: 43, width: "83%", backgroundColor: "lime", aspectRatio: 1}}></View>
                    </View>
                    {/* <Image source={require("./img/gatoestudando.png")} style={styles.imagem} /> */}
                    <Text style={styles.textoContador}>{textoContagem}</Text>
                </View>
                <TouchableNativeFeedback onPress={() => toggleRelogio()} style={styles.botao}>
                    <Text style={styles.textoBotao}>{textoBotao}</Text>
                </TouchableNativeFeedback>
                <View style={styles.caminhoIndicador}>
                    <Image source={require("./img/menta.png")} style={styles.indicador} />
                </View>
                <View style={styles.flatlist}>
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
        alignItems: "center",
    },
    visualizador: {
        marginTop: "10%",
        marginBottom: "10%",
        width: "80%",
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingTop: "5%",
        // backgroundColor: "#C4C4C4",
        backgroundColor: "lime",
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
        height: "5%",
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
        width: "70%",
        height: null,
        aspectRatio: 1,
        marginBottom: "5%",
    }
});

export default telaNotificacoes;