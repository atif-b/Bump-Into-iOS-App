import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

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

export default BumpInto;
