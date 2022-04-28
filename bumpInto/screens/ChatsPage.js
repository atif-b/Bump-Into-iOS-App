import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import {AuthContext} from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
import auth from '@react-native-firebase/auth';
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
import LinearGradient from 'react-native-linear-gradient';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

// // // // // // // TO DO // // // // // // //
// Need to make this scrollable
//
// // // // // // // // // // // // // // // //

const friendName = 'null';
const friendId = 'null';

const ChatsPage = ({navigation, route}) => {
  const {user, logout} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  // const [friendId, setFriendId] = useState();
  const {friendName, friendId} = route.params;
  //Pass clicked user id here create a param --> need to then reference this in the firestore below

  useEffect(() => {
    console.log('friendName - ', friendName);
    // const subscribe = firestore()
    //   .collection('users')
    //   .doc(user.uid)
    //   .collection('friends')
    //   .doc(friendId)
    //   .collection('chat')
    //   .onSnapshot(snapshot => {
    //     snapshot.docChanges().forEach(change => {
    //       if (change.type == 'added') {
    //         let data: any = change.doc.data();
    //         data.createAt = data.createdAt.toDate();
    //         setMessages(prevMessages => GiftedChat.append(prevMessages, data));
    //       }
    //     });
    //   });

    const subscribe = firestore()
      .collection('chat')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == 'added') {
            let data: any = change.doc.data();
            data.createAt = data.createdAt.toDate();
            setMessages(prevMessages => GiftedChat.append(prevMessages, data));
          }
        });
      });
    return () => subscribe();
  }, []);

  const onSend = (messages: IMessage[]) => {
    // for storing
    // firestore()
    //   .collection('users')
    //   .doc(user.uid)
    //   .collection('friends')
    //   .doc(friendId)
    //   .collection('chat')
    //   .doc(Date.now().toString())
    //   .set(messages[0]);
    //NAME OF PASSED VAR FOR FRIEND ID)

    firestore().collection('chat').doc(Date.now().toString()).set(messages[0]);
  };

  return (
    <View style={styles.chatContainer}>
      <View style={styles.moduleColor}>
        <Text style={{textAlign: 'center'}}>{friendName}</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{_id: user.uid}}
      />
    </View>
  );
};

const LoadLogin = (navigation, logout) => {
  logout();
};

export default ChatsPage;

const styles = StyleSheet.create({
  moduleColor: {
    backgroundColor: '#f5f5f5',
    paddingTop: 55,
    height: 100,
    textAlign: 'center',
  },

  chatContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
