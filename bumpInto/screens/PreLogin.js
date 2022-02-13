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
      onSkip={() => navigation.replace('Login', {test: 'atif'})}
      onDone={() => navigation.navigate('Login', {test: 'atif'})}
      pages={[
        {
          backgroundColor: '#4ABC93',
          image: <Image source={require('../assets/connect.png')} />,
          title: 'Bump Into',
          subtitle: 'Add or message peers you pass in your university campus',
        },
        {
          backgroundColor: '#F55D3E',
          image: <Image source={require('../assets/connect.png')} />,
          title: 'Create your profile',
          subtitle: 'Share as much (or as little) as you want about yourself!',
        },
        {
          backgroundColor: '#47AD8D',
          image: <Image source={require('../assets/connect.png')} />,
          title: 'QR sharing',
          subtitle: 'Quickly share your profile through your own QR code',
        },
        {
          backgroundColor: '#F55F24',
          image: <Image source={require('../assets/connect.png')} />,
          title: 'QR chat rooms',
          subtitle: 'See a QR chat room code on campus? Scan it to join a virtual chat room for that social area!',
        },
      ]}
    />
  );
};

export default PreLogin;
