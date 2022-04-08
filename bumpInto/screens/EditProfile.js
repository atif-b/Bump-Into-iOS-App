import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {EditView, PfpImage, BannerImage} from '../styles/EditProfileStyles';
import {AuthContext} from '../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';
import Clipboard from '@react-native-clipboard/clipboard';
import ImagePicker from 'react-native-image-crop-picker';

// // // // // // // TO DO // // // // // // //
// For now the images are clickable to change them
// Maybe make a button for change banner and change pfp
// Need to fix banner size and cropping
// // // // // // // // // // // // // // // //

const EditProfile = ({navigation}) => {
  const [image, setImage] = useState(require('../assets/testPFP.jpg'));
  const [imageB, setImageB] = useState(require('../assets/testPFP.jpg'));
  const {user, logout} = useContext(AuthContext);

  const choosePhotoFromLibraryPfp = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
      cropperCircleOverlay: true,
    })
      .then(image => {
        console.log(image.path);
        setImage({uri: image.path});
      })
      .catch(err => {
        console.log('error!!! ---- ' + err.toString());
      });
  };

  const choosePhotoFromLibraryBanner = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 130,
      cropping: true,
    })
      .then(image => {
        console.log(image.path);
        setImageB({uri: image.path});
      })
      .catch(err => {
        console.log('error!!! ---- ' + err.toString());
      });
  };

  return (
    <SafeAreaView style={styles.container}>
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
            Edit your profile
          </Text>
        </View>

        <EditView>
          <TouchableOpacity onPress={() => choosePhotoFromLibraryBanner()}>
            <BannerImage source={imageB} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => choosePhotoFromLibraryPfp()}>
            <PfpImage source={image} />
          </TouchableOpacity>
        </EditView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const copyToClipboard = () => {
  Clipboard.setString('#Taf1789');
  console.log(Clipboard.getString());
  alert('Coppied to clipboard!');
};

const choosePhotoFromLibary = () => {
  //console.warn('yea');
  ImagePicker.openPicker({
    width: 100,
    height: 100,
    cropping: true,
    cropperCircleOverlay: true,
  })
    .then(image => {
      console.log(image);
      setImage(require('../assets/icons/pfp.png'));
    })
    .catch(err => {
      console.log('error!!! ---- ' + err.toString());
    });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
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
