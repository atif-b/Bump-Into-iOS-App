import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const Home = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>home</Text>
      <Button
        title="to screen 1"
        onPress={() => navigation.navigate('Login')}
      />
      {/* Title is what the button says. naviagation.naviagte must have stack.screen name (that is from stack.nav) */}
    </View>
  );
};
