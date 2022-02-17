import React, { useContext, useState, useEffect } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import auth from '@react-native-firebase/auth'
import {AuthContext} from './navigation/AuthProvider';

// Screens
import PreLogin from './screens/PreLogin';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Profile from './screens/Profile';

import Tabs from './navigation/BottomTab';

const Stack = createNativeStackNavigator();

const App = () => {

  // const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // headerShown: false,
        }}>
        <Stack.Screen name="PreLogin" component={PreLogin} options={{headerShown: false,}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false,}} />
        <Stack.Screen name="Register" component={Register} options={({navigation}) => ({ 
          title: '',
          headerStyle: {
            backgroundColor: '#efefef',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerShadowVisible: false, // applied here
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack() }>
              <View>
              <Ionicons size={25} name="arrow-back-outline"></Ionicons>
              </View>
            </TouchableOpacity>
          )
        })} />
        <Stack.Screen name="Home" component={Tabs} options={{headerShown: false,}} />
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false,}} />

      </Stack.Navigator>
      {/* <Tabs /> */}
    </NavigationContainer>
  );
};

export default App;
