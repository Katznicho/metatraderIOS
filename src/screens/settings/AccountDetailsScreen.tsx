import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AccountDetailsScreen = () => {
  const navigation = useNavigation<any>();

  const params = useRoute<any>();

  const {item} = params?.params

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && (
        <View style={{ height: StatusBar.currentHeight || 40 }} />
      )}
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
    
      <TouchableOpacity style={styles.header} activeOpacity={1}           onPress={() => navigation.goBack()}>
        {/* <Icon
          name="chevron-back"
          size={24}
          color="#0D71F3"
          onPress={() => navigation.goBack()}
        /> */}
      <Image source={require("../../assets/arrow_back.png")} style={{ width: 20, height: 20 }}/>
        <Text style={styles.headerTitle}>Accounts</Text>
        <View style={{ width: 24 }} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Account Header */}
        <View style={[styles.accountHeader, {borderTopColor: '#DDD', borderBottomColor: '#DDD',  borderTopWidth: 1, borderBottomWidth: 1}]}>
          <Image
            source={{
              uri: item?.image,
            }}
            style={styles.accountImage}
          />
          <Text style={styles.accountName}>{item?.name}</Text>
          <Text style={styles.accountDetails}>
            {item?.broker}
          </Text>
          <Text style={styles.accountDetails}>{item?.amount}</Text>
          <Text style={styles.accountDetails}>Hedge</Text>
        </View>

        {/* Divider */}
        {/* <View style={styles.divider} /> */}

        {/* Company Info */}
        <View style={[
  styles.infoRow,
  {
    marginVertical: 20,
    marginBottom: 30,
    borderTopColor: '#DDD',
    borderBottomColor: '#DDD',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
]}>
  <Text style={styles.infoLabel}>Company</Text>

  <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end' }}>
    <Text style={[styles.infoValue, { color: "#000", fontWeight: "500", flexShrink: 1, textAlign: 'right' }]}>
      {item?.company_name}
    </Text>
    <Image source={require("../../assets/arrow_forward.png")} style={{ width: 15, height: 15, marginLeft: 5 }} />
  </View>
</View>




        {/* Actions */}
        <TouchableOpacity style={[styles.actionRow, {borderTopColor: '#DDD', borderBottomColor: '#DDD',  borderTopWidth: 1}]}>
          <Text style={[styles.actionText, {color:"#0D71F3"}]}>Deposit</Text>
          {/* <Icon name="chevron-forward" size={20} color="gray" /> */}
          <Image source={require("../../assets/arrow_forward.png")} style={{ width: 15, height: 15 }}/>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={[styles.actionRow, { borderBottomColor: '#DDD',  borderBottomWidth: 1}]}>
          <Text style={[styles.actionText,{color:"#0D71F3"}]}>Withdrawal</Text>
          {/* <Icon name="chevron-forward" size={20} color="gray" /> */}
          <Image source={require("../../assets/arrow_forward.png")} style={{ width: 15, height: 15 }}/>
        </TouchableOpacity>


        {/* Account Info */}
        <View style={{ marginVertical: 30, borderTopColor: '#DDD', borderBottomColor: '#DDD',  borderTopWidth: 1, borderBottomWidth: 1 }}>
          {[
            { label: 'Name', value: item?.name },
            { label: 'Email', value:item?.email },
            { label: 'Phone', value: '' },
            { label: 'Login', value:item?.login  },
            { label: 'Server', value:item?.server },
            { label: 'Connected', value:item?.connection },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{item?.label}</Text>
                <Text style={styles.infoValue}>{item?.value}</Text>
              </View>
              {index < 5 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>
        <View style={styles.divider} />

        {/* Additional Actions */}
        <TouchableOpacity style={styles.actionRow}>
          <Text style={styles.actionText}>Connect from another device</Text>
          {/* <Icon name="chevron-forward" size={20} color="gray" /> */}
          <Image source={require("../../assets/arrow_forward.png")} style={{ width: 15, height: 15 }}/>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.actionRow}>
          <Text style={styles.actionText}>Change Password</Text>
          {/* <Icon name="chevron-forward" size={20} color="gray" /> */}
          <Image source={require("../../assets/arrow_forward.png")} style={{ width: 15, height: 15 }}/>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={[styles.deleteRow, {borderBottomColor: '#DDD',  borderBottomWidth: 1}]}>
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    color: '#0D71F3',
  },
  content: {},
  accountHeader: {
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
  },
  accountImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  accountName: {
    fontSize: 18,
    color: 'black',
  },
  accountDetails: {
    fontSize: 14,
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    backgroundColor: '#fff',
    padding: 16,
  },
  infoLabel: {
    fontSize: 16,
    color: 'black',
  },
  infoValue: {
    fontSize: 14,
    color: 'gray',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    padding: 16,
  },
  actionText: {
    fontSize: 16,
    color: '#000',
  },
  deleteRow: {
    paddingVertical: 12,
    padding: 16,
    backgroundColor: '#fff',
    // alignItems: 'center',
  },
  deleteText: {
    fontSize: 16,
    color: 'red',
  },
});

export default AccountDetailsScreen;
