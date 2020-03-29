import React from 'react';
import { NavigationContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as SQLite from 'expo-sqlite';

import TelaInicio from './pages/TelaInicio';
import TelaTeste from './pages/TelaTeste';
import TelaHome from './pages/TelaHome';

const Stack = createStackNavigator({
  TelaInicio: {
    screen: TelaInicio,
    navigationOptions: {
      headerShown: false
    },
  },
  TelaHome: {
    screen: TelaHome,
    navigationOptions: {
      headerShown: false
    },
  },
  TelaTeste: {
    screen: TelaTeste,
    navigationOptions: {
      headerShown: false
    },
  }
},{
  initialRouteName: 'TelaInicio',
});

var db = SQLite.openDatabase({name: 'antares.db', location: 'default'});

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      firstaccess: 2,
    };

    db.transaction((tx) => {
      tx.executeSql("CREATE TABLE IF NOT EXISTS system (systemid INTEGER PRIMARY KEY NOT NULL, firstaccess INTEGER");
      tx.executeSql("INSERT INTO system VALUES (1,0)");
      tx.executeSql("SELECT * FROM system",[],(tx, results) => {
        var row = results.rows.item(0);
        this.setState({firstaccess: row.firstaccess});
      });
    });
  }
  render() {
    if (this.state['firstaccess'] == 0)
    {
      return (
        <TelaInicio/>
      );
    }
    else {
      return (
        <TelaHome/>
      );
    }
  }
}