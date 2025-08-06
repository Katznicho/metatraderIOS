import { View, Text, Platform, StatusBar, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'

const quotesImage = require("../assets/myquotes.gif");
// Screen height and width
const { height, width } = Dimensions.get('window');
export default function QuotsScreen() {
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && (
        <View style={{ height: StatusBar.currentHeight || 40 }} />
      )}
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />

      {/* Render the settings image */}
      <Image source={quotesImage} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: '100%',
    height: height - 105,
    resizeMode: 'contain',
  },
});