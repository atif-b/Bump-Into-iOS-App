import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import {
  FriendsBox,
  FriendTile,
  TileTxtMain,
  TileTxtSub,
  PfpView,
  PfpImage,
  MessageIcon,
} from '../styles/FriendsStyles';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BumpedCard = ({bumpName, bumpPfp, bumpId, ...rest}) => {
  return (
    <TouchableOpacity {...rest}>
      <FriendTile>
        <PfpView>
          <PfpImage source={require('../assets/testPFP.jpg')} />
        </PfpView>
        <TileTxtMain> {bumpName} </TileTxtMain>
      </FriendTile>
    </TouchableOpacity>
  );
};

export default BumpedCard;
