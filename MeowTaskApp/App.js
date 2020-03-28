import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import TelaInicio from './pages/TelaInicio';

const App = createStackNavigator({
  TelaInicio: {
    screen: TelaInicio,
    navigationOptions: {
      title: 'Tela Inicio',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff'
    },
  },
});

export default createAppContainer(App);