import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./StartScreen.js";
import HomeScreen from "./HomeScreen.js";

const Stack = createStackNavigator();

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

let customFonts = {
	'robotoThin': require('./font/Roboto-Thin.ttf'),
};

export default class App extends React.Component {
	state = {
		fontsLoaded: false,
	};
	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}
	componentDidMount() {
		this._loadFontsAsync();
	}
	render() {
		if (this.state.fontsLoaded) {
			return (
				<NavigationContainer>
					<Stack.Navigator screenOptions={{headerShown: false}}>
						<Stack.Screen
							name="Start"
							component={StartScreen}
						/>
						<Stack.Screen
							name="Home"
							component={HomeScreen}
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