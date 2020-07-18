import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import GeneralStatusBar from './components/GeneralStatusBar.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

const list = ["1", "2", "3", "4", "5", "6"];


export default class StartScreen extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={{marginTop: 45, marginLeft: 25, marginBottom: 20, flexDirection: 'row',}}>
						<Image source={{ uri: "https://s2.glbimg.com/YKqb68IxCqdWGSq_wqaSVM2mn9k=/e.glbimg.com/og/ed/f/original/2018/02/26/macaco-narigudo.jpg", }} style={{width: 70, height: 70, backgroundColor: '#C4C4C4', borderRadius: 100,}}/>
						<View style={{flexDirection: 'column', marginLeft: 15,}}>
							<TouchableOpacity>
								<Text style={{fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}>Entrar</Text>
							</TouchableOpacity>
							<TouchableOpacity>
								<Text style={{fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}>Criar uma Conta</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={{alignItems: 'center',}}><View style={{ backgroundColor: "#5B5B85", height: 1, width: 350 }}/></View>
					<View style={{marginTop: 25, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: "wrap"}}>
						{
							list.map(item => {
								return (
									<View style={{marginTop: 30, marginRight: 10, marginLeft: 10, flexDirection: 'column', alignItems: 'center',}}>
										<Image source={{ uri: "https://tribunadejundiai.com.br/wp-content/uploads/2020/05/barbary-ape-3562358_1280-min.jpg", }} style={{width: 75, height: 75, backgroundColor: '#C4C4C4', borderRadius: 100,}}/>
										<Text style={{fontFamily: 'robotoThin', fontSize: 13, color: '#5B5B58',}}>Exemplo Módulo</Text>
									</View>
								);
							})
						}
					</View>
					<View style={{alignItems: 'center',}}><View style={{ backgroundColor: "#5B5B85", height: 1, width: 350 }}/></View>
					<View style={{marginTop: 45, marginBottom: 20, marginLeft: 25, alignItems: 'center', flexDirection: 'row',}}>
						<Image source={{ uri: "https://ichef.bbci.co.uk/news/ws/410/amz/worldservice/live/assets/images/2015/09/26/150926165742__85730600_monkey2.jpg", }} style={{width: 100, height: 100, backgroundColor: '#C4C4C4', borderRadius: 100,}}/>
						<View style={{flexDirection: 'column', marginLeft: 15, alignItems: 'center', width: 200,}}>
							<Text style={{fontFamily: 'robotoThin', fontSize: 15, color: '#5B5B58', textAlign: "justify",}}>O poder está dentro de você, na sua mente, pois se acreditar que consegue não haverá obstáculo capaz de impedir o seu sucesso.</Text>
						</View>
					</View>
				</ScrollView>
				<GeneralStatusBar/>
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
	},
	bg: {
		flex: 1,
		resizeMode: 'stretch',
	},
});