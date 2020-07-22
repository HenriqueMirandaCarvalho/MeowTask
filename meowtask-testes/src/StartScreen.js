import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import icone from './img/icone.png';

class StartScreen extends React.Component {
	render() {
		return (
			<View style={styles.container}>
			<Image source={icone} style={{marginTop: 50, width: 300, height: 300,}}/>
				<TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={{marginTop: 30, width: 230, backgroundColor: '#5B5B58', borderWidth: 10, borderColor: '#5B5B58', borderRadius: 1, alignItems: 'center',}}>
					<Text style={{fontFamily: 'robotoThin', fontSize: 24, color: '#FFF',}}>Começar</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{marginTop: 10, width: 230, backgroundColor: '#5B5B58', borderWidth: 10, borderColor: '#5B5B58', borderRadius: 1, alignItems: 'center',}}>
					<Text style={{fontFamily: 'robotoThin', fontSize: 24, color: '#FFF',}}>Fazer Login</Text>
				</TouchableOpacity>
				<TouchableOpacity style={{marginTop: 10, marginBottom: 90, width: 230, backgroundColor: 'transparent', borderWidth: 10, borderColor: 'transparent', borderRadius: 1, alignItems: 'center',}}>
					<Text style={{fontFamily: 'robotoThin', fontSize: 18, color: '#5B5B58',}}>Continuar sem uma Conta</Text>
				</TouchableOpacity>
				<StatusBar translucent backgroundColor="#E6E2D6"/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#EAE6DA',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
});

export default ({ navigation }) => {
	return <StartScreen navigation={navigation}/>
}