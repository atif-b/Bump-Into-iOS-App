import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const textStyle = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});

const BumpInto = () => {
  const x = 'bump app';
  console.log(x);

  return (
    <View style={[textStyle.center, {top: 100}]}>
      <Text>"Bump Into"</Text>
    </View>
  );
};

export default BumpInto;
