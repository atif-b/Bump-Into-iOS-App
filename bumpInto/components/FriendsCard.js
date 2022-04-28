import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
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

const FriendsCard = ({
  friendName,
  friendPfp,
  friendId,
  friendProfile,
  ...rest
}) => {
  return (
    <TouchableOpacity {...rest}>
      {/* // onPress={() => navigation.navigate('ChatsPage', {friendName, friendId})}> */}
      <FriendTile>
        {/* 10char is the max before formatting messes up */}
        <PfpView>
          <PfpImage source={friendPfp} />
        </PfpView>
        <TileTxtMain> {friendName} </TileTxtMain>
        <MessageIcon {...rest}>
          {/* // onPress={() => {
          //   alert('you clicked message button');
            
          // }}> */}
          <Image
            // style={styles.bumpBtn}
            source={require('../assets/icons/message.png')}
          />
        </MessageIcon>
      </FriendTile>
    </TouchableOpacity>
  );
};

export default FriendsCard;

// const styles = StyleSheet.create({

// });
