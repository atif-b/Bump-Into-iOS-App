import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import PreLogin from './screens/PreLogin';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Profile from './screens/Profile';

import Tabs from './navigation/BottomTab';



// const styles = StyleSheet.create({
//   center: {
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'center',
//   },

//   red: {
//     color: 'red',
//   },

//   buttonCtn: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },

//   button: {
//     backgroundColor: '#4abc93',
//     padding: 10,
//     width: '45%',
//   },

//   buttonTxt: {
//     color: 'white',
//   },
// });

const Stack = createNativeStackNavigator();

// function bInto({navigation}) {
//   const BumpInto = () => {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.red}>"Bump Into"</Text>
//         <View style={styles.buttonCtn}>
//           <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonTxt}>Login</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonTxt}>Signup</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };
// }

const App = () => {
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
