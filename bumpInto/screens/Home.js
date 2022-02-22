import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import {AuthContext} from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';

export default function Home({navigation, route}) {
  const {user, logout} = useContext(AuthContext);

  console.log('home');
  if (route.params?.check) {
    console.log(route.params?.check);
  } else {
    console.log('nope tt');
  }
  return (
    <View
      style={{
        // Try setting `flexDirection` to `"row"`.
        flexDirection: 'column',
        flex: 1,
      }}>
      <View
        style={{
          flex: 0.3,
          backgroundColor: 'grey',
          justifyContent: 'flex-end',
        }}>
        <Text>{route.param} </Text>
        {/* <Text> {navigation.getParam()} </Text> */}
      </View>

      <View style={{flex: 2, backgroundColor: 'white'}}>
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

        <Text> Welcome {user.uid}</Text>

        {/* <Button title="Log out" onPress={() => navigation.navigate('Login')} /> */}
        {/* <Button title="Log out" onPress={() => logout()} /> */}
        <FormButton buttonTitle="Logout" onPress={() => logout()} />

        {/* Title is what the button says. naviagation.naviagte must have stack.screen name (that is from stack.nav) */}
      </View>
    </View>
  );
}

// const Home = ({navigation, route}) => {

//   if (route.params){
//       console.log(route.params);
//     } else {
//       console.log("nah");
//       console.log(route.params);

//     }

//   return (
//     <View style={{
//       // Try setting `flexDirection` to `"row"`.
//       flexDirection: "column",
//       flex: 1,

//     }}>
//       <View style={{flex: 0.3, backgroundColor: "grey", justifyContent: "flex-end"}}>
//         <Text>hi </Text>
//         {/* <Text> {navigation.getParam()} </Text> */}
//       </View>

//       <View style={{flex: 2, backgroundColor: "white"}}>

//         <Button title="Log out" onPress={() => navigation.navigate('Login')} />
//         {/* Title is what the button says. naviagation.naviagte must have stack.screen name (that is from stack.nav) */}
//       </View>
//     </View>
//   );
// };

// function Home({navigation, route}) {
//   // const {userEmail, otherParam} = route.params;
//   //const text = navigation.getParam('userEmail','nothing sent')
//   // const {userEmail} = route.params;

//   if (route.params?.name){
//     console.log("sent it");
//   }

//   return (
//     <View style={{
//       // Try setting `flexDirection` to `"row"`.
//       flexDirection: "column",
//       flex: 1,
//     }}>

//       <View style={{flex: 0.3, backgroundColor: "grey", justifyContent: "flex-end"}}>
//         <Text>Hi! </Text>
//         {/* <Text> {navigation.getParam()} </Text> */}
//       </View>

//       <View style={{flex: 2, backgroundColor: "white"}}>

//         <Button title="Log out" onPress={() => navigation.navigate('Login')} />
//         {/* Title is what the button says. naviagation.naviagte must have stack.screen name (that is from stack.nav) */}
//       </View>
//     </View>
//   );
// };

//export default Home();
// export default Home;
