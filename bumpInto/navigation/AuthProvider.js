import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
// import Providers from './index';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

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

            await auth().currentUser.updateProfile(update);
          } catch (e) {
            console.log(e);
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
    </AuthContext.Provider>
  );
};
