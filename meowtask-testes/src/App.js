import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./StartScreen.js";
import CadastroScreen from "./CadastroScreen.js";
import LoginScreen from "./LoginScreen.js";
import HomeScreen from "./HomeScreen.js";
import ConfigScreen from "./ConfigScreen.js";
import { AsyncStorage } from 'react-native';

/* Configurações */
import configContaScreen from "./configScreens/ContaScreen.js";

/* Firebase */
import ApiKeys from './constants/ApiKeys.js';
import * as firebase from 'firebase';

/* Modules */
import PomodoroModule from "./modules/Pomodoro/Pomodoro.mod.js";

const Stack = createStackNavigator();

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

let customFonts = {
	'robotoThin': require('./font/Roboto-Thin.ttf'),
	'meriendaRegular': require('./font/Merienda-Regular.ttf'),
};

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstScreen: 'Start',
			userLoaded: false,
			fontsLoaded: false,
		};

		// Iniciando firebase
		if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
	}
	async _loadFontsAsync() {
		await AsyncStorage.getItem("nickname").then((item) => {
			if (item) {
				if (item != '' && item != null)
				{
					this.setState({firstScreen: 'Home'});
				}
			}
		});
		this.setState({ userLoaded: true });
	}
	async _loadUserAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}
	componentDidMount() {
		this._loadFontsAsync();
		this._loadUserAsync();
	}
	render() {
		if (this.state.fontsLoaded && this.state.userLoaded) {
			return (
				<NavigationContainer>
					<Stack.Navigator initialRouteName={this.state.firstScreen} screenOptions={{headerShown: false}}>
						<Stack.Screen
							name="Start"
							component={StartScreen}
						/>
						<Stack.Screen
							name="Login"
							component={LoginScreen}
						/>
						<Stack.Screen
							name="Cadastro"
							component={CadastroScreen}
						/>
						<Stack.Screen
							name="Home"
							component={HomeScreen}
						/>
						<Stack.Screen
							name="Config"
							component={ConfigScreen}
						/>
						<Stack.Screen
							name="configConta"
							component={configContaScreen}
						/>
						<Stack.Screen
							name="PomodoroMod"
							component={PomodoroModule}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			);
		}
		else {
			return <AppLoading/>
		}
	}
}