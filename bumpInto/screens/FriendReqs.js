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

var friendReqIdArray = ['null'];
var friendReqNameArray = ['null'];

const FriendReqs = ({route, navigation}) => {
  const {user, logout} = useContext(AuthContext);
  //   const [friendReqIds, setFriendReqIds] = useState(friendReqIdArray);
  const [refreshing, setRefreshing] = useState(false);
  const {friendReqIdArray, friendReqNameArray} = route.params;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    console.log('Refreshing data');
    getUserFriends();
    setRefreshing(false);
  });

  const getUserFriends = async () => {
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
            pos++;
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('====================================');
    getUserFriends();
  }, []);

  const getFriendReqIds = async friends => {
    var pos = 0;
    friends.forEach(f => {
      friendReqIdArray[pos] = f.id;
      pos++;
    });
  };

  const getFriendReq = async friendId => {
    const currentFriend = await firestore()
      .collection('users')
      .doc(friendId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('user data ', documentSnapshot.data());
          return documentSnapshot.data().firstName;
        }
      });
  };

  const navigateFriendReqProfile = friendId => {
    console.log('navigating to the profile page of ', friendId);
    navigation.navigate('ProfileUser', {friendId});
  };

  const navigateFriendReq = () => {
    navigation.navigate('FriendReqs');
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
            Friend Requests
          </Text>
        </View>

        <FriendsBox>
          {friendReqIdArray.map((reqName, index) => {
            console.log('loglog ', reqName);
            if (reqName != 'null') {
              const reqName = friendReqNameArray[index];
              return (
                <FriendsCard
                  key={reqName}
                  friendName={reqName}
                  friendPfp={require('../assets/testPFP.jpg')}
                  friendId={friendReqIdArray[index]}
                  onPress={() =>
                    navigateFriendReqProfile(friendReqIdArray[index])
                  }
                />
              );
            } else {
              if (friendReqNameArray.length == 1) {
                console.log('correct!');
                if (friendReqIdArray[0] == 'null') {
                  console.log('rect?');
                  return (
                    <Text key={'noF'} style={styles.noFText}>
                      No friend requests!
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

export default FriendReqs;

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
