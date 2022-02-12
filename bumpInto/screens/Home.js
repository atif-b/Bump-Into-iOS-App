import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
// import MainContainer from '@naviagation/MainContainer';


// export default function Home(navigation) {
//   const route = useRoute();
//   return(
//     <View>
//       <Text> {route.params.email}</Text>
//     </View>
//   );
// }


const Home = ({navigation}) => {
  //const {p1} = route.params;
  //const text = navigation.getParam('userEmail','nothing sent')
  //const {userEmail} = route.params;

  const route = useRoute();

  if (route.params?.name){
      console.log(route.params?.name);
    } else {
      console.log("rosa parks: 'nah'");
      console.log(route.params?.name);

    }

  return (
    <View style={{
      // Try setting `flexDirection` to `"row"`.
      flexDirection: "column",
      flex: 1,
      
    }}>
      <View style={{flex: 0.3, backgroundColor: "grey", justifyContent: "flex-end"}}>
        <Text>hi </Text>
        {/* <Text> {navigation.getParam()} </Text> */}
      </View>

      <View style={{flex: 2, backgroundColor: "white"}}>
        
        <Button title="Log out" onPress={() => navigation.navigate('Login')} />
        {/* Title is what the button says. naviagation.naviagte must have stack.screen name (that is from stack.nav) */}
      </View>
    </View>
  );
};



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
export default Home;
