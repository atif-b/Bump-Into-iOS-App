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
      <Button title="cccc" onPress={() => navigation.navigate('s2')} />
    </View>
  );
}

function s2({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>s2</Text>
      <Button title="cccc" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={homeScreen} />
        <Stack.Screen name="s2" component={s2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
