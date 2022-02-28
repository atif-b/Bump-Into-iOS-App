import React, {useContext, useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack'; //
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Chats from '../screens/Chats';
import Friends from '../screens/Friends';
import ProfileUser from '../screens/ProfileUser';

import Tabs from './BottomTab';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Tabs}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Chats"
        component={Chats}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Friends"
        component={Friends}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ProfileUser"
        component={ProfileUser}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
