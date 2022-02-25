import React, {useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {ProfileBox, SocialTab} from '../styles/ProfileStyles';
import {AuthContext} from '../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';

const Profile = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);

  return (
    <View
      style={{
        // Try setting `flexDirection` to `"row"`.
        flexDirection: 'column',
        flex: 1,
      }}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 3, backgroundColor: '#aba'}}>
          <Text>Background img</Text>
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
              <TouchableOpacity
                style={styles.touchOpac}
                onPress={() => {
                  alert('you clicked QR button');
                }}>
                <Image
                  style={{height: 30, width: 30}}
                  source={require('../assets/icons/qr-code.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchOpac}
                onPress={() => {
                  alert('you clicked bump button');
                }}>
                <Image
                  style={styles.bumpBtn}
                  source={require('../assets/icons/bump.png')}
                />
              </TouchableOpacity>
              {/* <Text style={styles.msgBtn}>Message</Text> */}
              <TouchableOpacity
                style={styles.touchOpac}
                onPress={() => {
                  alert('you clicked message button');
                }}>
                <Text style={styles.msgBtn}>Message</Text>
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
              <Text style={styles.moduleText}>Module1</Text>
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
              <Text style={styles.moduleText}>Module2</Text>
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
              <Text style={styles.moduleText}>Module3</Text>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.profileBody}>
          <ProfileBox>
            {/* <View style={[styles.profileAbout, styles.profileBox]}> */}
            <Text>About me</Text>
            {/* </View> */}
          </ProfileBox>

          <ProfileBox>
            {/* <View style={[styles.profileInterest, styles.profileBox]}> */}
            <Text>Interests</Text>
            {/* </View> */}
          </ProfileBox>

          <ProfileBox>
            {/* <View style={[styles.profileSocial, styles.profileBox]}> */}
            <Text>Socials</Text>
            <TouchableOpacity>
              {/* <View style={styles.socialTab}> */}
              <SocialTab>
                <Image
                  style={{height: 29, width: 40}}
                  source={require('../assets/icons/discord.png')}
                />

                <View
                  style={{
                    height: 30,
                    width: 1,
                    backgroundColor: '#f4f4f4',
                    marginLeft: 7,
                  }}></View>
                <Text style={styles.socialText}> #Taf1789 </Text>

                <Image
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: '#fefefe',
                    flexDirection: 'row-reverse',
                  }}
                  source={require('../assets/icons/copy24.png')}
                />
                {/* </View> */}
              </SocialTab>
            </TouchableOpacity>
            {/* </View> */}
          </ProfileBox>
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
        <Image
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
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

  // profileBox: {
  //   backgroundColor: '#e1e1e1',
  //   padding: 7,
  //   marginBottom: 10,
  // },

  profileAbout: {},

  profileSocial: {},

  // socialTab: {
  //   backgroundColor: '#404040',
  //   padding: 10,
  //   margin: 10,
  //   flexDirection: 'row',
  //   // flex: 1,
  //   alignItems: 'center',
  // },

  socialText: {
    color: '#fff',
    fontSize: 20,
    // flex: 1,
    // alignItems: 'center',
    // textAlign: 'center',
  },
});
