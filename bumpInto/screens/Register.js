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
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';

const Register = ({navigation, route}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const {register} = useContext(AuthContext);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const LoginCheck = (
    email,
    password,
    firstName,
    lastName,
    register,
    navigation,
  ) => {
    console.log('email: ' + email + ' password: ' + password);
    if (
      email == '' ||
      password == '' ||
      firstName == '' ||
      lastName == '' ||
      typeof email == 'undefined' ||
      typeof password == 'undefined' ||
      typeof firstName == 'undefined' ||
      typeof lastName == 'undefined'
    ) {
      // alert('Please do not leave any details blank');
      setModalText('Please fill all the fields!');
      toggleModal();
    } else {
      if (
        email.includes('@my.westminster.ac.uk') ||
        email.includes('@westminster.ac.uk')
      ) {
        // navigation.navigate('Home')
        register(email, password, firstName, lastName);
      } else {
        setModalText(
          'Please use your Westminster email (@my.westminster.ac.uk)',
        );
        toggleModal();
        // alert('Please use your Westminster email (@my.westminster.ac.uk)');
      }
    }
  };

  const LoadHome = (email, navigation) => {
    navigation.navigate('Home', {
      email: 'test',
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Create an account</Text>

      <FormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="University Email"
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
        labelValue={firstName}
        onChangeText={userFirstName => setFirstName(userFirstName)}
        placeholderText="First name"
      />

      <FormInput
        labelValue={lastName}
        onChangeText={userLastName => setLastName(userLastName)}
        placeholderText="Last name"
      />

      {/* <FormInput
        labelValue={confirmPassword}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      /> */}

      <FormButton
        buttonTitle="Register"
        // onPress={() => register(email, password)}
        onPress={() =>
          LoginCheck(email, password, firstName, lastName, register, navigation)
        }
      />

      <View style={styles.textPrivate}>
        <Text>By registering, you confirm that you accept our </Text>
        <TouchableOpacity
          onPress={() =>
            alert('Terms Clicked! (Think id need to link to a seperate page)')
          }>
          <Text style={{color: 'orange'}}>Terms of service</Text>
        </TouchableOpacity>
        <Text> and </Text>
        <Text style={{color: 'orange'}}>Privacy policy.</Text>
      </View>

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>Have an account? Sign in</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} backdropColor="grey">
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={require('../assets/icons/error.png')} />
          <Text style={{textAlign: 'center', fontSize: 20, padding: 6}}>
            {modalText}
          </Text>
          <Button title="Ok" onPress={toggleModal} />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 90,
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
    justifyContent: 'center',
  },
});
