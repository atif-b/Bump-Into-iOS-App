import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import {
  ChatBox,
  ChatTileUnread,
  ChatTileRead,
  TileTxtMain,
  TileTxtSub,
  PfpImage,
  PfpView,
  ScrollView,
  SafeAreaView,
} from '../styles/ChatsStyles';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const MessagesCard = ({friendName, friendPfp, ...rest}) => {
  return (
    <TouchableOpacity {...rest}>
      <ChatTileUnread>
        <TileTxtMain> {friendName} </TileTxtMain>
        <TileTxtSub> 3 new messages </TileTxtSub>

        <PfpView>
          <PfpImage source={{uri: friendPfp}} />
        </PfpView>
      </ChatTileUnread>
    </TouchableOpacity>
  );
};

export default MessagesCard;

// const styles = StyleSheet.create({

// });
