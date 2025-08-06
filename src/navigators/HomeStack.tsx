import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../screens/settings/Settings';
import Home from '../screens/Home/Home';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
        headerShown: true,
    }}

>
    <Stack.Screen
        name="Home"
        component={Home}
        options={{
            animation: 'slide_from_bottom',
            headerShown: false,
        }}
    />
    </Stack.Navigator>
  )
}

