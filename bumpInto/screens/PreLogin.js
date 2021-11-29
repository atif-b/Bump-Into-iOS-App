import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import Onboarding from 'react-native-onboarding-swiper';
import Login from './Login';

const PreLogin = ({navigation}) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
      pages={[
        {
          backgroundColor: '#4ABC93',
          image: <Image source={require('../assets/connect.png')} />,
          title: 'PreLogin 1',
          subtitle: 'info 1',
        },
        {
          backgroundColor: '#F55D3E',
          image: <Image source={require('../assets/connect.png')} />,
          title: 'PreLogin 2',
          subtitle: 'info 2',
        },
        {
          backgroundColor: '#47AD8D',
          image: <Image source={require('../assets/connect.png')} />,
          title: 'PreLogin 3',
          subtitle: 'info 3',
        },
      ]}
    />
  );
};

export default PreLogin;
