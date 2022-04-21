import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

// import Providers from './index';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
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
            console.log(e);
          }
        },
        register: async (email, password, firstName, lastName) => {
          const update = {
            displayName: firstName + ' ' + lastName,
          };

          try {
            await auth().createUserWithEmailAndPassword(email, password);

            firestore().collection('users').doc(auth().currentUser.uid).set({
              banner: 'null',
              email: email,
              firstName: firstName,
              lastName: lastName,
              pfp: '../assets/icons/pfp.png',
            });

            await auth().currentUser.updateProfile(update);
            // firestore()
            //   .collection('users')
            //   .doc(auth().currentUser.uid)
            //   .collection('profileDetails')
            //   .set({
            //     about: 'Say something about yourself',
            //     interests: ['coding', 'cooking'],
            //     modules: ['webdev', 'secfun', 'iosdev'],
            //     socials: ['instagram', 'discord', 'email'],
            //   });
          } catch (e) {
            console.log('error while creating firestore collection: ', e);
          }
        },
        logout: async () => {
          try {
            await auth()
              .signOut()
              .then(() => console.log('User Signed out!'));
            // .then(() => navigation.navigate('Login'));
          } catch (e) {
            console.log('Error while logging out: ' + e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
