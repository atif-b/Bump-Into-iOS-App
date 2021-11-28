import React from 'react';
import { View, Text, Button, StyleSheet, Image} from "react-native";

import Onboarding from 'react-native-onboarding-swiper';

const PreLogin = ({navigation}) => {
  return{
    <Onboarding 
    pages={[
    {
      backgroundColor: '#fff',
      image: <Image source={require('../assets/connect.png')} />,
      title: 'PreLogin 1',
      subtitle: 'info 1',
    },
    {
      backgroundColor: '#555',
      image: <Image source={require('../assets/connect.png')} />,
      title: 'PreLogin 2',
      subtitle: 'info 2',
    },
    {
      backgroundColor: '#aaa',
      image: <Image source={require('../assets/connect.png')} />,
      title: 'PreLogin 3',
      subtitle: 'info 3',
    },
  ]}
/>
  
  }
}

export default PreLogin;
