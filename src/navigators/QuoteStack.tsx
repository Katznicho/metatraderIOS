import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../screens/settings/Settings';

const Stack = createNativeStackNavigator();

export default function QuoteStack() {
  return (
    <Stack.Navigator
    initialRouteName="SettingScreen"
    screenOptions={{
        headerShown: true,
    }}

>
    <Stack.Screen
        name="SettingScreen"
        component={Settings}
        options={{
            animation: 'slide_from_bottom',
            headerShown: false,
        }}
    />
    </Stack.Navigator>
  )
}

