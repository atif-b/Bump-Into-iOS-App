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

const Chats = ({route, navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const {friendsNameArray, friendsPfpArray, friendsIdArray} = route.params;

  useEffect(() => {
    counter = 0;
    console.log('====================================');
    console.log('friends names: ', friendsNameArray);
    console.log('friends ids: ', friendsIdArray);
    console.log('friends pfp: ', friendsPfpArray[1].uri);
    console.log('====================================');
  }, []);

  const navigateChatPage = (fName, friendId, friendPfp) => {
    console.log('navigating to chats page with ', fName, friendId, friendPfp);
    navigation.navigate('ChatsPage', {fName, friendId, friendPfp});
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
            {friendsIdArray.map((fID, index) => {
              const fNameTile = friendsNameArray[index];
              const fPfp = friendsPfpArray[index].uri;

              if (fID != 'null') {
                return (
                  <MessagesCard
                    key={fID}
                    friendName={fNameTile}
                    // friendPfp={require('../assets/testPFP.jpg')}
                    friendPfp={fPfp}
                    onPress={() => navigateChatPage(fNameTile, fID, fPfp)}
                  />
                );
              } else {
                if (friendsNameArray.length < 1) {
                  return (
                    <Text key={'noF'} style={styles.noFText}>
                      You havent added any friends to message!
                    </Text>
                  );
                }
              }
            })}
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
