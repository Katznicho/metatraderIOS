import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useApi } from '../../hooks/useApi';

// Import your settings image
const settingsImage = require('../../assets/settings.jpeg');

// Screen height and width
const { height, width } = Dimensions.get('window');

const SettingsScreen = () => {

    const { data, error, isLoading } = useApi<any>({
      endpoint: '/getAccount',
      queryOptions: {
        enabled: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchInterval: 5000,
      },
    });
  

     const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && (
        <View style={{ height: StatusBar.currentHeight || 40 }} />
      )}
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer} >
        <TouchableOpacity activeOpacity={1} onPress={()=>navigation.navigate("AccountsScreen")}>
        <TouchableOpacity style={styles.detailsContainer} activeOpacity={1} onPress={()=>{
             return navigation.navigate("AccountsScreen")
        }}>
          {/* Text Content */}
          <View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.title}>{data?.data[0]?.name}</Text>
            <Text style={styles.subTitle}>{data?.data[0]?.broker}</Text>
            <Text style={styles.details}>
              {data?.data[0]?.server}{'\n'}{data?.data[0]?.access_point}
            </Text>
            </View>

          </View>

          {/* Arrow Icon */}
          {/* <Entypo name="chevron-small-right" size={24} color={'#CCC'} style={{justifyContent: 'flex-end', marginRight:-95}}  onPress={()=>{
            console.log("clicked")
          }}/> */}
          {/* <Image /> */}
          <Image source={require("../../assets/arrow_forward.png")} 
          style={{
             width: 15,
             height: 15,
             justifyContent: 'flex-end', 
             marginRight:-95

          }}
          />
        </TouchableOpacity>

        {/* Render the settings image */}
        <Image source={settingsImage} style={styles.image} />

        </TouchableOpacity>
 
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#f8f8f8',
  },
  headerTitle: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: '#FFf',
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flexDirection: 'row', // Align content in a row
    alignItems: 'center', // Center vertically
    justifyContent: 'space-evenly', // Space between text and icon
    padding: 15, // Add padding
    backgroundColor: '#fff',
    marginBottom:-170
  },
  title: {
    fontSize: 18,
    color: '#000',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  details: {
    fontSize: 12,
    color: '#000',
    lineHeight: 18,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: height + 60, // Adjust height as needed
    resizeMode: 'contain', // Keeps the aspect ratio of the image
  },
});

export default SettingsScreen;
