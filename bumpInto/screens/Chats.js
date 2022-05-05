import React, {useContext, useEffect} from 'react';
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
import auth from '@react-native-firebase/auth';
import {
  ChatBox,
  ChatTileUnread,
  ChatTileRead,
  TileTxtMain,
  TileTxtSub,
  PfpImage,
  PfpView,
} from '../styles/ChatsStyles';
import firestore from '@react-native-firebase/firestore';
import MessagesCard from '../components/MessagesCard';

//Turn 'To Do' into ABOUT, to explain what the file does.

// // // // // // // TO DO // // // // // // //
// Need to make this scrollable
// Connect message buttons to base chat screen
// Need to only show messages for the logged in user
// Somehow define read/unread messages
// // // // // // // // // // // // // // // //

var friendsIdArray = ['null'];
var friendsNameArray = ['null'];
var friendsPfpArray = ['null'];
var counter = 0;

const Chats = ({route, navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const {friendsNameArray, friendsPfpArray} = route.params;

  useEffect(() => {
    counter = 0;
    console.log('====================================');
    console.log(friendsNameArray);
    console.log('====================================');
    // if (friendsIdArray == 'null') {
    //   getUserFriends();
    // } else {
    //   var counter = 0;
    //   for (let i = 0; i < friendsIdArray.length; i++) {
    //     friendsNameArray[i] = getFriends(friendsIdArray[i]);
    //   }
    //   console.log(friendsNameArray);
    // }
  }, []);

  const navigateChatPage = (fName, friendId) => {
    console.log('navigating to chats page with ', fName);
    navigation.navigate('ChatsPage', {fName, friendId});
  };

  return (
    //NEED TO MAKE THIS SCROLLABLE
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{
          flexDirection: 'column',
          flex: 1,
        }}>
        <View
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
              Messages
            </Text>
          </View>

          <ChatBox>
            {friendsNameArray.map(fName => {
              console.log('first log', friendsIdArray[counter]);
              console.log('second log', friendsNameArray[counter]);

              if (fName != 'null') {
                return (
                  <MessagesCard
                    key={fName}
                    friendName={fName}
                    friendPfp={require('../assets/testPFP.jpg')}
                    onPress={() =>
                      navigateChatPage(fName, friendsIdArray[counter])
                    }
                  />
                );
              } else {
                console.log('well.....');
                console.log(friendsIdArray);
                if (friendsNameArray.size < 1) {
                  return (
                    <Text key={'noF'} style={styles.noFText}>
                      You havent added any friends to message!
                    </Text>
                  );
                }
              }
              counter++;
            })}

            {/* <TouchableOpacity
              onPress={() => {
                alert('you clicked message button');
              }}>
              <ChatTileUnread>
                <TileTxtMain> Tom </TileTxtMain>
                <TileTxtSub> 3 new messages </TileTxtSub>
                <PfpView>
                  <PfpImage source={require('../assets/testPFP.jpg')} />
                </PfpView>
              </ChatTileUnread>
            </TouchableOpacity> */}
          </ChatBox>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Chats;

const LoadLogin = (navigation, logout) => {
  logout();
};

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
