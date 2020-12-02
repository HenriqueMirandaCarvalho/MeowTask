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
                            <Text style={styles.tituloTermos}>TERMOS DE SERVIÇO MEOW TASK</Text>
                            <Text style={styles.textoNegrito}>1. INTRODUÇÃO E ACEITAÇÃO DOS TERMOS</Text>
                            <Text style={styles.texto}>Bem-vindo (ou vinda) aos termos de serviço do Meow Task, que incluem neste ato incorporar a política e privacidade de nossos serviços em um um contrato jurídico entre a Meow Task mais suas coligadas (a "Empresa", "nós", "nosso(a)" e "conosco") e você ("você"). , em conjunto chamados de “Serviço”, você confirma (i) que tem 13 anos de idade e a idade mínima de consentimento digital em seu país, (ii) que, se tiver atingido a maioridade conforme as leis de seu local de residência, leu, compreendeu e aceitou se vincular aos Termos e (iii) que se tiver entre 13 (ou a idade mínima de consentimento digital, conforme aplicável) e o número correspondente à maioridade conforme as leis de seu local de residência, seus pais ou tutores analisaram e aceitaram estes Termos.</Text>
                            <Text style={styles.textoNegrito}>2. DIREITO DE USO DO SERVIÇO</Text>
                            <Text style={styles.texto}>O serviço oferece uma plataforma organizacional. O serviço pode permitir que você participe de salas de chat privadas utilize recursos de mensagem para se comunicar com outros usuários do Serviço. O Serviço também pode permitir que você acesse determinado software e/ou outro tipo de conteúdo disponibilizado para compra pela Companhia. Sujeito ao cumprimento destes Termos por você, a Empresa lhe concede uma licença limitada, revogável, não exclusiva, intransferível e não sublicenciável para usar e acessar o Serviço. Você concorda em não realizar ou tentar as seguintes ações: (i) usar o Serviço para outro fim que não seja expressamente permitido por estes Termos; (ii) copiar, adaptar, modificar, elaborar trabalhos derivados, distribuir, licenciar, vender, transferir, exibir publicamente, executar publicamente, transmitir por qualquer meio, tentar descobrir parte do código-fonte, fazer engenharia reversa, descompilar, desmontar ou explorar de alguma forma o Serviço ou parte dele, exceto de alguma forma expressamente permitida por estes Termos; ou (iii) usar mineração de dados, robôs, spiders ou outras ferramentas semelhantes de coleta e extração de dados no Serviço. Nenhuma licença ou direito é concedido a você implicitamente ou de outra forma consoante os direitos de propriedade intelectual pertencentes à Companhia ou a suas licenciadas, exceto as permissões e os direitos concedidos expressamente nestes Termos.</Text>
                            <Text style={styles.texto}>A Companhia se reserva o direito de modificar ou descontinuar o Serviço (ou parte dele) temporária ou permanentemente, com ou sem aviso prévio. A Companhia se reserva o direito de impedir o acesso de determinados usuários aos Serviços sem aviso prévio e por qualquer motivo, incluindo, dentre outros, violações destes Termos. Caso você viole estes Termos, a Companhia se reserva o direito de emitir um aviso em relação à violação ou encerrar ou suspender imediatamente uma ou todas as Contas que você tenha criado por meio do Serviço. Você aceita que a Companhia não precisa dar aviso prévio antes de cancelar ou suspender suas Contas, mas ela poderá fazer isso se desejar.</Text>
                            <Text style={styles.tituloTermos}>POLITICA E PRIVACIDADE MEOW TASK</Text>
                            <Text style={styles.textoNegrito}>1. LINKS PARA OUTROS SITES DA WEB</Text>
                            <Text style={styles.texto}>Essa Política de Privacidade não se aplica a links de terceiros compartilhados por meio de nosso aplicativo. Os links dos Serviços não significam que revisamos os sites de terceiros. Sugerimos entrar em contato com esses sites diretamente para obter informações sobre suas políticas de privacidade.</Text>
                            <Text style={styles.textoNegrito}>2. RETENÇÃO DE DADOS</Text>
                            <Text style={styles.texto}>Retemos dados pessoais para sempre para os fins aqui identificados. Os dados vão persistir em nosso banco de dados. Os nossos serviços não se responsabilizam pelo acesso em arquivos de terceiros, que ficam pela responsabilidade e segurança de quem escolheu baixa-lo.</Text>
                            <Text style={styles.texto}>Todos os dados, textos, imagens gráficas e sua seleção e disposição, além de outros materiais enviados para o Serviço por você, representam "Seu Conteúdo". Você declara e garante que Seu Conteúdo é original e que detém os direitos exclusivos sobre esse conteúdo, inclusive o direito de conceder todos os direitos e licenças definidos nestes Termos sem acarretar obrigações ou responsabilidade à Companhia pelo exercício de tais direitos e licenças. Tudo em Seu Conteúdo é de sua inteira responsabilidade, e a Companhia não será responsabilizada por nenhum material que você venha a carregar, publicar ou disponibilizar de alguma forma. Ao carregar, distribuir, transmitir ou utilizar Seu Conteúdo no Serviço, você nos concederá uma licença perpétua, não exclusiva, transferível, sublicenciável, livre de royalties e global para podermos usar, hospedar, reproduzir, modificar, adaptar, publicar, traduzir, criar trabalhos derivados, distribuir, executar e exibir Seu Conteúdo relativamente à operação e ao fornecimento do Serviço. A Companhia não garante a exatidão, a qualidade ou a integridade de conteúdo publicado por usuários. Ao usar o Serviço, você reconhece e aceita que poderá vir a ter contato com material que, no seu entender, seja ofensivo ou questionável. Você aceita que a Companhia não será responsabilizada por conteúdo de usuário sob nenhuma hipótese, incluindo, dentre outras, erros em conteúdo de usuário ou perdas e danos incorridos pelo uso de conteúdo de usuário. A Companhia se reserva o direito de remover e excluir permanentemente Seu Conteúdo do Serviço com ou sem aviso prévio e por qualquer motivo (ou sem motivo aparente). Armazenamos dados em seu dispositivo tais como login e configurações que permanecem até a desinstalação ou limpeza de dados ou cache.</Text>
                            <Text style={styles.textoNegrito}>3. SEGURANÇA</Text>
                            <Text style={styles.texto}>Tomamos medidas de segurança na verificação do e-mail para a validação da conta criada em nosso aplicativo, contamos com um criptografia nas senhas dos usuários para reforçar ainda mais a segurança delas. Em particular, o e-mail enviado para os Serviços pode não ser seguro. Portanto, você deve tomar cuidado especial ao decidir quais informações nos enviará por e-mail. Lembre-se disso ao divulgar qualquer informação pela Internet.</Text>
                            <Text style={styles.textoNegrito}>4. INFORMAÇÕES NÃO SOLICITADAS</Text>
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
                            <Text style={styles.textoNegrito}>5. Falhas no Sistema</Text>
                            <Text style={styles.texto}>Nossos Serviços não se responsabilizam por qualquer dano, prejuízo ou perdas sofridos pelo usuário em relação de falhas na internet, sistemas ou servidores utilizados pelo próprio usuário.</Text>
                            <Text style={styles.textoNegrito}>6. MODIFICAÇÕES DOS TERMOS E CONDIÇÕES GERAIS</Text>
                            <Text style={styles.texto}>O MeowTask pode alterar em qualquer momento estes Termos e condições, tendo em vista uma melhoria e evolução dos serviços que prestamos. Esses novos termos entrarão imediatamente em vigor, também sendo atualizados no aplicativo, caso o usuário não concorde com os termos atualizados, devera de imediato se comunicar com nossos serviços por e-mail no prazo de 7 dias. Nesse caso o vínculo contratual deixará de existir, desde que não haja contas em aberto ou outros problemas com os serviços. Não havendo manifestação no prazo estipulado, entender-se-á que o Usuário aceitou os novos Termos e condições gerais de uso e o contrato continuará vinculando as partes. As alterações não vigorarão em relação às negociações e anúncios já iniciados antes de sua publicação, permanecendo, nestes casos, vigente a redação anterior.</Text>
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