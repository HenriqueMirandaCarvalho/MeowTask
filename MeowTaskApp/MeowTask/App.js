import telaInicio from './components/telaInicio'; // eu vou mudar o lugar pra testar as telas ¯\_(ツ)_/¯
import telaLogin from './components/telaLogin';
import telaCadastro from './components/telaCadastro';
import telaHome from './components/telaHome';
import telaListaGrupos from './components/telaListaGrupos';
import telaGrupo from './components/telaGrupo';
import telaListaTarefas from './components/telaListaTarefas';
import telaPostIts from './components/telaPostIts';
import telaTarefa from './components/telaTarefa';
import telaAmigos from './components/telaAmigos';
import telaDescricao from './components/telaDescricao';
import telaArquivos from './components/telaArquivos';
import telaPostagens from './components/telaPostagens';
import telaLista from './components/telaLista';
import telaPomodoro from './components/telaPomodoro';
import telaConfiguracoes from './components/telaConfiguracoes';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as firebase from 'firebase';
require("firebase/firestore");

if (!firebase.apps.length) {
	var firebaseConfig = {
		apiKey: "AIzaSyApt9TUJkguD9IDJ2LmU4ReiqF06hPLH4o",
		authDomain: "meowtask-ea038.firebaseapp.com",
		databaseURL: "https://meowtask-ea038.firebaseio.com",
		projectId: "meowtask-ea038",
		storageBucket: "meowtask-ea038.appspot.com",
		messagingSenderId: "256053222242",
		appId: "1:256053222242:web:92e7b03603d6674e2d2a3b",
		measurementId: "G-FJH8MESQTJ"
	};
	firebase.initializeApp(firebaseConfig);
}

const RootStack = createStackNavigator({
		Inicio: {
			screen: telaInicio,
			navigationOptions: {
				headerShown: false,
			}
		},
		Login: {
			screen: telaLogin,
			navigationOptions: {
				headerShown: false,
			}
		},
		Cadastro: {
			screen: telaCadastro,
			navigationOptions: {
				headerShown: false,
			}
		},
		Home: {
			screen: telaHome,
			navigationOptions: {
				headerShown: false,
			}
		},
		ListaGrupos: {
			screen: telaListaGrupos,
			navigationOptions: {
				headerShown: false,
			}
		},
		Grupo: {
			screen: telaGrupo,
			navigationOptions: {
				headerShown: false,
			}
		},
		PostIts: {
			screen: telaPostIts,
			navigationOptions: {
				headerShown: false,
			}
		},
		ListaTarefas: {
			screen: telaListaTarefas,
			navigationOptions: {
				headerShown: false,
			}
		},
		Tarefa: {
			screen: telaTarefa,
			navigationOptions: {
				headerShown: false,
			}
		},
		Amigos: {
			screen: telaAmigos,
			navigationOptions: {
				headerShown: false,
			}
		},
		Descricao: {
			screen: telaDescricao,
			navigationOptions: {
				headerShown: false,
			}
		},
		Arquivos: {
			screen: telaArquivos,
			navigationOptions: {
				headerShown: false,
			}
		},
		Postagens: {
			screen: telaPostagens,
			navigationOptions: {
				headerShown: false,
			}
		},
		Lista: {
			screen: telaLista,
			navigationOptions: {
				headerShown: false,
			}
		},
		Pomodoro: {
			screen: telaPomodoro,
			navigationOptions: {
				headerShown: false,
			}
		},
		Configuracoes: {
			screen: telaConfiguracoes,
			navigationOptions: {
				headerShown: false,
			}
		},
}, {initialRouteName: 'Inicio',});

export default createAppContainer(RootStack);