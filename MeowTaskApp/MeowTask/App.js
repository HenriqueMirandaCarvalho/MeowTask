import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import telaInicio from './components/telaLista'; // eu vou mudar o lugar pra testar as telas ¯\_(ツ)_/¯
import telaLogin from './components/telaLogin';
import telaCadastro from './components/telaCadastro';
import telaListaGrupos from './components/telaListaGrupos';
import telaGrupo from './components/telaGrupo';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

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
		}
});

export default createAppContainer(RootStack);