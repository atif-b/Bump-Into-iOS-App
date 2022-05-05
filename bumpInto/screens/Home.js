import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Keyboard,
  Image,
} from 'react-native';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import {AuthContext} from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
import auth from '@react-native-firebase/auth';
import {HomeBox, HomeBtn, BtnTxt, LogoutBtn} from '../styles/HomeStyles';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

// // // // // // // TO DO // // // // // // //
//
// // // // // // // // // // // // // // // //

var friendsIdArray = ['null'];
var friendsNameArray = ['null'];
var friendsPfpArray = ['null'];

export default function Home({navigation, route}) {
  const {user, logout} = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);

  const getUserFriends = async () => {
    console.log('getting doc id');
    var pos = 0;
    const userFriends = await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('friends')
      .get()
      .then(querySnapshot => {
        console.log('q snap ', querySnapshot);

        getFriendIds(querySnapshot);

        testGet();

        async function testGet() {
          for (let i = 0; i < friendsIdArray.length; i++) {
            await getFriends(i, friendsIdArray[i]);
            console.log('names ', friendsNameArray);
            console.log('pfps ', friendsPfpArray);
          }
        }

        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.id == 'del') {
            console.log('Del user skipped');
          } else {
            friendsIdArray[pos] = documentSnapshot.id;
          }

          pos++;
        });
      });
    console.log(friendsIdArray);
  };

  useEffect(() => {
    console.log('ex first?');
    getUserFriends();
    if (friendsNameArray[0] == 'null') {
      createFriendsStore();
      toggleModal();
      // Put that somewhere where it will only run once, or only run
      // if parts of the profile remain as null?
    }
  }, []);

  const createFriendsStore = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('friends')
      .doc('del')
      .set({
        name: 'del',
      })
      .then(() => {
        console.log('friend created');
      });
  };

  const getFriendIds = async friends => {
    var pos = 0;
    friends.forEach(f => {
      if (f.id == 'del') {
        // skip over the 'del' so its not added to array
        console.log('Del user skipped');
        // removeDelData();
      } else {
        friendsIdArray[pos] = f.id;
      }
      pos++;
    });
  };

  const getFriends = async (counter, id) => {
    const currentFriend = await firestore()
      .collection('users')
      .doc(id)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          friendsNameArray[counter] = documentSnapshot.data().firstName;
          friendsPfpArray[counter] = documentSnapshot.data().pfp;
        }
      });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //////////NEED TO DO THE ABOVE, CHECK IF EXISTS, IF IT DOESNT THEN CALL CREATEPROFILE

  return (
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
          Hi {user ? user.displayName : 'user-logged-out'} !
        </Text>
      </View>

      <HomeBox>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Chats', {friendsNameArray, friendsPfpArray})
          }>
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
            <HomeBtn>
              <BtnTxt> View chats </BtnTxt>
            </HomeBtn>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ScanQR')}>
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
            <HomeBtn>
              <BtnTxt> Scan QR </BtnTxt>
            </HomeBtn>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity>
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
            <HomeBtn>
              <BtnTxt> Bumped </BtnTxt>
            </HomeBtn>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Friends', {friendsNameArray, friendsPfpArray})
          }>
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
            <HomeBtn>
              <BtnTxt> Friends </BtnTxt>
            </HomeBtn>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
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
            <HomeBtn>
              <BtnTxt> My Profile </BtnTxt>
            </HomeBtn>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => LoadLogin(navigation, logout)}>
          <LogoutBtn>Logout</LogoutBtn>
        </TouchableOpacity>
      </HomeBox>

      {/* <View style={{flex: 0.3, backgroundColor: '#f4f4f4'}}> */}
      {/* <QRCode
          value="test!"
          color={'#2C8DDB'}
          backgroundColor={'white'}
          size={100}
          // logo={require('../../../embed_logo_file_path')} // or logo={{uri: base64logo}}
          logoMargin={2}
          logoSize={20}
          logoBorderRadius={10}
          logoBackgroundColor={'transparent'}
        /> */}

      {/* <Button title="Log out" onPress={() => navigation.navigate('Login')} /> */}
      {/* <Button title="Log out" onPress={() => logout()} /> */}
      {/* <FormButton buttonTitle="Logout" onPress={() => logout()} /> */}
      {/* <TouchableOpacity
          buttonTitle="Logout"
          onPress={() => LoadLogin(navigation, logout)}>
          <LogoutBtn>Logout</LogoutBtn>
        </TouchableOpacity> */}

      {/* Title is what the button says. naviagation.naviagte must have stack.screen name (that is from stack.nav) */}
      {/* </View> */}

      <Modal isVisible={isModalVisible} backdropColor="grey">
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={require('../assets/icons/bulb.png')} />
          <Text style={{textAlign: 'center', fontSize: 20, padding: 6}}>
            Welcome to Bump-Into!
          </Text>
          <Text style={{textAlign: 'center', fontSize: 18, padding: 6}}>
            To make the most out of your account, go to your profile
            <Ionicons name="person-outline" size={20} />
            and edit it. You can add as much or as little about yourself.
          </Text>
          <Button title="Ok" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}

const LoadLogin = (navigation, logout) => {
  Keyboard.removeListener('keyboardWillShow');
  logout();
};

const styles = StyleSheet.create({
  moduleColor: {
    borderRadius: 14,
    marginRight: 2,
    borderWidth: 3,
    marginBottom: 10,
  },
});
