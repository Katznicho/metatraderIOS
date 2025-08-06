import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useApi } from '../../hooks/useApi';

const AccountScreen = () => {
    const navigation = useNavigation<any>();
        const { data, error, isLoading } = useApi<any>({
          endpoint: '/getAccount',
          queryOptions: {
            enabled: true,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            refetchInterval: 5000,
          },
        });
        
  return (
    <View style={styles.container}>
              {Platform.OS === 'ios' && (
        <View style={{ height: StatusBar.currentHeight || 40 }} />
      )}
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
      {/* Header */}
      <TouchableOpacity style={styles.header} activeOpacity={1} onPress={()=>navigation.goBack()}>
        {/* <Icon name="chevron-back" size={24} color="#0D71F3" onPress={()=>navigation.goBack()} />
         */}
          <Image source={require("../../assets/arrow_back.png")} style={{ width:18, height: 18 }}/>
         
        <Text style={styles.headerTitle}>Accounts</Text>
        {/* <Icon name="add" size={24} color="#0D71F3" /> */}
        <Image source={require("../../assets/plus.png")} style={{ width: 20, height: 20 }}/>
      </TouchableOpacity>

       {
        data?.data?.map((item, index) => (
          <TouchableOpacity
          style={[
            styles.accountItem,
            index === 0 && { backgroundColor: '#E6F0FF' } // light blue for first item
          ]}
          activeOpacity={1}
          key={index}
          onPress={() => navigation.navigate("AccountDetailsScreen", { item })}
        >
        
      {/* Image */}
      <Image
        source={{ uri: item?.image }} // Dummy online image
        style={styles.accountImage}
      />
      {/* Account Info */}
      <View style={styles.accountInfo}>
        <Text style={styles.accountName}>{item?.name}</Text>
        <Text style={styles.accountDetails}>
          {item?.broker}
        </Text>
        <Text style={styles.accountDetails}>{item?.amount}, Hedge</Text>
      </View>
      {/* Right Arrow Icon */}
      {index === 0 && 
      // <Icon name="chevron-forward" size={24} color="gray" />
      <Image source={require("../../assets/arrow_forward.png")} style={{ width: 20, height: 20 }}/>
      }

    </TouchableOpacity>
          
        ))}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  accountImage: {
    width: 35,
    height: 35,
    // borderRadius: 8,
    marginRight: 12,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 15,
    // fontWeight: 'bold',
    color: '#000',
  },
  accountDetails: {
    fontSize: 13,
    color: '#000',
  },
});

export default AccountScreen;
