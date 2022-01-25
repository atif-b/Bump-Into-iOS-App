import React, {useContent, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Bump Into (Create logo)</Text>
      
      <FormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      

      <FormButton
        buttonTitle="Sign In"
        onPress={() => LoginCheck(email, password, navigation)} 
        //onPress={() => navigation.navigate('Home')}
      /> 

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};



const LoginCheck = (email, password, navigation) => {
  console.log("email: "+ email +" password: "+ password) 
  if (email == "" || password == ""){
    console.log("Please enter your email & password")
  } else {
    navigation.navigate('Home')
  }
  
}

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 180,
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    //fontFamily: 'Lato-Regular',
  },
});
