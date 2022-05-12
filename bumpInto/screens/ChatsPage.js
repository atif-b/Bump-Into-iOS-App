import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import {
  NavigationContainer,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

// // // // // // // TO DO // // // // // // //
// Need to make this scrollable
//
// // // // // // // // // // // // // // // //

const fName = 'null';
const friendId = 'null';
const friendPfp = 'null';

const ChatsPage = ({navigation, route}) => {
  const {user, logout} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  // const [friendId, setFriendId] = useState();
  const {fName, friendId, friendPfp} = route.params;
  //Pass clicked user id here create a param --> need to then reference this in the firestore below

  const routeUpdate = useRoute();

  useEffect(() => {
    console.log('friendName - ', fName);
    console.log('friendId - ', friendId);
    setMessages([]);

    const subscribe = firestore()
      .collection('chat')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == 'added') {
            let data: any = change.doc.data();
            if (
              (data.sentBy == user.uid && data.sentTo == friendId) ||
              (data.sentBy == friendId && data.sentTo == user.uid)
            ) {
              // console.log('created AT ***** ', data.createdAt.toDate());

              setMessages(prevMessages =>
                GiftedChat.append(prevMessages, data),
              );
              console.log('data ==? ', data);
            }
          }
        });
      });
    return () => subscribe();
  }, [routeUpdate]);

  const onSend = (messages: IMessage[]) => {
    const formatedDate = moment().format('MM-DD-YYYY HH:mm:ss');
    console.log('FORMATEDAWD AOWMPDO MAWPDOAMDWP OMAW ', formatedDate);

    console.log('user uid: ', user.uid, ' friendId ', friendId);
    const msg = messages[0];
    const msgEdit = {
      ...msg,
      sentBy: user.uid,
      sentTo: friendId,
      createdAt: formatedDate,
    };

    console.log('messages : ', msgEdit);

    const docId = Date.now().toString();
    firestore().collection('chat').doc(docId).set(msgEdit);
  };

  return (
    <View style={styles.chatContainer}>
      <View style={styles.chatHeader}>
        <Text style={{textAlign: 'center', fontSize: 22}}>{fName}</Text>
        <Image style={{left: 20, top: 100}} source={friendPfp} />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            size={25}
            name="arrow-back-outline"
            style={{left: 10, bottom: 27}}
          />
        </TouchableOpacity>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{_id: user.uid, avatar: friendPfp}}
      />
    </View>
  );
};

const LoadLogin = (navigation, logout) => {
  logout();
};

export default ChatsPage;

const styles = StyleSheet.create({
  chatHeader: {
    backgroundColor: '#f5f5f5',
    paddingTop: 60,
    height: 100,
    textAlign: 'center',
  },

  chatContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
