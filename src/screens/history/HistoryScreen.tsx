import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const HistoryScreen = () => {
  const [selectedOption, setSelectedOption] = useState('Last Month');


  const navigation = useNavigation<any>();

  const options = [
    'Today',
    'Last week',
    'Last month',
    'Last 3 months',
    'Last 6 months',
    'Last year',
    'Custom',
  ];

  const renderOption = ({ item }) => {
    const isSelected = selectedOption === item;
    return (
      <TouchableOpacity
        style={styles.option}
        activeOpacity={1}
        onPress={() => setSelectedOption(item)}
      >
        <Text style={[styles.optionText]}>{item}</Text>
        {isSelected && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {Platform.OS === 'ios' && (
        <View style={{ height: StatusBar.currentHeight || 40 }} />
      )}
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../../assets/arrow_back.png")} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History</Text>
        <View style={{ width: 24 }} /> {/* Placeholder for alignment */}
      </View>

      {/* Symbol Selector */}
      <TouchableOpacity style={styles.symbolSelector} activeOpacity={1}>
        <Text style={styles.symbolLabel}>Symbol:</Text>
        <Text style={styles.symbolValue}>All symbols</Text>
      </TouchableOpacity>

      {/* Options List */}
      <FlatList
        data={options}
        keyExtractor={item => item}
        renderItem={renderOption}
        contentContainerStyle={styles.list}
      />


      {/* Create Report Button */}
      <View style={styles.reportDetails}>
        <TouchableOpacity style={styles.createReportBtn} onPress={()=>navigation.navigate("HistoryDataScreen")}>
          <View>
            <Text style={styles.createReportText}>Create a trade report</Text>
            <Text style={styles.subText}>{selectedOption}</Text>
          </View>
          <Image
            source={require('../../assets/arrow_forward.png')}
            style={{ width: 16, height: 16 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  symbolSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginTop: 10,
    marginBottom: 20,

    //here
    borderRadius:10,
    marginHorizontal:10,
    // marginBottom:10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 20,
  },
  symbolLabel: {
    fontSize: 16,
    color: '#000',
  },
  symbolValue: {
    fontSize: 16,
    color: '#0D71F3',
  },
  reportDetails:{
    flex:4000,
    // backgroundColor:'#0D71F3',
     marginTop: -1000,
    // padding:4,
    height:10,
    width:"95%",
    borderRadius:10,
    marginHorizontal:10,
    marginBottom:10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 20,
  },
  list: {
    backgroundColor: '#FFFFFF',
    borderRadius:10,
    marginHorizontal:10,
    marginBottom:10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 20,
    // flex: 1
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  selectedOptionText: {
    color: '#007AFF',
  },
  checkmark: {
    fontSize: 18,
    color: '#007AFF',
  },

  createReportBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 'auto',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    borderRadius: 12,
  },
  createReportText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  subText: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
});

export default HistoryScreen;