import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
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
      <View style={{
          flex: 1,
          width: 50,
          height: 50,
          positionBottom: 30,
          backgroundColor: "blue"}}>
        <Text>can you see?! </Text>
      </View>
      

      <View style={{flex: 2, backgroundColor: "white"}}>
        <Text>Profile</Text>
      </View>
    </View>
  );
};

export default Profile;
