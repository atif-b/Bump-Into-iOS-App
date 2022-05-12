import * as React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Chats from '../screens/Chats';
import Friends from '../screens/Friends';
import ProfileUser from '../screens/ProfileUser';
import EditProfile from '../screens/EditProfile';
import ChatsPage from '../screens/ChatsPage';
import ScanQR from '../screens/ScanQR';
import Bumped from '../screens/Bumped';
import FriendReqs from '../screens/FriendReqs';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Tabs = (navigation, route) => {
  console.log('******tabsNav*****');
  if (route.params?.check) {
    console.log(route.params?.check);
  }
  // else {
  //   console.log('params');
  // }
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
      <Tab.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          tabBarButton: props => null,
        }}
      />
      <Tab.Screen
        name="ChatsPage"
        component={ChatsPage}
        options={{
          tabBarButton: props => null,
        }}
      />
      <Tab.Screen
        name="ScanQR"
        component={ScanQR}
        options={{
          tabBarButton: props => null,
        }}
      />

      <Tab.Screen
        name="Bumped"
        component={Bumped}
        options={{
          tabBarButton: props => null,
        }}
      />

      <Tab.Screen
        name="FriendReqs"
        component={FriendReqs}
        options={{
          tabBarButton: props => null,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
