import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import {AuthContext} from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
import auth from '@react-native-firebase/auth';
import {
  FriendsBox,
  FriendTile,
  TileTxtMain,
  TileTxtSub,
  PfpView,
  PfpImage,
  MessageIcon,
} from '../styles/FriendsStyles';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import FriendsCard from '../components/FriendsCard';

var friendsIdArray = ['null'];

const Friends = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);

  const getUserFriends = async () => {
    console.log('getting doc id');
    var pos = 0;
    const userFriends = await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('friends')
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.size);

        getFriendIds(querySnapshot);

        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.id);
          friendsIdArray[pos] = documentSnapshot.id;
          pos++;
        });
      });
    console.log(friendsIdArray);
  };

  useEffect(() => {
    console.log('exc first?');
    getUserFriends();
  }, []);

  const getFriendIds = async friends => {
    var pos = 0;
    friends.forEach(f => {
      console.log('o yes ', f.id);
      friendsIdArray[pos] = f.id;
      pos++;
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{
          flexDirection: 'column',
          flex: 1,
        }}>
        <View
          style={{
            flex: 0.5,
            backgroundColor: '#f4f4f4',
            justifyContent: 'flex-end',
          }}>
          <Text style={{fontSize: 24, padding: 15, paddingBottom: 15}}>
            Friends
          </Text>
        </View>

        <FriendsBox>
          {friendsIdArray.map(fID => {
            if (fID != 'null') {
              return (
                <FriendsCard
                  key={fID}
                  friendName={fID}
                  friendPfp={require('../assets/testPFP.jpg')}
                  // onPress={() => removeInterestConf(inter)}
                />
              );
            } else {
              console.log('well.....');
              console.log(friendsIdArray);
            }
          })}

          <TouchableOpacity onPress={() => navigation.navigate('ProfileUser')}>
            <FriendTile>
              {/* 10char is the max before formatting messes up */}
              <PfpView>
                <PfpImage source={require('../assets/testPFP.jpg')} />
              </PfpView>
              <TileTxtMain> Sam </TileTxtMain>

              {/* that is used for spacing ^^ */}

              <MessageIcon
                onPress={() => {
                  alert('you clicked message button');
                }}>
                <Image source={require('../assets/icons/message.png')} />
              </MessageIcon>
            </FriendTile>
          </TouchableOpacity>

          <TouchableOpacity>
            <FriendTile>
              <PfpView>
                <PfpImage source={require('../assets/testPFP.jpg')} />
              </PfpView>
              <TileTxtMain> Atif </TileTxtMain>

              <MessageIcon
                onPress={() => {
                  alert('you clicked message button');
                }}>
                <Image source={require('../assets/icons/message.png')} />
              </MessageIcon>
            </FriendTile>
          </TouchableOpacity>

          <TouchableOpacity>
            <FriendTile>
              <TileTxtMain> Mo </TileTxtMain>
              {/* <TileTxtSub> </TileTxtSub> */}
              <MessageIcon
                onPress={() => {
                  alert('you clicked message button');
                }}>
                <Image source={require('../assets/icons/message.png')} />
              </MessageIcon>
              <PfpView>
                <PfpImage source={require('../assets/testPFP.jpg')} />
              </PfpView>
            </FriendTile>
          </TouchableOpacity>
        </FriendsBox>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Friends;

const styles = StyleSheet.create({
  moduleColor: {
    borderRadius: 7,
    marginRight: 2,
    borderWidth: 5,
    marginBottom: 10,
  },
});
