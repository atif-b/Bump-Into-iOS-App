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
var friendsNameArray = ['null'];
var friendsPfpArray = ['null'];
var counter = 0;

const Friends = ({route, navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const {friendsNameArray, friendsPfpArray} = route.params;

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
    counter = 0;
    console.log('====================================');
    console.log(friendsNameArray);
    console.log('====================================');
    if (friendsIdArray == 'null') {
      getUserFriends();
    } else {
      var counter = 0;
      for (let i = 0; i < friendsIdArray.length; i++) {
        friendsNameArray[i] = getFriends(friendsIdArray[i]);
      }
      console.log(friendsNameArray);
    }
  }, []);

  const getFriendIds = async friends => {
    var pos = 0;
    friends.forEach(f => {
      friendsIdArray[pos] = f.id;
      pos++;
    });
  };

  const getFriends = async friendId => {
    const currentFriend = await firestore()
      .collection('users')
      .doc(friendId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('user data ', documentSnapshot.data());
          return documentSnapshot.data().firstName;
          // getInterests(documentSnapshot.data());
          // setImagePfp(documentSnapshot.data().pfp);
          // setUserData(documentSnapshot.data());
        }
      });
  };

  // const navigateChatPage = (fName, friendId) => {
  //   console.log('navigating to chats page with ', fName);
  //   navigation.navigate('ChatsPage', {fName, friendId});
  // };

  const navigateFriendProfile = friendId => {
    console.log('navigating to the profile page of ', friendId);
    navigation.navigate('ProfileUser', {friendId});
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
          {friendsNameArray.map(fName => {
            console.log('friendsName.map');

            if (fName != 'null') {
              console.log('fname ====== ', fName);
              return (
                <FriendsCard
                  key={fName}
                  friendName={fName}
                  friendPfp={require('../assets/testPFP.jpg')}
                  friendId={friendsIdArray[counter]}
                  onPress={() => navigateFriendProfile(friendsIdArray[counter])}
                />
              );
            } else {
              console.log('well.....');
              console.log(friendsIdArray);
              if (friendsNameArray.size < 1) {
                return (
                  <Text key={'noF'} style={styles.noFText}>
                    You havent added any friends yet!
                  </Text>
                );
              }
            }
            counter++;
          })}

          {/* <TouchableOpacity onPress={() => navigation.navigate('ProfileUser')}>
            <FriendTile> */}
          {/* 10char is the max before formatting messes up */}
          {/* <PfpView>
                <PfpImage source={require('../assets/testPFP.jpg')} />
              </PfpView>
              <TileTxtMain> Sam </TileTxtMain>
              <MessageIcon
                onPress={() => {
                  alert('you clicked message button');
                }}>
                <Image source={require('../assets/icons/message.png')} />
              </MessageIcon>
            </FriendTile>
          </TouchableOpacity> */}
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

  noFText: {
    backgroundColor: '#f3f3f3',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 60,
    margin: 20,
  },
});
