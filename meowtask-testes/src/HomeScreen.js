import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import GeneralStatusBar from './components/GeneralStatusBar.js';

const list = ["1", "2", "3", "1", "2", "3"];

export default class StartScreen extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={{marginTop: 45, marginLeft: 25, marginBottom: 20, flexDirection: 'row',}}>
						<Image style={{width: 75, height: 75, backgroundColor: '#C4C4C4', borderRadius: 100,}}/>
						<View style={{flexDirection: 'column', marginLeft: 15,}}>
							<Text style={{fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}>___________</Text>
							<Text style={{fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}>___________</Text>
						</View>
					</View>
					<View style={{alignItems: 'center',}}><View style={{ backgroundColor: "#5B5B85", height: 1, width: 350 }}/></View>
					<View style={{marginTop: 25, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: "wrap"}}>
						{
							list.map(item => {
								return (
									<View style={{marginTop: 30, marginRight: 10, marginLeft: 10, flexDirection: 'column', alignItems: 'center',}}>
										<Image style={{width: 75, height: 75, backgroundColor: '#C4C4C4', borderRadius: 100,}}/>
										<Text style={{fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}>_______</Text>
									</View>
								);
							})
						}
					</View>
					<View style={{alignItems: 'center',}}><View style={{ backgroundColor: "#5B5B85", height: 1, width: 350 }}/></View>
					<View style={{marginTop: 45, marginBottom: 20, alignItems: 'center',}}>
						<Image style={{width: 100, height: 100, backgroundColor: '#C4C4C4', borderRadius: 100,}}/>
						<View style={{flexDirection: 'column', marginLeft: 15,}}>
							<Text style={{fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}>________________________________</Text>
							<Text style={{fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}>________________________________</Text>
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