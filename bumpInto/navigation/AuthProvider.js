import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Keyboard,
  Image,
} from 'react-native';

//This context is set by the register screen and used below
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleReg, setModalVisibleReg] = useState(false);
  const [modalText, setModalText] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalReg = () => {
    setModalVisibleReg(!isModalVisibleReg);
  };

  // const navigation = useNavigation();

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log('here is issue ', e);
            setModalText('Incorrect email and/or password entered!');
            toggleModal();
          }
        },
        register: async (email, password, firstName, lastName) => {
          const update = {
            displayName: firstName + ' ' + lastName,
          };

          try {
            await auth().createUserWithEmailAndPassword(email, password);

            firestore()
              .collection('users')
              .doc(auth().currentUser.uid)
              .set({
                banner: 'null',
                email: email,
                firstName: firstName,
                lastName: lastName,
                pfp: '../assets/icons/pfp.png',
                interests: [
                  'null',
                  'null',
                  'null',
                  'null',
                  'null',
                  'null',
                  'null',
                  'null',
                  'null',
                  'null',
                ],
                modules: ['module1', 'module2', 'module3'],
                socials: ['insta', 'discord', 'email'],
                about: 'About you.',
              })
              .then(() => {
                console.log('firestore for user created');
              });

            await auth().currentUser.updateProfile(update);
            // await auth().currentUser.sendEmailVerification();
            // Need to delete my uni email from the auth + data storen
          } catch (e) {
            console.log('error: ', e);
            setModalText('This email is already registered! Please login.');
            toggleModal();
          }
        },
        logout: async () => {
          try {
            await auth()
              .signOut()
              .then(() => console.log('User Signed out!'));
          } catch (e) {
            console.log('Error while logging out: ' + e);
          }
        },
      }}>
      {children}

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
    </AuthContext.Provider>
  );
};
