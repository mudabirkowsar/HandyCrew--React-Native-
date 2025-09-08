import { Text } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../config/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreenProvider from '../../screens/homeScreens/HomeScreenProvider';
import ServiceScreenProvider from '../../screens/servicesScreen/ServiceScreenProvider';
import NotificationScreenProvider from '../../screens/notificationScreen/NotificationScreenProvider';
import ChatScreenProvider from '../../screens/chatScreen/ChatScreenProvider';

const Tab = createBottomTabNavigator();

export default function TabNavigationProvider() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: colors.primary,
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
            <Tab.Screen
                name="Home"
                component={HomeScreenProvider}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name={focused ? "home" : "home-outline"}
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

            <Tab.Screen
                name="Notification"
                component={NotificationScreenProvider}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "notifications" : "notifications-outline"}
                            size={28}
                            color={focused ? colors.textPrimary : colors.border}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? colors.textPrimary : colors.border, fontSize: 12 }}>
                            Notifications
                        </Text>
                    ),
                }}
            />

            <Tab.Screen
                name="Chat"
                component={ChatScreenProvider}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name={focused ? "chat" : "chat-outline"}
                            size={28}
                            color={focused ? colors.textPrimary : colors.border}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? colors.textPrimary : colors.border, fontSize: 12 }}>
                            Chat
                        </Text>
                    ),
                }}
            />

            <Tab.Screen
                name="Requests"
                component={ServiceScreenProvider}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name={focused ? "clipboard-text" : "clipboard-text-outline"}
                            size={28}
                            color={focused ? colors.textPrimary : colors.border}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? colors.textPrimary : colors.border, fontSize: 12 }}>
                            Requests
                        </Text>
                    ),
                }}
            />


            <Tab.Screen
                name="Services"
                component={ServiceScreenProvider}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name={focused ? "tools" : "tools"}
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

        </Tab.Navigator>
    );
}
