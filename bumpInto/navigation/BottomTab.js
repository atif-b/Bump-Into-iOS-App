import * as React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Chats from '../screens/Chats';
import Friends from '../screens/Friends';
import ProfileUser from '../screens/ProfileUser';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Tabs = (navigation, route) => {
  console.log('******tabs*****');
  if (route.params?.check) {
    console.log(route.params?.check);
  } else {
    console.log('nope t');
  }
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home2"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />

      {/* this is not shown on the bottom tab but it is added to bottom 
      bar so that when i nav to this page it still shows the bottom bar */}
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarButton: props => null,
        }}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          tabBarButton: props => null,
        }}
      />
      <Tab.Screen
        name="ProfileUser"
        component={ProfileUser}
        options={{
          tabBarButton: props => null,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
