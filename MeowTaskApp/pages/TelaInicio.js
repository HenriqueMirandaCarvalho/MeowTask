import React from 'react';
import { StatusBar, StyleSheet, View, ImageBackground, Button, Text } from 'react-native';
import CustomButton from './components/CustomButton';
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase({name: 'components/antares.db', createFromLocation: 'components/antares.db'});
export default class TelaInicio extends React.Component {
    componentDidMount() {
        StatusBar.setHidden(true);
    }
    constructor(props) {
      super(props)
  
      this.state = {
        firstaccess: 0,
      };
  
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM system WHERE systemid=?",[1],(tx, results) => {
          var row = results.rows.item(0);
          this.setState({firstaccess: row.firstaccess});
        });
      });
    }
    render() {
        const styles = StyleSheet.create({
            container: {
              flex: 1,
              flexDirection: "column"
            },
            image: {
              flex: 1,
              backgroundColor: '#eae6da',
              resizeMode: "cover",
              alignItems: "center"
            },
            button: {
                alignItems: 'center',
                backgroundColor: '#3ba3c5',
                borderRadius: 5,
                color: '#ffffff',
                padding: 10,
                marginTop: 450,
                marginLeft: 35,
                marginRight: 35,
            },
        });
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./img/icone.png')} style={styles.image}>
                    <CustomButton title='INICIAR' style={styles.button} customClick={() => console.log(this.state['firstaccess'])}/>
                </ImageBackground>
            </View>
        );
    }
}