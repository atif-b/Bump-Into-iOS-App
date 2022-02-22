import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const Profile = ({navigation}) => {
  return (
    <View style={{
      // Try setting `flexDirection` to `"row"`.
      flexDirection: "column",
      flex: 1,
      
    }}>
      <View style={{flex: 0.5, backgroundColor: "grey", justifyContent: "flex-end"}}>
        <Text>Hi! </Text>
      </View>

      <View style={{flex: 2, backgroundColor: "white"}}>
        <Text>Profile</Text>
      </View>

      <View style={{
          flex: 1,width: 100,height: 100, borderRadius:50 ,backgroundColor: "orange", position: "absolute", top: 90, left: 20
        }}>
        <Text>Profile Pic </Text>
        <Image source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}/>
      </View>

    </View>

    
  );
};

export default Profile;
