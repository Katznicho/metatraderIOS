import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  import { useNavigation } from '@react-navigation/native';
import SummaryCard from '../../component/SummaryCard';
import TradeListScreen from '../../component/TradeListScreen';
  
  export default function AndroidHistory() {
    const navigation = useNavigation();
  
    const summary = {
      profit: -564.45,
      deposit: 0.0,
      swap: 0.0,
      commission: 0.0,
      balance: -564.45,
    };
  
    const transactions = [
      {
        type: 'buy',
        amount: -2.61,
        pair: 'USDJPY',
        lot: 0.02,
        open: 157.374,
        close: 157.169,
        time: '2024.12.20 05:33:58',
      },
      {
        type: 'sell',
        amount: 3.5,
        pair: 'USDJPY',
        lot: 0.03,
        open: 157.4,
        close: 157.1,
        time: '2024.12.20 06:33:58',
      },
      // Add more transactions if needed
    ];
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('HistoryDaysScreen')}
        >
          <Image
            source={require('../../assets/androhistory_header.jpeg')}
            style={styles.headerImage}
          />
        </TouchableOpacity>
  
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Summary Section */}
         <SummaryCard/>
  
           <TradeListScreen/>
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    headerImage: {
      width: '100%',
      height: 130,
      resizeMode: 'contain',
      marginTop: -10,
    },
    scrollView: {
      paddingHorizontal: 15,
      paddingBottom: 20,
    },
    summaryContainer: {
      paddingVertical: 10,
      marginBottom: 20,
    },
    summaryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      width: '30%',
    },
    dottedLine: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      flex: 1,
      marginHorizontal: 10,
    },
    value: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'right',
      width: '25%',
    },
    transactionsContainer: {
      paddingVertical: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
    },
    transactionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    transactionText: {
      fontSize: 14,
      color: '#333',
      width: '22%',
      fontFamily: "RobotoCondensed-SemiBold",
      transform: [{ scaleY: 1.2 }],
    },
    transactionAmount: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'right',
      fontFamily: "RobotoCondensed-SemiBold",
      transform: [{ scaleY: 1.2 }],
    },
  });
  