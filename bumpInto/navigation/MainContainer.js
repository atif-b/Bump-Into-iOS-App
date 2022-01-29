import * as React from 'react';
import {
  Text,
  View
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home2" component={Home} />
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