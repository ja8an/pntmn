import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import AnswersScreen from './pages/answers';
import LoginScreen from './pages/login';
import AuthScreen from './pages/auth';
import HomeScreen from './pages/home';
import { AppRegistry } from 'react-native';
import CreateAccountScreen from './pages/create-account';
import QuestionFormScreen from './pages/question-form';
import { Services } from './shared/background-tasks';

const AppStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Questions: {
    screen: QuestionFormScreen
  },
  Answers: {
    screen: AnswersScreen,
    navigationOptions: {
      header: null
    }
  }
});

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  NewAccount: {
    screen: CreateAccountScreen,
    navigationOptions: {
      headerBackTitle: 'Entrar',
      headerTransparent: true,
      gesturesEnabled: false
    }
  }
});

Services.initialize();

const App = createAppContainer(
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