import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'antares.db' });

import TelaInicio from './pages/TelaInicio';
import TelaTeste from './pages/TelaTeste';

db.transaction(function(txn) {
  txn.executeSql(
    "SELECT firstaccess FROM system WHERE systemid = 1",
    [],
    function (tx, res) {
      const rows = result.rows;
    }
  );
});

const App = createStackNavigator({
  TelaInicio: {
    screen: TelaInicio,
    navigationOptions: {
      header: null
    },
  },
  TelaTeste: {
    screen: TelaTeste,
    navigationOptions: {
      header: null
    },
  }
},{
  initialRouteName: 'TelaInicio',
});

export default createAppContainer(App);