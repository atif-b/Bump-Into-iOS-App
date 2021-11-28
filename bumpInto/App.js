import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

// Screens
import PreLogin from './screens/PreLogin';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';

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

function bInto({navigation}) {
  const BumpInto = () => {
    //const x = 'bump app';     /***** use this to debug in console *****/
    //console.log(x);

    return (
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
    );
  };
}

function homeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button title="to screen 2" onPress={() => navigation.navigate('s2')} />
    </View>
  );
}

function s2({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>s2</Text>
      <Button title="to screen 1" onPress={() => navigation.navigate('Home')} />
      {/* Title is what the button says. naviagation.naviagte must have stack.screen name (that is from stack.nav) */}
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PreLogin" component={homeScreen} />
        <Stack.Screen name="Login" component={s2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
