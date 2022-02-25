import 'react-native-gesture-handler'; //React navigation install doc says to have this at the top
import React, {useContext, useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import auth from '@react-native-firebase/auth';
import {AuthContext} from './navigation/AuthProvider';

// Screens
import PreLogin from './screens/PreLogin';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Profile from './screens/Profile';

import Tabs from './navigation/BottomTab';
import Providers from './navigation';

const Stack = createNativeStackNavigator();

const App = () => {
  return <Providers />;
};

export default App;
