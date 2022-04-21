import React, {useContext, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
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

// // // // // // // TO DO // // // // // // //
// Make this scrollable?? --> test app on different phones
// // // // // // // // // // // // // // // //

export default function Home({navigation, route}) {
  const {user, logout} = useContext(AuthContext);

  useEffect(() => {
    if (checkIfExists() != 1) {
      createProfileCol();
      console.log('creating');
    }
  }, []);

  const checkIfExists = () => {
    var exists = 0;

    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('profileDetails')
      .get()
      .then(sub => {
        if (sub.docs.length > 0) {
          console.log('exists');
          exists = 1;
        } else {
          console.log('doesnt exits');
        }
      });

    return exists;
  };

  const createProfileCol = () => {
    // firestore()
    //   .collection('users')
    //   .doc(user.uid)
    //   .collection('profileDetails')
    //   .set({
    //     about: 'Say something about yourself',
    //     interests: ['coding', 'cooking'],
    //     modules: ['webdev', 'secfun', 'iosdev'],
    //     socials: ['instagram', 'discord', 'email'],
    //   });
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
        <TouchableOpacity onPress={() => navigation.navigate('Chats')}>
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

        <TouchableOpacity onPress={() => navigation.navigate('Friends')}>
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
    </View>
  );
}

const LoadLogin = (navigation, logout) => {
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
