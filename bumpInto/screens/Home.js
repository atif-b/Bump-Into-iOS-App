import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import {AuthContext} from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
import auth from '@react-native-firebase/auth';

export default function Home({navigation, route}) {
  const {user, logout} = useContext(AuthContext);

  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
      }}>
      <View
        style={{
          flex: 0.3,
          backgroundColor: 'grey',
          justifyContent: 'flex-end',
        }}>
        <Text>{route.param} </Text>
      </View>

      <View style={{flex: 2, backgroundColor: 'white'}}>
        <QRCode
          value="test!"
          color={'#2C8DDB'}
          backgroundColor={'white'}
          size={100}
          // logo={require('../../../embed_logo_file_path')} // or logo={{uri: base64logo}}
          logoMargin={2}
          logoSize={20}
          logoBorderRadius={10}
          logoBackgroundColor={'transparent'}
        />

        <Text> Welcome {user ? user.displayName : 'hi'} </Text>

        {/* <Button title="Log out" onPress={() => navigation.navigate('Login')} /> */}
        {/* <Button title="Log out" onPress={() => logout()} /> */}
        {/* <FormButton buttonTitle="Logout" onPress={() => logout()} /> */}
        <FormButton
          buttonTitle="Logout"
          onPress={() => LoadLogin(navigation, logout)}
        />

        {/* Title is what the button says. naviagation.naviagte must have stack.screen name (that is from stack.nav) */}
      </View>
    </View>
  );
}

const LoadLogin = (navigation, logout) => {
  logout();
};
