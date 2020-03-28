import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import TelaInicio from './pages/TelaInicio';
import TelaTeste from './pages/TelaTeste';

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