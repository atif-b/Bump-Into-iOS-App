import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const Login = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Login</Text>
      <Button title="Log in" onPress={() => navigation.navigate('Home')} />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
      {/* Title is what the button says. naviagation.naviagte must have stack.screen name (that is from stack.nav) */}
    </View>
  );
};

export default Login;
