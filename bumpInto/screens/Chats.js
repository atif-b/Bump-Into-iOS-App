import React, {useContext} from 'react';
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
} from '../styles/ChatsStyles';
import LinearGradient from 'react-native-linear-gradient';

export default function Chats({navigation, route}) {
  const {user, logout} = useContext(AuthContext);

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
          Messages
        </Text>
      </View>

      <ChatBox>
        <TouchableOpacity>
          <ChatTileUnread>
            <TileTxtMain> Tom </TileTxtMain>
            <TileTxtSub> 3 new messages </TileTxtSub>
            <PfpView>
              <PfpImage source={require('../assets/testPFP.jpg')} />
            </PfpView>
          </ChatTileUnread>
        </TouchableOpacity>

        <TouchableOpacity>
          <ChatTileUnread>
            <TileTxtMain> Sally </TileTxtMain>
            <TileTxtSub> 1 new messages </TileTxtSub>
            <PfpView>
              <PfpImage source={require('../assets/testPFP.jpg')} />
            </PfpView>
          </ChatTileUnread>
        </TouchableOpacity>

        <TouchableOpacity>
          <ChatTileRead>
            <TileTxtMain> Sam </TileTxtMain>
            <TileTxtSub> Nope not yet </TileTxtSub>
            <PfpView>
              <PfpImage source={require('../assets/testPFP.jpg')} />
            </PfpView>
          </ChatTileRead>
        </TouchableOpacity>
      </ChatBox>

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
    borderRadius: 7,
    marginRight: 2,
    borderWidth: 5,
    marginBottom: 10,
  },
});
