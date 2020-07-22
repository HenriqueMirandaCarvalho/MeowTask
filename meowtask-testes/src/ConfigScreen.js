import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class ConfigScreen extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
                    <Text style={{fontFamily: 'meriendaRegular', fontSize: 36, color: '#5B5B58', margin: 20}}>Configurações</Text>
					<View style={{alignItems: 'center',}}><View style={{ backgroundColor: "#5B5B58", height: 2, width: 360 }}/></View>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('configConta')} style={{marginTop: 15, marginLeft: 25, marginBottom: 20, flexDirection: 'row',}}>
						<Icon name="user" size={24} color="#5B5B58" style={{marginRight: 10, paddingTop: 10, }}/>
                        <Text style={{paddingTop: 5,fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}>Conta</Text>
				        <View style={{width:40, height: 30, backgroundColor: 'transparent', position: 'absolute', right: 0, top: 5,}}>
					        <Icon name="angle-right" size={24} color="#5B5B58"/>
			        	</View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 0, marginLeft: 25, marginBottom: 20, flexDirection: 'row',}}>
						<Icon name="delicious" size={24} color="#5B5B58" style={{marginRight: 10, paddingTop: 10, }}/>
                        <Text style={{paddingTop: 5,fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}>Visual</Text>
				        <View style={{width:40, height: 30, backgroundColor: 'transparent', position: 'absolute', right: 0, top: 5,}}>
					        <Icon name="angle-right" size={24} color="#5B5B58"/>
			        	</View>
                    </TouchableOpacity>
					<View style={{alignItems: 'center',}}><View style={{ backgroundColor: "#5B5B58", height: 1, width: 350 }}/></View>
                    <TouchableOpacity style={{marginTop: 15, marginLeft: 25, marginBottom: 20, flexDirection: 'row',}}>
						<Icon name="bell" size={24} color="#5B5B58" style={{marginRight: 10, paddingTop: 10, }}/>
                        <Text style={{paddingTop: 5,fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}>Notificações</Text>
				        <View style={{width:40, height: 30, backgroundColor: 'transparent', position: 'absolute', right: 0, top: 5,}}>
					        <Icon name="angle-right" size={24} color="#5B5B58"/>
			        	</View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 0, marginLeft: 25, marginBottom: 20, flexDirection: 'row',}}>
						<Icon name="language" size={24} color="#5B5B58" style={{marginRight: 10, paddingTop: 10, }}/>
                        <Text style={{paddingTop: 5,fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}>Idioma e Texto</Text>
				        <View style={{width:40, height: 30, backgroundColor: 'transparent', position: 'absolute', right: 0, top: 5,}}>
					        <Icon name="angle-right" size={24} color="#5B5B58"/>
			        	</View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 0, marginLeft: 25, marginBottom: 20, flexDirection: 'row',}}>
						<Icon name="calendar" size={24} color="#5B5B58" style={{marginRight: 10, paddingTop: 10, }}/>
                        <Text style={{paddingTop: 5,fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}>Data e Hora</Text>
				        <View style={{width:40, height: 30, backgroundColor: 'transparent', position: 'absolute', right: 0, top: 5,}}>
					        <Icon name="angle-right" size={24} color="#5B5B58"/>
			        	</View>
                    </TouchableOpacity>
					<View style={{alignItems: 'center',}}><View style={{ backgroundColor: "#5B5B58", height: 1, width: 350 }}/></View>
                    <TouchableOpacity style={{marginTop: 15, marginLeft: 25, marginBottom: 20, flexDirection: 'row',}}>
						<Icon name="eye" size={24} color="#5B5B58" style={{marginRight: 10, paddingTop: 10, }}/>
                        <Text style={{paddingTop: 5,fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}>Acessibilidade</Text>
				        <View style={{width:40, height: 30, backgroundColor: 'transparent', position: 'absolute', right: 0, top: 5,}}>
					        <Icon name="angle-right" size={24} color="#5B5B58"/>
			        	</View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 0, marginLeft: 25, marginBottom: 20, flexDirection: 'row',}}>
						<Icon name="file-text-o" size={24} color="#5B5B58" style={{marginRight: 10, paddingTop: 10, }}/>
                        <Text style={{paddingTop: 5,fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}>Privacidade e Termos</Text>
				        <View style={{width:40, height: 30, backgroundColor: 'transparent', position: 'absolute', right: 0, top: 5,}}>
					        <Icon name="angle-right" size={24} color="#5B5B58"/>
			        	</View>
                    </TouchableOpacity>
					<View style={{alignItems: 'center',}}><View style={{ backgroundColor: "#5B5B58", height: 1, width: 350 }}/></View>
                    <TouchableOpacity style={{marginTop: 15, marginLeft: 25, marginBottom: 20, flexDirection: 'row',}}>
						<Icon name="info-circle" size={24} color="#5B5B58" style={{marginRight: 10, paddingTop: 10, }}/>
                        <Text style={{paddingTop: 5,fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}>Sobre o Meow Task</Text>
				        <View style={{width:40, height: 30, backgroundColor: 'transparent', position: 'absolute', right: 0, top: 5,}}>
					        <Icon name="angle-right" size={24} color="#5B5B58"/>
			        	</View>
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

export default ({navigation}) => {
    return <ConfigScreen navigation={navigation}/>
}