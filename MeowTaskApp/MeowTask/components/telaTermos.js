import React from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, StatusBar, Modal, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import * as firebase from 'firebase';

const telaTermos = (props) => {

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
                <View style={styles.cabecalho}>
                    <View style={styles.divSetinha}>
                        <TouchableNativeFeedback onPress={() => props.navigation.goBack()}>
                            <Ionicons name="md-arrow-back" size={40} color="#5b5b58" style={styles.setinha} />
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.divCabecalho}>
                        <Text style={styles.titulo}>Termos</Text>
                    </View>
                </View>
                <View style={styles.conteudo}>
                    <ScrollView style={{width: "100%"}}>
                        <View style={styles.divTexto}>
                            <Text style={styles.tituloTermos}>PRIVACIDADE E TERMOS</Text>
                            <Text style={styles.textoNegrito}>LINKS PARA OUTROS SITES DA WEB</Text>
                            <Text style={styles.texto}>Essa Política de Privacidade não se aplica a links de terceiros compartilhados por meio de nosso aplicativo. Os links dos Serviços não significam que revisamos os sites de terceiros. Sugerimos entrar em contato com esses sites diretamente para obter informações sobre suas políticas de privacidade.</Text>
                            <Text style={styles.textoNegrito}>RETENÇÃO DE DADOS</Text>
                            <Text style={styles.texto}>Retemos dados pessoais para sempre para os fins aqui identificados. Os dados vão persistir em nosso banco de dados. Os nossos serviços não se responsabilizam pelo acesso em arquivos de terceiros, que ficam pela responsabilidade e segurança de quem escolheu baixa-lo.</Text>
                            <Text style={styles.texto}>Todos os dados, textos, imagens gráficas e sua seleção e disposição, além de outros materiais enviados para o Serviço por você, representam "Seu Conteúdo". Você declara e garante que Seu Conteúdo é original e que detém os direitos exclusivos sobre esse conteúdo, inclusive o direito de conceder todos os direitos e licenças definidos nestes Termos sem acarretar obrigações ou responsabilidade à Companhia pelo exercício de tais direitos e licenças. Tudo em Seu Conteúdo é de sua inteira responsabilidade, e a Companhia não será responsabilizada por nenhum material que você venha a carregar, publicar ou disponibilizar de alguma forma. Ao carregar, distribuir, transmitir ou utilizar Seu Conteúdo no Serviço, você nos concederá uma licença perpétua, não exclusiva, transferível, sublicenciável, livre de royalties e global para podermos usar, hospedar, reproduzir, modificar, adaptar, publicar, traduzir, criar trabalhos derivados, distribuir, executar e exibir Seu Conteúdo relativamente à operação e ao fornecimento do Serviço. A Companhia não garante a exatidão, a qualidade ou a integridade de conteúdo publicado por usuários. Ao usar o Serviço, você reconhece e aceita que poderá vir a ter contato com material que, no seu entender, seja ofensivo ou questionável. Você aceita que a Companhia não será responsabilizada por conteúdo de usuário sob nenhuma hipótese, incluindo, dentre outras, erros em conteúdo de usuário ou perdas e danos incorridos pelo uso de conteúdo de usuário. A Companhia se reserva o direito de remover e excluir permanentemente Seu Conteúdo do Serviço com ou sem aviso prévio e por qualquer motivo (ou sem motivo aparente)."</Text>
                            <Text style={styles.textoNegrito}>SEGURANÇA</Text>
                            <Text style={styles.texto}>Tomamos medidas de segurança na verificação do e-mail para a validação da conta criada em nosso aplicativo, contamos com um criptografia nas senhas dos usuários para reforçar ainda mais a segurança delas. Em particular, o e-mail enviado para os Serviços pode não ser seguro. Portanto, você deve tomar cuidado especial ao decidir quais informações nos enviará por e-mail. Lembre-se disso ao divulgar qualquer informação pela Internet.</Text>
                            <Text style={styles.textoNegrito}>INFORMAÇÕES NÃO SOLICITADAS</Text>
                            <Text style={styles.texto}>Todos os links ou arquivos de terceiros, e outras informações não solicitadas que são postadas, baixadas, adquiridas, entre outras, serão consideradas fora de nossa responsabilidade.</Text>
                            <Text style={styles.texto}>O Serviço oferece canais de comunicação, como fóruns, comunidades ou áreas de chat ("Canais de Comunicação") criados para permitir que você se comunique com outros usuários do Serviço. A Companhia não tem a obrigação de monitorar esses canais de comunicação, mas poderá fazê-lo em relação à prestação do Serviço. A Companhia também poderá extinguir ou suspender seu acesso a qualquer Canal de Comunicação e a qualquer hora, sem aviso prévio e por qualquer motivo. Você reconhece que nenhum conteúdo de usuário (inclusive, por exemplo, chats, publicações ou materiais publicados por outras pessoas) nos Canais de Comunicação é endossado ou controlado por nós. A Companhia não será responsabilizada, em nenhuma circunstância, por atividades nos Canais de Comunicação. A Companhia não é responsável por informações que você optar por divulgar nos Canais de Comunicação ou pelas ações de outros usuários. Como condição de seu uso do Serviço, e sem limitação de suas outras obrigações consoante estes Termos, você concorda em obedecer às restrições e regras de uso estabelecidas nestes Termos e em nossas Diretrizes da comunidade, bem como a outras restrições e regras (como regras específicas do aplicativo) definidas no Serviço. Por exemplo, você aceita não utilizar o Serviço para:</Text>
                            <Text style={styles.texto}>• publicar, enviar, transmitir ou disseminar informações questionáveis, conforme estabelecido em nossas Diretrizes da comunidade;</Text>
                            <Text style={styles.texto}>• difamar, caluniar, ridicularizar, escarnecer, perseguir, ameaçar, assediar, intimidar ou abusar de alguém;</Text>
                            <Text style={styles.texto}>• ter conduta fraudulenta, ilegal ou de alguma forma nociva para o Discord ou qualquer outro usuário;</Text>
                            <Text style={styles.texto}>• enviar ou transmitir (ou tentar enviar ou transmitir) arquivos que contenham vírus, cavalos de Troia, worms, time bombs, cancelbots, arquivos ou dados corrompidos ou outros software ou programas, ou envolver-se em qualquer outra atividade que possa prejudicar o funcionamento do Serviço de outros usuários;</Text>
                            <Text style={styles.texto}>• violar o direito ao próprio corpo, direitos contratuais, de propriedade intelectual ou outros de terceiros, inclusive pelo uso, envio, transmissão, distribuição ou disponibilização de informações no Serviço de forma a violar direitos autorais, marcas comerciais, patentes, segredos comerciais ou outros direitos de terceiros (inclusive direito de privacidade ou de imagem);</Text>
                            <Text style={styles.texto}>• tentar obter senhas ou outras informações privadas de outros membros;</Text>
                            <Text style={styles.texto}>• violar a legislação pertinente, ou promover ou incentivar atividades ilícitas, incluindo, dentre outras, hacking, cracking ou distribuição de software contrabandeado, contas comprometidas ou cheats e hacks para o Serviço.</Text>
                            <Text style={styles.texto}>Essas regras de uso são apenas exemplificativas e nos reservamos o direito de determinar as condutas que consideramos violação aos Termos ou às Diretrizes da comunidade, ou uso impróprio do Serviço, além de tomar medidas que podem incluir o cancelamento de sua Conta e proibição de participar do Serviço.</Text>
                            <Text style={styles.textoNegrito}>Falhas no Sistema</Text>
                            <Text style={styles.texto}>Nossos Serviços não se responsabilizam por qualquer dano, prejuízo ou perdas sofridos pelo usuário em relação de falhas na internet, sistemas ou servidores utilizados pelo próprio usuário.</Text>
                        </View>
                    </ScrollView>
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
        flex: 1,
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
    divTexto: {
        width: "95%",
        paddingTop: "5%",
        alignSelf: "center",
    },
    tituloTermos: {
        fontFamily: 'Roboto-Regular',
        fontSize: 25,
        color: 'black',
        marginBottom: "3%",
    },
    textoNegrito: {
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        color: 'black',
    },
    texto: {
        fontFamily: 'Roboto-Light',
        fontSize: 17,
        color: 'black',
        textAlign: "justify",
    }
});

export default telaTermos;