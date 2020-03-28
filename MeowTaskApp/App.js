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

var db = SQLite.openDatabase({name: 'test.db', createFromLocation: 'pages/components/antares.db'});

export default class App extends React.Component {
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