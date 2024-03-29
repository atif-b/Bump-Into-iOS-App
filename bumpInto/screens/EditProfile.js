import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  TextField,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  EditView,
  PfpImage,
  BannerImage,
  FormInput,
  SocialInput,
  TextBoxView,
  SocialIcon,
  SocialRow,
  ModuleAdd,
  ModuleRow,
  Section,
  InterestBtn,
} from '../styles/EditProfileStyles';
import {AuthContext} from '../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';
import Clipboard from '@react-native-clipboard/clipboard';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import {Dropdown} from 'react-native-material-dropdown';
import Modal from 'react-native-modal';
import InterestBox from '../components/InterestBox';
import storage from '@react-native-firebase/storage';
// import FormInput from '../components/FormInput';

// // // // // // // TO DO // // // // // // //
// For now the images are clickable to change them
// Maybe make a button for change banner and change pfp
// Need to fix banner size and cropping

// So, line 112-115
// the console log lines change for some reason
// the image will change for a second then go back to its original

// Make button sticky and act as an overlay
// Save + cancel button

// Test send and retrieve profileDetails

// Retrieve about, socials, tags
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

var modulesArray = ['a', 'a', 'a', 'a'];
var socialsArray = ['', '', ''];

const EditProfile = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(true);

  const [imagePfp, setImagePfp] = useState(require('../assets/icons/pfp.png'));
  const [imageBanner, setImageBanner] = useState(
    require('../assets/testPFP.jpg'),
  );
  const {user, logout} = useContext(AuthContext);

  const [instagram, setInstagram] = useState();
  const [discord, setDiscord] = useState();
  const [email, setEmail] = useState(); //could make this auto, but also give an option to set a diff email

  const [interest, setInterest] = useState();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalCVisible, setModalCVisible] = useState(false);
  const [isModalUVisible, setModalUVisible] = useState(false);

  const [remInterest, setRemInterest] = useState();

  const [modalText, setModalText] = useState('null');

  const [userData, setUserData] = useState(null);

  var change = new Boolean(true);

  //////
  //////
  //////

  const getUser = async () => {
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

  //////
  //////
  //////

  useEffect(() => {
    getUser();
  }, []);

  const choosePhotoFromLibraryPfp = async () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
      cropperCircleOverlay: true,
    })
      .then(async image => {
        change = false;
        setImagePfp({uri: image.path});
      })
      .catch(err => {
        console.log('error2!!! ---- ' + err.toString());
      });
  };

  const choosePhotoFromLibraryBanner = () => {
    ImagePicker.openPicker({
      width: 220,
      height: 130,
      cropping: true,
    })
      .then(image => {
        console.log('image.path(banner) = ', image.path);
        setImageBanner({uri: image.path});
      })
      .catch(err => {
        console.log('error!!! ---- ' + err.toString());
      });
  };

  const getPfp = async () => {
    console.log('getPfp called');
    firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        console.log('GET =  ', documentSnapshot.get('pfp'));
        setImagePfp(documentSnapshot.get('pfp'));
        console.log(
          '*****************BELOW THIS IS THE CHANGE*****************',
        );
        console.log('GET Pfp');
      });
  };

  const getAll = async () => {
    //will be used to call and get each profile detail

    await getModules();
    await getAbout();
    await getSocials();
    await getInterests();
    await getPfp();
  };

  const getInterests = async allData => {
    console.log('getInterests called');
    console.log('ALL DATA RIGHT???? --> ', allData);

    try {
      for (let i = 0; i < allData.interests.length; i++) {
        interestArray[i] = allData.interests[i];
      }
    } catch (err) {
      console.log('Error fetching and assinging interests - ', err);
    }
  };

  const moduleBtnClicked = clicked => {
    var cur = clicked;
    console.log(cur);
  };

  const addInterest = async () => {
    var flag = 0;
    console.log('add interest');

    if (interest == '' || interest == null) {
      // If the entered interes is empty
      setModalText('Please enter an interest (12 chars max)');
      toggleModal();
    } else {
      console.log(interestArray);

      for (let i = 0; i < interestArray.length; i++) {
        if (interestArray[i] == 'null') {
          // if the interest array contains a 'null' string
          for (let i = 0; i < interestArray.length; i++) {
            if (interestArray[i] == interest) {
              // if the interest is already present in the array
              flag = 1;
              break;
            }
          }

          if (flag == 1) {
            setModalText('You have already added this interest.');
            toggleModal();
          } else {
            interestArray[i] = interest;
            setInterest('');
            this.textInput.clear();
            break;
          }
        } else if (i == 9 && interestArray[i] != 'null') {
          setModalText(
            'You can only add up to 10 interests! (remove atleast 1)',
          );
          toggleModal();
        }
      }
    }
  };

  const removeInterestConf = removeInterest => {
    setModalText('Would you like to remove ' + removeInterest + ' ?');
    setRemInterest(removeInterest);
    toggleModalC();
  };

  const removeInterestFromArray = () => {
    console.log('removing ???', remInterest);
    for (let i = 0; i < interestArray.length; i++) {
      if (interestArray[i] == remInterest) {
        interestArray[i] = 'null';
        toggleModalC();
        console.log(interestArray);
        break;
      }
    }
  };

  const toggleModalU = () => {
    setModalUVisible(!isModalUVisible);
  };

  const toggleModalC = () => {
    setModalCVisible(!isModalCVisible);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const modulesToUserData = () => {
    try {
      for (let i = 0; i < modulesArray.length; i++) {
        if (modulesArray[i] == 'a' || modulesArray[i] == undefined) {
          if (i == 0) {
            modulesArray[i] = this.module1Input.text();
          } else if (i == 1) {
            modulesArray[i] = this.module2Input.text();
          } else if (i == 2) {
            modulesArray[i] = this.module3Input.text();
          } else {
            modulesArray[i] = this.module4Input.text();
          } ///////MIGHT NEED TO DO this.module1Input.text or sumn???
          console.log('module array assigned from the module textbox');
        }
        userData.modules[i] = modulesArray[i];
      }
    } catch (err) {
      console.log('Error assigning modules to user data :', err);
    }
  };

  const socialsToUserData = () => {
    try {
      if (instagram == '' || instagram == undefined) {
        userData.socials[0] = this.social1Input.text();
      } else {
        userData.socials[0] = instagram;
      }

      if (discord == '' || discord == undefined) {
        userData.socials[1] = this.social2Input.text();
      } else {
        userData.socials[1] = discord;
      }

      if (email == '' || email == undefined) {
        userData.socials[2] = this.social3Input.text();
      } else {
        userData.socials[2] = email;
      }
    } catch (err) {
      console.log('Error assigning socials to user data :', err);
    }
  };

  const interestsToUserData = () => {
    try {
      for (let i = 0; i < interestArray.length; i++) {
        userData.interests[i] = interestArray[i];
      }
    } catch (err) {
      console.log('Error assigning interests to user data :', err);
    }
  };

  const pfpToUserData = () => {
    try {
      userData.pfp = imagePfp;
    } catch (err) {
      console.log('Error assigning pfp to user data :', err);
    }
  };

  const bannerToUserData = () => {
    try {
      userData.banner = imageBanner;
    } catch (err) {
      console.log('Error assigning banner to user data :', err);
    }
  };

  const saveProfile = async () => {
    await modulesToUserData();
    await socialsToUserData();
    await interestsToUserData();
    await pfpToUserData();
    await bannerToUserData();

    console.log('====================================');
    console.log(
      'modules - ',
      userData.modules,
      ' about - ',
      userData.about,
      ' socials - ',
      userData.socials,
      ' interests - ',
      userData.interests,
      ' pfp - ',
      userData.pfp,
      ' banner - ',
      userData.banner,
      ' ',
    );
    console.log('====================================');

    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        modules: userData.modules,
        about: userData.about,
        socials: userData.socials,
        interests: userData.interests,
        pfp: userData.pfp,
        banner: userData.banner,
      })
      .then(() => {
        console.log('User updated!');
        toggleModalU();
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

        {/* IMAGE */}

        <EditView>
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              width: 375,
            }}
            onPress={() => choosePhotoFromLibraryBanner()}>
            <BannerImage source={imageBanner} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => choosePhotoFromLibraryPfp()}>
            <PfpImage source={imagePfp} />
          </TouchableOpacity>

          {/* IMAGE */}

          <TextBoxView>
            {/* MODULES */}

            <Section>
              <Text style={styles.textTitles}>Modules</Text>
              <Text style={styles.textSub}>
                6 char limit (WebDev, SecFun, iOSDev)
              </Text>

              <ModuleRow>
                <TouchableOpacity onPress={() => moduleBtnClicked(1)}>
                  <ModuleAdd />
                </TouchableOpacity>

                <SocialInput
                  defaultValue={userData ? userData.modules[0] : 'Module'}
                  onChangeText={module1 => (modulesArray[0] = module1)}
                  maxLength={6}
                  keyboardType="default"
                  ref={input => {
                    this.module1Input = input;
                  }}
                />
              </ModuleRow>

              <ModuleRow>
                <TouchableOpacity onPress={() => moduleBtnClicked(2)}>
                  <ModuleAdd />
                </TouchableOpacity>
                <SocialInput
                  defaultValue={userData ? userData.modules[1] : 'Module'}
                  onChangeText={module2 => (modulesArray[1] = module2)}
                  maxLength={6}
                  keyboardType="default"
                  ref={input => {
                    this.module2Input = input;
                  }}
                />
              </ModuleRow>
              <ModuleRow>
                <TouchableOpacity onPress={() => moduleBtnClicked(3)}>
                  <ModuleAdd />
                </TouchableOpacity>
                <SocialInput
                  defaultValue={userData ? userData.modules[2] : 'Module'}
                  onChangeText={module3 => (modulesArray[2] = module3)}
                  maxLength={6}
                  keyboardType="default"
                  ref={input => {
                    this.module3Input = input;
                  }}
                />
              </ModuleRow>
              <ModuleRow>
                <TouchableOpacity onPress={() => moduleBtnClicked(4)}>
                  <ModuleAdd />
                </TouchableOpacity>
                <SocialInput
                  defaultValue={userData ? userData.modules[3] : 'Module'}
                  onChangeText={module4 => (modulesArray[3] = module4)}
                  maxLength={6}
                  keyboardType="default"
                  ref={input => {
                    this.module4Input = input;
                  }}
                />
              </ModuleRow>
            </Section>

            {/* MODULES */}

            {/* ABOUT */}

            <Section>
              <Text style={styles.textTitles}>
                Say something about yourself!
              </Text>
              <Text style={styles.textSub}>160 char limit</Text>

              <FormInput
                multiline
                numberOfLines={4}
                maxLength={160}
                value={
                  userData ? userData.about : 'Write something about yourself'
                }
                onChangeText={txt => setUserData({...userData, about: txt})}
                placeholderText="About me" //need to make a useState for this
                keyboardType="default"
              />
            </Section>

            {/* ABOUT */}

            {/* SOCIALS */}

            <Section>
              <Text style={styles.textTitles}>Socials</Text>
              <Text style={styles.textSub}>Add your social handles</Text>

              <SocialRow>
                <SocialIcon
                  style={{height: 29, width: 40}}
                  source={require('../assets/icons/instagram.png')}
                />
                <SocialInput
                  defaultValue={userData ? userData.socials[0] : 'Insta'}
                  onChangeText={social1 => setInstagram(social1)}
                  keyboardType="default"
                  autoCorrect={false}
                  autoCapitalize="none"
                  ref={input => {
                    this.social1Input = input;
                  }}
                />
              </SocialRow>
              <SocialRow>
                <SocialIcon source={require('../assets/icons/discordB.png')} />
                <SocialInput
                  defaultValue={userData ? userData.socials[1] : 'Discord'}
                  onChangeText={social2 => setDiscord(social2)}
                  keyboardType="default"
                  autoCorrect={false}
                  autoCapitalize="none"
                  ref={input => {
                    this.social2Input = input;
                  }}
                />
              </SocialRow>
              <SocialRow>
                <SocialIcon source={require('../assets/icons/email.png')} />
                <SocialInput
                  defaultValue={userData ? userData.socials[2] : 'Email'}
                  onChangeText={social3 => setEmail(social3)}
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                  ref={input => {
                    this.social3Input = input;
                  }}
                />
              </SocialRow>
            </Section>

            {/* SOCIALS */}

            {/* INTERESTS */}

            <Section>
              <Text style={styles.textTitles}>Interests</Text>
              <Text style={styles.textSub}>Add up to 10 interests</Text>
              <SocialRow>
                <SocialInput
                  labelValue={interest}
                  onChangeText={userInterest => setInterest(userInterest)}
                  maxLength={12}
                  keyboardType="default"
                  ref={input => {
                    this.textInput = input;
                  }}
                />
                <InterestBtn title="Add" onPress={() => addInterest()} />
              </SocialRow>

              {interestArray.map(inter => {
                if (inter != 'null') {
                  console.log('int array mappping!');
                  return (
                    <InterestBox
                      key={inter}
                      interestText={inter}
                      onPress={() => removeInterestConf(inter)}
                    />
                  );
                }
              })}
            </Section>

            {/* INTERESTS */}

            {/* POP UP FOR ERRORS */}
            <Modal isVisible={isModalVisible} backdropColor="grey">
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  borderRadius: 10,
                }}>
                <Text style={{textAlign: 'center', fontSize: 20, padding: 6}}>
                  {modalText}
                </Text>

                <Button title="Ok" onPress={toggleModal} />
              </View>
            </Modal>

            {/* POP UP FOR CONFIRMATION */}
            <Modal isVisible={isModalCVisible} backdropColor="grey">
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  borderRadius: 10,
                }}>
                <Text style={{textAlign: 'center', fontSize: 20, padding: 6}}>
                  {modalText}
                </Text>

                <SocialRow>
                  <Button title="Cancel" onPress={toggleModalC} />
                  <Button title="Remove" onPress={removeInterestFromArray} />
                </SocialRow>
              </View>
            </Modal>

            {/* POP UP FOR UPDATE SUCCESS */}
            <Modal isVisible={isModalUVisible} backdropColor="grey">
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  borderRadius: 10,
                }}>
                <Text style={{textAlign: 'center', fontSize: 20, padding: 6}}>
                  User profile updated!
                </Text>

                <SocialRow>
                  <Button title="Ok" onPress={toggleModalU} />
                </SocialRow>
              </View>
            </Modal>
          </TextBoxView>
        </EditView>
      </ScrollView>
      <View style={styles.cTest}>
        <TouchableOpacity style={styles.stickyBtn}>
          <Text style={styles.msgBtn}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stickyBtn} onPress={saveProfile}>
          <Text style={styles.msgBtn}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const copyToClipboard = () => {
  Clipboard.setString('#Taf1789');
  console.log(Clipboard.getString());
  alert('Coppied to clipboard!');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  stickyBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    paddingHorizontal: 10,
    margin: 3,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#404040',
    // left: 220,
  },

  cTest: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(170, 187, 204, 0.1)',
    paddingVertical: 6,
  },

  msgBtn: {
    backgroundColor: '#404040',
    color: '#fff',
    padding: 5,
    margin: 2,
  },

  button: {
    backgroundColor: '#fafafa',
    borderRadius: 18,
    padding: 5,
    marginBottom: 2,
    margin: 2,
  },

  textTitles: {
    fontSize: 20,
    padding: 6,
  },

  textSub: {
    fontSize: 16,
    paddingLeft: 6,
    paddingBottom: 6,
    fontStyle: 'italic',
  },
});
