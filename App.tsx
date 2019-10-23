import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import AnswersScreen from './pages/answers';
import LoginScreen from './pages/login';
import AuthScreen from './pages/auth';
import HomeScreen from './pages/home';
import { AppRegistry } from 'react-native';

const AppStack = createStackNavigator({ Home: HomeScreen, Answers: AnswersScreen });
const AuthStack = createStackNavigator({ Login: LoginScreen });

const App =  createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

AppRegistry.registerComponent('App', () => App);
export default App;