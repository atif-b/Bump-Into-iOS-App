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

const Register = ({navigation, route}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  
  console.log("********");
  if (route.params?.test){
      console.log("yess");
      console.log(route.params?.test);
    } else {
      console.log("nope");
    }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Create an account</Text>
      
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

      <FormInput
        labelValue={confirmPassword}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />
      

      <FormButton
        buttonTitle="Register"
        // onPress={() => LoginCheck(email, password, navigation)} 
        onPress={() => navigation.navigate('Home', {check: "jfryferg"})}
      /> 

      <View style={styles.textPrivate}>
        <Text>By registering, you confirm that you accept our </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked! (Think id need to link to a seperate page)')}> 
          <Text style={{color: 'orange',}}>
            Terms of service
          </Text>
        </TouchableOpacity>  
        <Text> and </Text>
        <Text style={{color: 'orange',}}>
            Privacy policy.
          </Text>
      </View>

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>
          Have an acount? Sign in
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};



const LoginCheck = (email, password, navigation) => {
  console.log("email: "+ email +" password: "+ password) 
  if (email == "" || password == "" || (typeof email == "undefined") || (typeof password == "undefined")){
    console.log("Please enter your email & password")
  } else {
    // if (email.includes('@my.westminster.ac.uk') || email.includes('@westminster.ac.uk')){
    //   navigation.navigate('Home')
    // }
    //UNCOMMENT THIS CODE WHEN I NEED TO TEST WESTMINSTER EMAILS
    LoadHome(email, navigation)
    
  }
}

const LoadHome = (email, navigation) =>{
  navigation.navigate('Home', {
    email: 'test',
  });
};



export default Register;

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
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    //fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center'
  }
});
