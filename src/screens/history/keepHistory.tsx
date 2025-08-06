import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Platform } from 'react-native';

const TradingHistoryScreen = () => {
  const data = [
    //balance
    {pairs:"Balance", type: 'buy', volume: 0.5, profit: 1538.53, priceRange: 'D-Trial-USD-INT-a5ddcfnfbfn', time: '2024.12.05 19:17:39' },
    //balance
    {pairs:"XBTUSD", type: 'buy', volume: 0.5, profit: 55.95, priceRange: '2627.900 → 2629.019', time: '2024.12.05 19:17:39' },
    {pairs:"XAUUSDm", type: 'buy', volume: 0.5, profit: 56.95, priceRange: '2627.900 → 2629.039', time: '2024.12.05 19:17:41' },
    {pairs:"XAUUSDm", type: 'sell', volume: 0.5, profit: -154.35, priceRange: '2627.832 → 2629.039', time: '2024.12.05 19:17:41' },
    { pairs:"XAUUSDm",type: 'buy', volume: 0.5, profit: 58.20, priceRange: '2627.875 → 2629.039', time: '2024.12.05 19:17:41' },
    {pairs:"BTCUSDm", type: 'sell', volume: 0.25, profit: -129.60, priceRange: '2629.720 → 2630.504', time: '2024.12.05 20:41:11' },
    {pairs:"XAUUSDm", type: 'buy', volume: 0.25, profit: 26.33, priceRange: '2629.282 → 2630.335', time: '2024.12.05 20:41:13' },
    {pairs:"XAUUSDm", type: 'buy', volume: 0.5, profit: 55.95, priceRange: '2627.900 → 2629.019', time: '2024.12.05 19:17:39' },
    {pairs:"XAUUSDm", type: 'sell', volume: 0.5, profit: -1000.95, priceRange: '2627.900 → 2629.039', time: '2024.12.05 19:17:41' },
    {pairs:"XAUUSDm", type: 'sell', volume: 0.5, profit: -60.35, priceRange: '2627.832 → 2629.039', time: '2024.12.05 19:17:41' },
    { pairs:"XAUUSDm",type: 'buy', volume: 0.5, profit: 58.20, priceRange: '2627.875 → 2629.039', time: '2024.12.05 19:17:41' },
    {pairs:"BTCUSDm", type: 'sell', volume: 0.25, profit: -19.60, priceRange: '2629.720 → 2630.504', time: '2024.12.05 20:41:11' },
    {pairs:"XAUUSDm", type: 'buy', volume: 0.25, profit: 26.33, priceRange: '2629.282 → 2630.335', time: '2024.12.05 20:41:13' },
    {pairs:"BTCUSDm", type: 'buy', volume: 0.5, profit: 55.95, priceRange: '2627.900 → 2629.019', time: '2024.12.05 19:17:39' },
    {pairs:"XAUUSDm", type: 'buy', volume: 0.5, profit: 56.95, priceRange: '2627.900 → 2629.039', time: '2024.12.05 19:17:41' },
    {pairs:"XAUUSDm", type: 'buy', volume: 0.5, profit: 60.35, priceRange: '2627.832 → 2629.039', time: '2024.12.05 19:17:41' },
    { pairs:"XAUUSDm",type: 'buy', volume: 0.5, profit: 58.20, priceRange: '2627.875 → 2629.039', time: '2024.12.05 19:17:41' },
    {pairs:"XAUUSDm", type: 'sell', volume: 0.25, profit: -139.60, priceRange: '2629.720 → 2630.504', time: '2024.12.05 20:41:11' },
    {pairs:"XAUUSDm", type: 'buy', volume: 0.25, profit: 26.33, priceRange: '2629.282 → 2630.335', time: '2024.12.05 20:41:13' },
  ];

  const summary = {
    deposit: 508642.85,
    withdrawal: -450000.0,
    profit: 634.59,
    swap: 0.0,
    commission: 0.0,
    balance: 59277.44,
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {Platform.OS === 'ios' && <View style={{ height: StatusBar.currentHeight || 40 }} />}
    
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Transaction Data */}
        {data.map((item, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.rowHeader}>
              <Text style={[styles.text, { color: '#000' }]}>
                {item.pairs} {' '}
                {item.pairs !=='Balance' &&(
                                  <Text style={{color: item.type === 'buy' ? '#0D71F3' : '#DE4949'}}>{item.type} {item.volume}</Text>

                )}

                 
              </Text>
              <Text style={[styles.profit, { color: item.type === 'sell' ? '#DE4949' : '#0D71F3' }]}>
                {item.profit.toFixed(2)}
              </Text>
            </View>
            <View style={styles.rowFooter}>
              <Text style={styles.subText}>{item.priceRange}</Text>
              <Text style={styles.subText}>{item.time}</Text>
            </View>
          </View>
        ))}

        {/* Summary */}
        <View style={[styles.summary, { marginVertical: 30, borderTopColor: '#DDD', borderBottomColor: '#DDD',  borderTopWidth: 1, borderBottomWidth: 1 }]}>
          <View style={styles.centeredText}>
            <Text>Deposit</Text>
             <Text style={styles.value}>{summary.deposit.toFixed(2)}</Text>
          </View>
          {/* <View style={styles.centeredText}>
            <Text>Withdrawal</Text>
            <Text style={styles.value}>{summary.withdrawal.toFixed(2)}</Text>
          </View> */}
          <View style={styles.centeredText}>
            <Text>Profit</Text>
             <Text style={styles.value}>{summary.profit.toFixed(2)}</Text>
          </View>
          <View style={styles.centeredText}>
            <Text>Swap</Text>
            <Text style={styles.value}>{summary.swap.toFixed(2)}</Text>
          </View>
          <View style={styles.centeredText}>
            <Text>Commission</Text>
            <Text style={styles.value}>{summary.commission.toFixed(2)}</Text>
          </View>
          <View style={styles.centeredText}>
            <Text>Balance</Text>
            <Text style={styles.value}>{summary.balance.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    paddingHorizontal: 5,
    paddingBottom: 20,
  },
  row: {
    marginBottom: 8,
    paddingVertical: 5,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowFooter: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14.5,
    fontWeight: '700',
    // letterSpacing: 2,
    // transform: [{ scaleX: 2.5 }],
    //lineHeight: 40,
    // letterSpacing: 0.2,
    fontFamily:"trebuc",
    // fontFamily: Platform.select({
    //     ios: 'Trebuchet-MS-Italic', 
    //     android: 'Roboto', 
    //     default: 'sans-serif', 
    //   }),
  },
  profit: {
    fontSize: 14.5,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 12,
    color: 'gray',
    fontFamily:"trebuc",
  },
  summary: {
    marginTop: 5,
    paddingVertical: 5,
    // alignItems: 'center',
    // backgroundColor: '#f8f8f8',
  },
  centeredText: {
    flexDirection: 'row',
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
    fontFamily:"trebuc",
    // textAlign: 'center',
    justifyContent: "space-between",
    marginBottom: 6,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    fontFamily:"trebuc",
  },
});

export default TradingHistoryScreen;
