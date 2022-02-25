import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log('[ROUTES.JS] subscriber: ' + subscriber);

    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  console.log('[ROUTES.JS] user: ' + user);
  console.log('[ROUTES.JS] initiualizing: ' + initializing);

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
      {/* {user == null ? <AuthStack /> : <AppStack />} */}
    </NavigationContainer>
  );
};

export default Routes;
