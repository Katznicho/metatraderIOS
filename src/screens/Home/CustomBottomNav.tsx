import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window'); // Get screen width for responsive design

// Example Screens
const QuotesScreen = () => null;
const ChartScreen = () => null;
const TradeScreen = () => null;
const HistoryScreen = () => null;
const SettingsScreen = () => null;

// Custom Bottom Navigation Component
const CustomBottomNav = () => {
  const navigation = useNavigation(); // Access navigation object

  return (
    <View style={styles.container}>
      {/* Full screenshot as background */}
      <Image
        source={require('../../assets/settings_tab.jpeg')} // Replace with your full screenshot
        style={styles.backgroundImage}
      />

      {/* Overlay touchable areas */}
      <TouchableOpacity
        style={[styles.touchArea, { left: width * 0.05 }]} // Adjust for Quotes
        onPress={() => navigation.navigate('Quotes')}
      />
      <TouchableOpacity
        style={[styles.touchArea, { left: width * 0.25 }]} // Adjust for Chart
        onPress={() => navigation.navigate('Chart')}
      />
      <TouchableOpacity
        style={[styles.touchArea, { left: width * 0.45 }]} // Adjust for Trade
        onPress={() => navigation.navigate('Trade')}
      />
      <TouchableOpacity
        style={[styles.touchArea, { left: width * 0.65 }]} // Adjust for History
        onPress={() => navigation.navigate('History')}
      />
      <TouchableOpacity
        style={[styles.touchArea, { left: width * 0.85 }]} // Adjust for Settings
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70, // Adjust based on your screenshot height
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  touchArea: {
    position: 'absolute',
    width: 50, // Adjust width for touchable area
    height: 70, // Same as the container height
  },
});

export default CustomBottomNav;
