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
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  BannerImage,
  ProfileBox,
  SocialTab,
  CopyIcon,
  LineSplit,
  SocialText,
  SocialTabTitle,
  AboutMeText,
  InterestBox,
  PfpImage,
} from '../styles/ProfileStyles';
import {AuthContext} from '../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';
import Clipboard from '@react-native-clipboard/clipboard';
import firestore from '@react-native-firebase/firestore';
import InterestBoxProfile from '../components/InterestBoxProfile';
import storage from '@react-native-firebase/storage';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg';

// // // // // // // TO DO // // // // // // //
// Bump button functionality
// Qr button functionality
// Decide if I still need module 'buttons'?
// Fix copy to clipboard
//
// Need to make useEffect to run each time the page is clicked on
// Maybe do an if statement to see if current 'imagePfp' matches the one
// that it 'got' from the db, if match do nothing else change pfp!
// // // // // // // // // // // // // // // //

var interestArray = [
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
];

var modulesArray = ['module1', 'module2', 'module3', ''];
var socialsArray = ['insta', 'discord', 'email'];
///the order the I designed is actually disc/email/insta

const Profile = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [imagePfp, setImagePfp] = useState(require('../assets/testPFP.jpg'));
  const [imageBanner, setImageBanner] = useState(
    require('../assets/testPFP.jpg'),
  );

  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const currentUser = await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('user data ', documentSnapshot.data());
          getInterests(documentSnapshot.data());
          setImagePfp(documentSnapshot.data().pfp);
          setImageBanner(documentSnapshot.data().banner);
          setUserData(documentSnapshot.data());
        }
      });
  };

  const getInterests = async allData => {
    try {
      for (let i = 0; i < allData.interests.length; i++) {
        interestArray[i] = allData.interests[i];
      }
    } catch (err) {
      console.log('Error fetching and assinging interests - ', err);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    console.log('Refreshing data');
    getUserData();
    setRefreshing(false);
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const copyToClipboard = async copyString => {
    await setCopiedText('copyString');
    Clipboard.setString('copiedText');
    alert('Coppied ' + copyString + ' to clipboard');
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{
        flexDirection: 'column',
        flex: 1,
      }}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View>
          <BannerImage source={imageBanner} />
        </View>

        <View style={styles.headerTile}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.headerTileMain]}>{user.displayName}</Text>
            <Text style={{color: '#efaffc'}}>3rd</Text>
            <View
              style={{
                flexDirection: 'row-reverse',
                textAlign: 'right',
                flex: 1,
                position: 'relative',
                marginTop: -70,
                alignItems: 'center',
              }}>
              {/* QR CODE */}
              <TouchableOpacity
                style={styles.touchOpac}
                onPress={() => {
                  toggleModal();
                }}>
                <Image
                  style={{height: 30, width: 30}}
                  source={require('../assets/icons/qr-code.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.touchOpac}
                onPress={() => {
                  navigation.navigate('EditProfile');
                }}>
                <Text style={styles.msgBtn}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[styles.headerTileSub]}>BSc Computer Science</Text>
          <View style={styles.moduleTextRow}>
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
              <Text style={styles.moduleText}>
                {userData ? userData.modules[0] : 'Module 1'}
              </Text>
            </LinearGradient>

            <LinearGradient
              colors={[
                '#E5A2A2',
                'rgba(232, 212, 163, 0.7)',
                'rgba(199, 234, 143, 0.6)',
                'rgba(60, 238, 174, 0.5)',
              ]}
              style={styles.linearGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0.5}}
              style={styles.moduleColor}
              locations={[0.2, 0.4, 0.7, 1]}>
              <Text style={styles.moduleText}>
                {userData ? userData.modules[1] : 'Module 2'}
              </Text>
            </LinearGradient>

            <LinearGradient
              colors={[
                '#3B79F2',
                'rgba(135, 92, 255, 0.7)',
                'rgba(235, 101, 246, 0.3)',
                'rgba(245, 10, 53, 0.5)',
              ]}
              style={styles.linearGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0.5}}
              style={styles.moduleColor}
              locations={[0.2, 0.4, 0.7, 1]}>
              <Text style={styles.moduleText}>
                {userData ? userData.modules[2] : 'Module 3'}
              </Text>
            </LinearGradient>

            <LinearGradient
              colors={[
                '#aab9F2',
                'rgba(135, 222, 255, 0.7)',
                'rgba(165, 231, 160, 0.3)',
                'rgba(20, 200, 100, 0.5)',
              ]}
              style={styles.linearGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0.5}}
              style={styles.moduleColor}
              locations={[0.2, 0.4, 0.7, 1]}>
              <Text style={styles.moduleText}>
                {userData ? userData.modules[3] : 'Module 4'}
              </Text>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.profileBody}>
          <ProfileBox>
            <SocialTabTitle>About me </SocialTabTitle>
            <AboutMeText>
              {userData ? userData.about : 'No about yet!'}
            </AboutMeText>
          </ProfileBox>

          <ProfileBox>
            <SocialTabTitle>Social</SocialTabTitle>
            <TouchableOpacity onPress={() => copyToClipboard(socialsArray[1])}>
              <SocialTab>
                <Image
                  style={{height: 29, width: 40}}
                  source={require('../assets/icons/discordB.png')}
                />

                <LineSplit />
                <SocialText>
                  {userData ? userData.socials[1] : 'No discord!'}
                </SocialText>

                <CopyIcon source={require('../assets/icons/copy60.png')} />
              </SocialTab>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => copyToClipboard(socialsArray[2])}>
              <SocialTab>
                <Image
                  style={{height: 29, width: 40}}
                  source={require('../assets/icons/email.png')}
                />

                <LineSplit />
                <SocialText style={{fontSize: 13, left: 5}}>
                  {userData ? userData.socials[2] : 'No email!'}
                </SocialText>

                <CopyIcon source={require('../assets/icons/copy60.png')} />
              </SocialTab>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => copyToClipboard(socialsArray[0])}>
              <SocialTab>
                <Image
                  style={{height: 29, width: 40}}
                  source={require('../assets/icons/instagram.png')}
                />

                <LineSplit />
                <SocialText>
                  {userData ? userData.socials[0] : 'No instagram!'}
                </SocialText>

                <CopyIcon source={require('../assets/icons/copy60.png')} />
              </SocialTab>
            </TouchableOpacity>
          </ProfileBox>

          <InterestBox>
            <SocialTabTitle>Interests</SocialTabTitle>
            {interestArray.map(inter => {
              if (inter != 'null') {
                return <InterestBoxProfile key={inter} interestText={inter} />;
              }
            })}
          </InterestBox>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: 'orange',
          position: 'absolute',
          top: 70,
          left: 20,
        }}>
        <PfpImage source={imagePfp} />
      </View>

      <Modal isVisible={isModalVisible} backdropColor="grey">
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
          }}>
          <Text style={{textAlign: 'center', fontSize: 20, padding: 6}}>
            This is your profile QR
          </Text>

          <QRCode
            value="test!"
            color={'#2C8DDB'}
            backgroundColor={'white'}
            size={100}
            // logo={require('../../../embed_logo_file_path')} // or logo={{uri: base64logo}}
            logoMargin={2}
            logoSize={20}
            logoBorderRadius={10}
            logoBackgroundColor={'transparent'}
          />

          <Button title="Ok" onPress={toggleModal} />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'pink',
    // marginHorizontal: 20,
  },

  headerTile: {
    backgroundColor: '#f5f5f5',
    paddingTop: 45,
    paddingLeft: 15,
    paddingBottom: 20,
    paddingRight: 5,
    flex: 2,
  },

  headerTileMain: {
    fontSize: 28,
  },

  headerTileSub: {
    fontSize: 16,
  },

  moduleTextRow: {
    flexDirection: 'row',
  },

  moduleText: {
    backgroundColor: 'transparent',
    padding: 5,
    margin: 1,
    borderRadius: 10,
  },

  moduleColor: {
    borderRadius: 7,
    marginRight: 2,
  },

  button: {
    // backgroundColor: '#859a9b',
    backgroundColor: '#fafafa',
    borderRadius: 18,
    padding: 5,
    marginBottom: 2,
    // shadowColor: '#303838',
    // shadowOffset: {width: 0, height: 5},
    // shadowRadius: 10,
    // shadowOpacity: 0.35,
    margin: 2,
  },

  msgBtn: {
    backgroundColor: '#404040',
    color: '#fff',
    padding: 5,
    margin: 2,
  },

  bumpBtn: {
    // backgroundColor: '#000',
    // tintColor: '#fff',
    padding: 5,
    margin: 2,
    height: 37,
    width: 37,
  },

  touchOpac: {
    backgroundColor: 'transparent',
    margin: 4,
  },

  profileBody: {
    flex: 10,
    backgroundColor: '#fff',
    padding: 20,
  },
});
