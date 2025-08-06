import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsStack from './SettingsStack';
import { Image, Platform } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HistoryStack from './HistoryStack';
import TradeStack from './TradeStack';
import ChartStack from './ChartStack';
import QuotsScreen from '../screens/QuotsScreen';
import Messages from '../screens/Messages';


// Tab Navigator
const Tab = createBottomTabNavigator();


// Tab Navigator Component
const TabNavigator = () => {
  const getTabBarStyle = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';


    const shownScreens = [
      'HomeScreen', // 
      'MyCards',
      'OrderScreen',
      'SettingScreen',
      'HistoryScreen',
      'ChartScreen'
    ];

    if (shownScreens.includes(routeName) || routeName === '') {
      return { display: 'flex' as const };
    }

    return { display: 'none' } as any;
  };

  return (
    <Tab.Navigator
      // screenOptions={{
      //   headerShown: false, // Hides the header above tabs
      //   tabBarStyle: { backgroundColor: '#fff', elevation:0 }, // Tab bar background color
      //   tabBarActiveTintColor: '#0D71F3', // Active icon color
      //   tabBarInactiveTintColor: 'gray', // Inactive icon color
      // }}
      screenOptions={({ route }: any) => ({
        headerShown: false,
        tabBarStyle: getTabBarStyle(route),
        tabBarActiveTintColor: '#0D71F3',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Quotes"
        component={QuotsScreen}
        options={{
          title: 'Quotes',
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image source={require('../assets/quotes_colored.png')} style={{ width: 25, height: 25 }}
              />
            ) : (
              <Image source={require('../assets/quotes.png')} style={{ width: 25, height: 25 }} />
            )
        }}
      />
      <Tab.Screen
        name="Chart"
        component={ChartStack}
        options={{
          title: 'Chart',
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image source={require('../assets/chart_colored.png')} style={{ width: 25, height: 25 }}
              />
            ) : (
              <Image source={require('../assets/chart.png')} style={{ width: 25, height: 25 }} />
            )
        }}
      />
      {
        Platform.OS === 'ios' ? (
          <Tab.Screen
            name="Trade"
            component={TradeStack}
            options={{
              title: 'Trade',
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Image source={require('../assets/trade_colored.png')} style={{ width: 25, height: 25 }}
                  />
                ) : (
                  <Image source={require('../assets/trade.png')} style={{ width: 25, height: 25 }} />
                )
            }}
          />
        ) : (
          <Tab.Screen
            name="Trade"
            component={TradeStack}
            options={{
              title: 'Trade',
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Image source={require('../assets/androtrade_colored.png')} style={{ width: 25, height: 25 }}
                  />
                ) : (
                  <Image source={require('../assets/androtrade.png')} style={{ width: 25, height: 25 }} />
                )
            }}
          />
        )
      }

      <Tab.Screen
        name="History"
        component={HistoryStack}
        options={{
          title: 'History',
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image source={require('../assets/history_colored.png')} style={{ width: 25, height: 25 }}
              />
            ) : (
              <Image source={require('../assets/history.png')} style={{ width: 25, height: 25 }} />
            )
        }}
      />
      {Platform.OS === 'ios' ? (
        <Tab.Screen
          name="Settings"
          component={SettingsStack}
          options={{
            title: 'Settings',
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image source={require('../assets/settings_colored.png')} style={{ width: 25, height: 25 }}
                />
              ) : (
                <Image source={require('../assets/mysettings.png')} style={{ width: 25, height: 25 }} />
              )
          }}
        />

      ) : (
        <Tab.Screen
          name="Messages"
          component={Messages}
          options={{
            title: 'Messages',
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image source={require('../assets/andromess_colored.png')} style={{ width: 25, height: 25 }}
                />
              ) : (
                <Image source={require('../assets/andromess.png')} style={{ width: 25, height: 25 }} />
              )
          }}
        />

      )
      }

    </Tab.Navigator>
  );
};

export default TabNavigator;
