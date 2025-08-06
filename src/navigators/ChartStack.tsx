import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chart from '../screens/charts/Chart';
import ChartScreen from '../screens/charts/ChartScreen';


const Stack = createNativeStackNavigator();



export default function ChartStack() {
  return (
    <Stack.Navigator
    initialRouteName="ChartScreen"
    screenOptions={{
        headerShown: true,
    }}

>
    <Stack.Screen
        name="ChartScreen"
        component={ChartScreen}
        options={{
            animation: 'slide_from_right',
            headerShown: false,
        }}
    />
    </Stack.Navigator>
  )
}

