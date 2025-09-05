import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/authScreens/LoginScreen';
import SignupScreen from '../screens/authScreens/SignupScreen';
import TabNavigation from './TabNavigation';
import ServiceProvidersAllScreen from '../screens/servicesScreeen/ServiceProvidersAllScreen';
import ProviderDetailScreen from '../screens/servicesScreeen/ProviderDetailScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="ServiceProvidersAllScreen" component={ServiceProvidersAllScreen} />
      <Stack.Screen name="ProviderDetailScreen" component={ProviderDetailScreen} />
    </Stack.Navigator>
  )
}