import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import GeneralStatusBar from './components/GeneralStatusBar.js';

export default StartScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<ImageBackground source={{ uri: "https://i.imgur.com/vqAVpGz.png", }} style={styles.bg}>
				<TouchableOpacity onPress={() => navigation.navigate('Home', {})} style={{marginTop: 400, width: 230, backgroundColor: '#5B5B58', borderWidth: 10, borderColor: '#5B5B58', borderRadius: 1, alignItems: 'center',}}>
					<Text style={{fontFamily: 'robotoThin', fontSize: 24, color: '#FFF',}}>Começar</Text>
				</TouchableOpacity>
				<TouchableOpacity style={{marginTop: 10, width: 230, backgroundColor: '#5B5B58', borderWidth: 10, borderColor: '#5B5B58', borderRadius: 1, alignItems: 'center',}}>
					<Text style={{fontFamily: 'robotoThin', fontSize: 24, color: '#FFF',}}>Fazer Login</Text>
				</TouchableOpacity>
				<TouchableOpacity style={{marginTop: 10, width: 230, backgroundColor: 'transparent', borderWidth: 10, borderColor: 'transparent', borderRadius: 1, alignItems: 'center',}}>
					<Text style={{fontFamily: 'robotoThin', fontSize: 18, color: '#5B5B58',}}>Continuar sem uma Conta</Text>
				</TouchableOpacity>
			</ImageBackground>
			<GeneralStatusBar/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#EAE6DA',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	bg: {
		flex: 1,
		resizeMode: 'stretch',
	},
});