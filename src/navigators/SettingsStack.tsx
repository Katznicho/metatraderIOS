import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from '../screens/settings/Settings';
import AccountScreen from '../screens/settings/AccountScreen ';
import AccountDetailsScreen from '../screens/settings/AccountDetailsScreen';

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="SettingScreen"
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="SettingScreen"
        component={Settings}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AccountsScreen"
        component={AccountScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AccountDetailsScreen"
        component={AccountDetailsScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
