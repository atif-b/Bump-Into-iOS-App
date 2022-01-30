import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-ionicons';



const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
        }}>
            <Tab.Screen name="Home2" component={Home} options={{
                tabBarIcon: ({color, size}) => (
                    // <ion-icon name="person-circle-outline"></ion-icon>
                    <Ionicons name="home-outline" color={color} size={size}/>
                    // <Icon name="camera"/>
                    // <Ionicons name="accessibility-outline"></Ionicons>

                )
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="home-outline" color={color} size={size}/>
                    // <Icon name="camera"/>
                    // <Ionicons name="accessibility-outline"></Ionicons>
                    

                )
            }} />

        </Tab.Navigator>
    );
}

export default Tabs;


// export default function MainContainer() {
//     return(
//         <View>
//             <Text>Hi</Text>
//         </View>
//     );
// }