import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import TelaInicio from './pages/TelaInicio';

const App = createStackNavigator({
  TelaInicio: {
    screen: TelaInicio,
    navigationOptions: {
      header: null
    },
  },
});

export default createAppContainer(App);