import React from 'react';
import { View, Text } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './HomeScreen.js';
import Student from './Student.js';
import Admin from './Admin.js';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Student: {screen: Student},
  Admin: {screen: Admin},
});

const App = createAppContainer(MainNavigator);

export default App;