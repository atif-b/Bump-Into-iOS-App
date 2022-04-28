import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const InterestBoxProfile = ({interestText, ...rest}) => {
  return (
    <View style={styles.bubble} {...rest}>
      <Text style={styles.bubbleText}>{interestText}</Text>
    </View>
  );
};

export default InterestBoxProfile;

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: '#ffffff',
    padding: 10,
    margin: 1,
    borderRadius: 10,
  },
  bubbleText: {
    fontSize: 16,
  },
});
