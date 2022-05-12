import React, {useContext, useState} from 'react';
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
import {AuthContext} from '../navigation/AuthProvider';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login} = useContext(AuthContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={{height: 142, width: 142}}
        source={require('../assets/icons/bump.png')}
      />
      <Text style={styles.text}>Bump-Into </Text>

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
        onPress={() => login(email, password)}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.navButtonText}>
          Don't have an account? Create here
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    paddingTop: 120,
  },
  text: {
    fontSize: 42,
    marginBottom: 10,
    // color: '#051d5f',
    color: '#0e64e5',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 20,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
  },
});
