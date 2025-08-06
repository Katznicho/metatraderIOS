import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TradingHistoryScreen from '../screens/history/TradingHistoryScreen';
import HistoryScreen from '../screens/history/HistoryScreen';
import AndroidHistory from '../screens/history/AndroidHistory';
import { Platform } from 'react-native';
import GraphData from '../screens/history/GraphData';

const Stack = createNativeStackNavigator();

export default function HistoryStack() {
  return (
    <Stack.Navigator
      initialRouteName={Platform.OS=="android"?"AndroidHistoryScreen":"HistoryScreen"}
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="HistoryScreen"
        component={TradingHistoryScreen}
        options={{
          animation:"none",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="HistoryDaysScreen"
        component={HistoryScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />
    

      <Stack.Screen
        name="HistoryDataScreen"
        component={GraphData}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AndroidHistoryScreen"
        component={AndroidHistory}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
