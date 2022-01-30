import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
// import MainContainer from '@naviagation/MainContainer';

const Home = ({navigation}) => {
  return (
    <View style={{
      // Try setting `flexDirection` to `"row"`.
      flexDirection: "column",
      flex: 1,
      
    }}>
      <View style={{flex: 0.3, backgroundColor: "grey", justifyContent: "flex-end"}}>
        <Text>Hi! </Text>
      </View>

      <View style={{flex: 2, backgroundColor: "white"}}>
        
        <Button title="Log out" onPress={() => navigation.navigate('Login')} />
        {/* Title is what the button says. naviagation.naviagte must have stack.screen name (that is from stack.nav) */}
      </View>
    </View>
  );
};

export default Home;
