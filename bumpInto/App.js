import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  red: {
    color: 'red',
  },

  buttonCtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    backgroundColor: '#4abc93',
    padding: 10,
    width: '45%',
  },

  buttonTxt: {
    color: 'white',
  },
});

const Stack = createNativeStackNavigator();

const BumpInto = () => {
  //const x = 'bump app';     /***** use this to debug in console *****/
  //console.log(x);

  return (
    <NavigationContainer>
      {/* <Stack.Navigator> */}
      {/* <Stack.Screen
       name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }} */}

      <View style={styles.center}>
        <Text style={styles.red}>"Bump Into"</Text>
        <View style={styles.buttonCtn}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTxt}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTxt}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </Stack.Navigator> */}
    </NavigationContainer>
  );
};

export default BumpInto;
