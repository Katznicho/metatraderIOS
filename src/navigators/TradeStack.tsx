import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Trades from '../screens/trade/Trades';
import AndroidTrades from '../screens/trade/AndroidTrades';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();

export default function TradeStack() {
  return (
    <Stack.Navigator
      initialRouteName={Platform.OS=="android"?"AndroidTradesScreen":"TradesScreen"}
      screenOptions={{
        headerShown: true,
      }}

    >
      <Stack.Screen
        name="TradesScreen"
        component={Trades}
        options={{
          animation: 'slide_from_bottom',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AndroidTradesScreen"
        component={AndroidTrades}
        options={{
          animation: 'slide_from_bottom',
          headerShown: false,
        }}
      />


    </Stack.Navigator>
  )
}

