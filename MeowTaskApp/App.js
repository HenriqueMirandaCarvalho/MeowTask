import React from 'react';
import {AsyncStorage} from 'react-native';
import { NavigationContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ApiKeys from './constants/ApiKeys';
import * as firebase from 'firebase';

import TelaInicio from './pages/TelaInicio';
import TelaTeste from './pages/TelaTeste';
import TelaHome from './pages/TelaHome';
import { concat } from 'react-native-reanimated';

const Stack = createStackNavigator({
  TelaInicio: {
    screen: TelaInicio,
    navigationOptions: {
      headerShown: true
    },
  },
  TelaHome: {
    screen: TelaHome,
    navigationOptions: {
      headerShown: false
    },
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstAccess: false,
    }
    AsyncStorage.getItem('firstAccess', (err, result) => {
      if (result === null) {
        AsyncStorage.setItem('firstAccess', 'false');
      }
      AsyncStorage.getItem('firstAccess', (err, result) => { this.setState({firstAccess: result}); console.log(result); });
    });
  }
  render() {
    if (this.state.firstAccess == 'true')
    {
      return(
        <TelaHome/>
      );
    }
    else {
      return (
        <TelaInicio/>
      );
    }
  }
}