import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Picker } from 'react-native';

Number.prototype.pad = function(size) {
	var s = String(this);
	while (s.length < (size || 2)) {s = "0" + s;}
	return s;
}

export default class PomodoroModule extends React.Component {
	constructor () {
		super();
		this.state = {
			timeWork: 25*60,
			timeWait: 5*60,
			second: 0,
			minute: 0,
			secondReal: 0,
			actualScreen: 0,
			work: true,
		}
	}
	componentDidMount() {
		setInterval(() => {
			return this.setState((state, props) => {
				if(state.actualScreen == 1)
				{
					if (state.work)
					{
						return {
							work: state.secondReal==(state.timeWork-1)?false:true,
							secondReal: state.secondReal==(state.timeWork-1)?0:state.secondReal+1,
							second: state.secondReal==(state.timeWork-1)?0:(state.second==59?0:state.second+1),
							minute: state.secondReal==(state.timeWork-1)?0:(state.second==59?state.minute+1:state.minute),
						}
					}
					else
					{
						return {
							work: state.secondReal==(state.timeWait-1)?true:false,
							secondReal: state.secondReal==(state.timeWait-1)?0:state.secondReal+1,
							second: state.secondReal==(state.timeWait-1)?0:(state.second==59?0:state.second+1),
							minute: state.secondReal==(state.timeWait-1)?0:(state.second==59?state.minute+1:state.minute),
						}
					}
				}
			});
		}, 1000);
	}
	onTimeWorkChange = (value) => {
		this.setState({timeWork: value})
	}
	onTimeWaitChange = (value) => {
		this.setState({timeWait: value})
	}
	render() {
		switch (this.state.actualScreen) {
			case 1:
				return (
					<View style={styles.container}>
						<Text style={{marginBottom: 50, fontFamily: 'robotoThin', fontSize: 48, color: this.state.work?'#75B79E':'#6A8CAF',}}>{this.state.work?"Trabalho":"Descanso"}</Text>
						<Text style={{fontFamily: 'robotoThin', fontSize: 18, color: '#5B5B58',}}>{this.state.minute.pad(2)}:{this.state.second.pad(2)}</Text>
						<TouchableOpacity onPress={() => {this.state.actualScreen=0; this.forceUpdate();}} style={{marginTop: 30, width: 200, backgroundColor: '#F67280', borderWidth: 10, borderColor: '#F67280', borderRadius: 1, alignItems: 'center',}}>
							<Text style={{fontFamily: 'robotoThin', fontSize: 18, color: '#FFF',}}>Parar</Text>
						</TouchableOpacity>
						<StatusBar translucent backgroundColor="#E6E2D6"/>
					</View>
				);
				break;
		
			case 0:
				return (
					<View style={styles.container}>
						<View>
							<Text style={{fontFamily: 'robotoThin', fontSize: 18, color: '#5B5B58',}}>Tempo de Trabalho</Text>
							<Picker
								mode="dropdown"
								selectedValue={this.state.timeWork}
								style={{height: 40, width: 200, backgroundColor: '#DAD6CA', paddingHorizontal: 10,}}
								textStyle={{fontFamily: 'robotoThin', fontSize: 18, color: '#5B5B58',}}
								onValueChange={this.onTimeWorkChange.bind(this)}
							>
								<Picker.Item label="5" value="300"/>
								<Picker.Item label="10" value="600"/>
								<Picker.Item label="15" value="900"/>
								<Picker.Item label="20" value="1200"/>
								<Picker.Item label="25" value="1500"/>
								<Picker.Item label="30" value="1800"/>
								<Picker.Item label="35" value="2100"/>
								<Picker.Item label="40" value="2400"/>
								<Picker.Item label="45" value="2700"/>
								<Picker.Item label="50" value="3000"/>
							</Picker>
						</View>
						<View style={{marginTop: 20,}}>
							<Text style={{fontFamily: 'robotoThin', fontSize: 18, color: '#5B5B58',}}>Tempo de Descanso</Text>
							<Picker
								mode="dropdown"
								selectedValue={this.state.timeWait}
								style={{height: 40, width: 200, backgroundColor: '#DAD6CA', paddingHorizontal: 10,}}
								textStyle={{fontFamily: 'robotoThin', fontSize: 18, color: '#5B5B58',}}
								onValueChange={this.onTimeWaitChange.bind(this)}
							>
								<Picker.Item label="5" value="300"/>
								<Picker.Item label="10" value="600"/>
								<Picker.Item label="15" value="900"/>
								<Picker.Item label="20" value="1200"/>
								<Picker.Item label="25" value="1500"/>
								<Picker.Item label="30" value="1800"/>
								<Picker.Item label="35" value="2100"/>
								<Picker.Item label="40" value="2400"/>
								<Picker.Item label="45" value="2700"/>
								<Picker.Item label="50" value="3000"/>
							</Picker>
						</View>
						<TouchableOpacity onPress={() => {this.state.actualScreen=1;  this.forceUpdate(); this.state.second = this.state.secondReal = this.state.minute = 0;}} style={{marginTop: 30, width: 200, backgroundColor: '#5B5B58', borderWidth: 10, borderColor: '#5B5B58', borderRadius: 1, alignItems: 'center',}}>
							<Text style={{fontFamily: 'robotoThin', fontSize: 18, color: '#FFF',}}>Iniciar Cronômetro</Text>
						</TouchableOpacity>
						<StatusBar translucent backgroundColor="#E6E2D6"/>
					</View>
				);
				break;
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#EAE6DA',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
	},
});