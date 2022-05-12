import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  ScrollView,
  SafeAreaView,
  Switch,
} from 'react-native';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import {AuthContext} from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
import auth from '@react-native-firebase/auth';
import {SwitchBox, BumpedText, BumpedBox} from '../styles/BumpedStyles';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import BumpedCard from '../components/BumpedCard';
import GetLocation from 'react-native-get-location';

const Bumped = ({route, navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(false);
  //   const [friends, setFriends] = useState([]);
  //   const {friendsNameArray, friendsPfpArray} = route.params;

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    console.log('====================================');
  }, []);

  const navigateBumpedProfile = t => {
    // navigation.navigate('Profile');

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
      })
      .catch(err => {
        console.log(err);
      });
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
            flex: 0.5,
            backgroundColor: '#f4f4f4',
            justifyContent: 'flex-end',
          }}>
          <Text style={{fontSize: 24, padding: 15, paddingBottom: 15}}>
            Bumped
          </Text>
        </View>

        <SwitchBox>
          <BumpedText> BUMPED SWITCH </BumpedText>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </SwitchBox>
        <BumpedBox>
          <BumpedCard
            bumpName={'goofy ah'}
            // bumpPfp={}
            onPress={() => navigateBumpedProfile('t')}
          />
        </BumpedBox>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bumped;
