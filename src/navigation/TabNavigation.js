import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../config/colors';

import HomeScreen from '../screens/HomeScreens/HomeScreen';
import ServicesScreen from '../screens/servicesScreeen/ServicesScreen';
import HistoryScreen from '../screens/historyScreens/HistoryScreen';
import ProfileScreen from '../screens/profileScreens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.primary,
          // backgroundColor: colors.background,
          position: 'static',
          bottom: 0,
          left: 0,
          right: 0,
          height: 70,
          paddingTop: 8,
          borderTopWidth: 0,
          elevation: 5,
        },
        headerShown: false,
      }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={28}
              color={focused ? colors.textPrimary : colors.border}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? colors.textPrimary : colors.border, fontSize: 12 }}>
              Home
            </Text>
          ),
        }}
      />

      {/* Services Tab */}
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="tools"
              size={28}
              color={focused ? colors.textPrimary : colors.border}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? colors.textPrimary : colors.border, fontSize: 12 }}>
              Services
            </Text>
          ),
        }}
      />

      {/* History Tab */}
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="time-outline"
              size={28}
              color={focused ? colors.textPrimary : colors.border}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? colors.textPrimary : colors.border, fontSize: 12 }}>
              History
            </Text>
          ),
        }}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={28}
              color={focused ? colors.textPrimary : colors.border}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? colors.textPrimary : colors.border, fontSize: 12 }}>
              Profile
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
