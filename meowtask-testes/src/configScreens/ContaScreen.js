import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, AsyncStorage, DevSettings } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ContaScreen extends React.Component {
    SairConta() {
        AsyncStorage.setItem('nickname', '');
        AsyncStorage.setItem('email', '');
        AsyncStorage.setItem('senha', '');
        DevSettings.reload();
    }
	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
                    <Text style={{fontFamily: 'meriendaRegular', fontSize: 36, color: '#5B5B58', margin: 20}}>Conta</Text>
					<View style={{alignItems: 'center',}}><View style={{ backgroundColor: "#5B5B58", height: 2, width: 360 }}/></View>
                    <TouchableOpacity onPress={() => this.SairConta()} style={{marginTop: 15, marginLeft: 25, marginBottom: 20, flexDirection: 'row',}}>
                        <Text style={{paddingTop: 5,fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}>Sair</Text>
                    </TouchableOpacity>
                </ScrollView>
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
        justifyContent: 'flex-start',
        marginTop: 24,
	},
});