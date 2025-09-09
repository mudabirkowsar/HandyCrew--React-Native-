import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/authScreens/LoginScreen';
import SignupScreen from '../screens/authScreens/SignupScreen';
import TabNavigation from './TabNavigation';
import ServiceProvidersAllScreen from '../screens/servicesScreeen/ServiceProvidersAllScreen';
import ProviderDetailScreen from '../screens/servicesScreeen/ProviderDetailScreen';
import AddressScreen from '../screens/AddressScreen';
import HiringPage from '../screens/HiringPage';
import SignupScreenProvider from '../providersScreens/SignupScreenProvider';
import FormDetail from '../providersScreens/formDetailScreens/FormDetail';
import TabNavigationProvider from '../providersScreens/formDetailScreens/navigationProvider/TabNavigationProvider';
import UserChatScreen from '../providersScreens/screens/chatScreen/UserChatScreen';
import useAuth from '../../hooks/useAuth';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {

  const { user } = useAuth();

  if (!user) {
    return (
      <Stack.Navigator
        initialRouteName='SplashScreen'
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="SignupProvider" component={SignupScreenProvider} />
      </Stack.Navigator>
    )
  }
  else {
    return (
      <Stack.Navigator
        initialRouteName='TabNavigation'
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="ServiceProvidersAllScreen" component={ServiceProvidersAllScreen} />
        <Stack.Screen name="ProviderDetailScreen" component={ProviderDetailScreen} />
        <Stack.Screen name="AddressScreen" component={AddressScreen} />
        <Stack.Screen name="FinalHire" component={HiringPage} />

        <Stack.Screen name="FormDetail" component={FormDetail} />
        <Stack.Screen name="TabNavProvider" component={TabNavigationProvider} />
        <Stack.Screen name="UserChatScreen" component={UserChatScreen} />
      </Stack.Navigator>
    )
  }

}