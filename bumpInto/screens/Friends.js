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
  FriendsBox,
  FriendTile,
  TileTxtMain,
  TileTxtSub,
  PfpView,
  PfpImage,
  MessageIcon,
} from '../styles/FriendsStyles';
import LinearGradient from 'react-native-linear-gradient';

export default function Freinds({navigation, route}) {
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
          Friends
        </Text>
      </View>

      <FriendsBox>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileUser')}>
          <FriendTile>
            {/* 10char is the max before formatting messes up */}
            <PfpView>
              <PfpImage source={require('../assets/testPFP.jpg')} />
            </PfpView>
            <TileTxtMain> Sam </TileTxtMain>
            <TileTxtSub> </TileTxtSub>

            <MessageIcon
              onPress={() => {
                alert('you clicked message button');
              }}>
              <Image
                style={styles.bumpBtn}
                source={require('../assets/icons/message.png')}
              />
            </MessageIcon>
          </FriendTile>
        </TouchableOpacity>

        <TouchableOpacity>
          <FriendTile>
            <TileTxtMain> Atif </TileTxtMain>
            <TileTxtSub> </TileTxtSub>
            <MessageIcon
              onPress={() => {
                alert('you clicked message button');
              }}>
              <Image
                style={styles.bumpBtn}
                source={require('../assets/icons/message.png')}
              />
            </MessageIcon>
            <PfpView>
              <PfpImage source={require('../assets/testPFP.jpg')} />
            </PfpView>
          </FriendTile>
        </TouchableOpacity>

        <TouchableOpacity>
          <FriendTile>
            <TileTxtMain> Mo </TileTxtMain>
            <TileTxtSub> </TileTxtSub>
            <MessageIcon
              onPress={() => {
                alert('you clicked message button');
              }}>
              <Image
                style={styles.bumpBtn}
                source={require('../assets/icons/message.png')}
              />
            </MessageIcon>
            <PfpView>
              <PfpImage source={require('../assets/testPFP.jpg')} />
            </PfpView>
          </FriendTile>
        </TouchableOpacity>
      </FriendsBox>
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
