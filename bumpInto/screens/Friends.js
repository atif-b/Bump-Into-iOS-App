import React, {useContext, useEffect, useState, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  ScrollView,
  SafeAreaView,
  RefreshControl,
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
  FriendRequestBox,
} from '../styles/FriendsStyles';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import FriendsCard from '../components/FriendsCard';

var friendsIdArray = ['null'];
var friendsNameArray = ['null'];
var friendsPfpArray = ['null'];
var friendReqIdArray = ['null'];
var friendReqNameArray = ['null'];

const Friends = ({route, navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const {friendsNameArray, friendsPfpArray} = route.params;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    console.log('Refreshing data');
    getUserReqs();
    getUserFriends();
    setRefreshing(false);
  });

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
    console.log('====================================');
    console.log(friendsNameArray);
    console.log('====================================');
    getUserReqs();
    if (friendsIdArray == 'null') {
      getUserFriends();
    } else {
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

  const getUserReqs = async () => {
    console.log('getting doc id');
    var pos = 0;

    try {
      const userFriends = await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('friendReqs')
        .get()
        .then(querySnapshot => {
          getFriendReqIds(querySnapshot);

          querySnapshot.forEach(documentSnapshot => {
            //   console.log(documentSnapshot.id);
            friendReqIdArray[pos] = documentSnapshot.id;
            // console.log(documentSnapshot.data().name);
            friendReqNameArray[pos] = documentSnapshot.data().name;
            pos++;
          });
        });
    } catch (err) {
      console.log(err);
    }

    // setFriendReqIds(friendReqIdArray);
    // console.log('req ids', friendReqIds);
  };

  const getFriendReqIds = async friends => {
    var pos = 0;
    friends.forEach(f => {
      friendReqIdArray[pos] = f.id;
      pos++;
    });
  };

  const navigateFriendProfile = friendId => {
    console.log('navigating to the profile page of ', friendId);
    navigation.navigate('ProfileUser', {friendId});
  };

  const navigateFriendReq = () => {
    navigation.navigate('FriendReqs', {friendReqIdArray, friendReqNameArray});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
          <FriendRequestBox onPress={() => navigateFriendReq()}>
            <LinearGradient
              colors={[
                '#6D83FB',
                'rgba(94, 214, 163, 0.8)',
                'rgba(214, 242, 180, 0.5)',
                'rgba(248, 250, 185, 0.4)',
                'rgba(241, 78, 67, 0.2)',
              ]}
              style={styles.linearGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0.5}}
              style={styles.moduleColor}
              locations={[0.2, 0.4, 0.7, 0.8, 1]}>
              <Text style={{fontSize: 20, alignItems: 'center'}}>
                Friend Requests
              </Text>
            </LinearGradient>
          </FriendRequestBox>
          {friendsNameArray.map((fName, index) => {
            console.log('friendsName.map');

            if (fName != 'null' && fName != 'del') {
              console.log('fname ====== ', fName);
              return (
                <FriendsCard
                  key={fName}
                  friendName={fName}
                  friendPfp={require('../assets/testPFP.jpg')}
                  // friendPfp={require(friendsPfpArray[index])}
                  friendId={friendsIdArray[index]}
                  onPress={() => navigateFriendProfile(friendsIdArray[index])}
                />
              );
            } else {
              console.log('well.....');
              console.log(friendsIdArray);
              console.log('wells ize??, ', friendsNameArray.length);
              if (friendsNameArray.length == 1) {
                console.log('correct!');
                if (friendsIdArray[0] == 'null') {
                  console.log('rect?');
                  return (
                    <Text key={'noF'} style={styles.noFText}>
                      You havent added any friends yet!
                    </Text>
                  );
                }
              }
            }
          })}
        </FriendsBox>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Friends;

const styles = StyleSheet.create({
  moduleColor: {
    borderRadius: 7,
    borderWidth: 3,
    marginBottom: 10,
    padding: 20,
  },

  noFText: {
    backgroundColor: '#f3f3f3',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 60,
    margin: 20,
  },
});
