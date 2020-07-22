import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppLoading } from 'expo';

/* Modules */
import iconPomodoro from "./modules/Pomodoro/iconPomodoro.png";
const list = [
	["PomodoroMod", "Pomodoro", iconPomodoro],
];

class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nickname: '',
			userLoaded: false,
		}
	}
	async _getUserInfo() {
		await AsyncStorage.getItem("nickname").then((item) => {
			if (item) {
				this.setState({nickname: item});
			}
		});
		this.setState({ userLoaded: true });
	}
	componentDidMount() {
		this._getUserInfo();
	}
	render() {
		if (this.state.userLoaded) {
			if (this.state.nickname == '' || this.state.nickname == null)
			{
				return (
					<View style={styles.container}>
						<ScrollView>
							<View style={{marginTop: 45, marginLeft: 25, marginBottom: 20, flexDirection: 'row',}}>
								<Icon name="user" size={40} color="#5B5B58" style={{marginRight: 10, paddingTop: 10, }}/>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{marginTop: 10, width: 150, backgroundColor: '#5B5B58', borderWidth: 10, borderColor: '#5B5B58', borderRadius: 1, alignItems: 'center',}}>
									<Text style={{fontFamily: 'robotoThin', fontSize: 18, color: '#FFF',}}>Fazer Login</Text>
								</TouchableOpacity>
							</View>
							<View style={{alignItems: 'center',}}><View style={{ backgroundColor: "#5B5B58", height: 1, width: 350 }}/></View>
							<View style={{marginTop: 25, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: "wrap"}}>
								{
									list.map(item => {
										return (
											<View key={item[0]} style={{marginTop: 30, marginRight: 10, marginLeft: 10, flexDirection: 'column', alignItems: 'center',}}>
												<TouchableOpacity onPress={() => {this.props.navigation.navigate(item[0], {})}} style={{flexDirection: 'column', alignItems: 'center'}}>
													<Image source={item[2]} style={{width: 75, height: 75, backgroundColor: '#C4C4C4', borderRadius: 100,}}/>
													<Text style={{fontFamily: 'robotoThin', fontSize: 13, color: '#5B5B58',}}>{item[1]}</Text>
												</TouchableOpacity>
											</View>
										);
									})
								}
							</View>
							<View style={{alignItems: 'center',}}><View style={{ backgroundColor: "#5B5B58", height: 1, width: 350 }}/></View>
							<View style={{marginTop: 45, marginBottom: 20, marginLeft: 25, alignItems: 'center', flexDirection: 'row',}}>
								<Image source={{ uri: "https://ichef.bbci.co.uk/news/ws/410/amz/worldservice/live/assets/images/2015/09/26/150926165742__85730600_monkey2.jpg", }} style={{width: 100, height: 100, backgroundColor: '#C4C4C4', borderRadius: 100,}}/>
								<View style={{flexDirection: 'column', marginLeft: 15, alignItems: 'center', width: 200,}}>
									<Text style={{fontFamily: 'robotoThin', fontSize: 15, color: '#5B5B58', textAlign: "justify",}}>O poder está dentro de você, na sua mente, pois se acreditar que consegue não haverá obstáculo capaz de impedir o seu sucesso.</Text>
								</View>
							</View>
						</ScrollView>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('Config')} style={{width:40, height: 30, backgroundColor: 'transparent', position: 'absolute', right: 0, top: 35,}}>
							<Icon name="bars" size={28} color="#5B5B58"/>
						</TouchableOpacity>
						<StatusBar translucent backgroundColor="#E6E2D6"/>
					</View>
				);
			}
			else
			{
				return (
					<View style={styles.container}>
						<ScrollView>
							<View style={{marginTop: 45, marginLeft: 25, marginBottom: 20, flexDirection: 'row',}}>
								<Icon name="user" size={40} color="#5B5B58" style={{marginRight: 10, paddingTop: 10, }}/>
								<View style={{paddingTop: 5,}}>
									<Text style={{fontFamily: 'robotoThin', fontSize: 18, color: '#5B5B58',}}>Logado como:</Text>
									<Text style={{fontFamily: 'robotoThin', fontSize: 18, color: '#5B5B58',}}>{this.state.nickname}</Text>
								</View>
							</View>
							<View style={{alignItems: 'center',}}><View style={{ backgroundColor: "#5B5B58", height: 1, width: 350 }}/></View>
							<View style={{marginTop: 25, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: "wrap"}}>
								{
									list.map(item => {
										return (
											<View style={{marginTop: 30, marginRight: 10, marginLeft: 10, flexDirection: 'column', alignItems: 'center',}}>
												<TouchableOpacity onPress={() => {this.props.navigation.navigate(item[0], {})}} style={{flexDirection: 'column', alignItems: 'center'}}>
													<Image source={item[2]} style={{width: 75, height: 75, backgroundColor: '#C4C4C4', borderRadius: 100,}}/>
													<Text style={{fontFamily: 'robotoThin', fontSize: 13, color: '#5B5B58',}}>{item[1]}</Text>
												</TouchableOpacity>
											</View>
										);
									})
								}
							</View>
							<View style={{alignItems: 'center',}}><View style={{ backgroundColor: "#5B5B58", height: 1, width: 350 }}/></View>
							<View style={{marginTop: 45, marginBottom: 20, marginLeft: 25, alignItems: 'center', flexDirection: 'row',}}>
								<Image source={{ uri: "https://ichef.bbci.co.uk/news/ws/410/amz/worldservice/live/assets/images/2015/09/26/150926165742__85730600_monkey2.jpg", }} style={{width: 100, height: 100, backgroundColor: '#C4C4C4', borderRadius: 100,}}/>
								<View style={{flexDirection: 'column', marginLeft: 15, alignItems: 'center', width: 200,}}>
									<Text style={{fontFamily: 'robotoThin', fontSize: 15, color: '#5B5B58', textAlign: "justify",}}>O poder está dentro de você, na sua mente, pois se acreditar que consegue não haverá obstáculo capaz de impedir o seu sucesso.</Text>
								</View>
							</View>
						</ScrollView>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('Config')} style={{width:40, height: 30, backgroundColor: 'transparent', position: 'absolute', right: 0, top: 35,}}>
							<Icon name="bars" size={28} color="#5B5B58"/>
						</TouchableOpacity>
						<StatusBar translucent backgroundColor="#E6E2D6"/>
					</View>
				);
			}
		}
		else {
			return <AppLoading/>
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#EAE6DA',
		justifyContent: 'flex-start',
	},
});

export default ({navigation}) => {
	return <HomeScreen navigation={navigation}/>
}