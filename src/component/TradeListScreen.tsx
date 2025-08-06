import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useApi } from '../hooks/useApi';

const TradeListScreen = () => {
  const trades = [
    { pair: 'USDJPYm', type: 'buy', lotSize: 0.02, open: 157.374, close: 157.169, time: '2024.12.20 05:33:58', profit: -2.61 },
    { pair: 'USDJPYm', type: 'sell', lotSize: 0.02, open: 157.374, close: 157.169, time: '2024.12.20 05:33:57', profit: -2.61 },
    { pair: 'USDJPYm', type: 'buy', lotSize: 0.02, open: 157.374, close: 157.170, time: '2024.12.20 05:33:59', profit: -2.60 },
    { pair: 'USDJPYm', type: 'sell', lotSize: 0.02, open: 157.374, close: 157.170, time: '2024.12.20 05:33:59', profit: -2.60 },
  ];

    const { data, error, isLoading } = useApi<any>({
      endpoint: '/getHistory',
      queryOptions: {
        enabled: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchInterval: 5000,
      },
    });



  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data?.data?.map((item, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.leftSection}>
            <Text style={styles.pair}>
              {item?.pairs}, <Text style={[styles.type, item?.type === 'sell' && styles.sell]}>{item?.type} {item?.volume}</Text>
            </Text>
            <Text style={styles.prices}>
              {item?.price_range}
            </Text>
          </View>
          <View style={styles.rightSection}>
            <Text style={styles.time}>{item?.time}</Text>
            <Text 
            style={[
                styles.profit,
                 item?.type === 'sell' && styles.sell,
                 { color: item.profit < 0 ? '#DE4949' : '#0D71F3' }

            ]}
            >
                {item?.profit}
                </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  leftSection: {
    flex: 2,
  },
  pair: {
    fontSize: 14.5,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.3 }],
  },
  type: {
    color: '#0D71F3',
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.3 }],
  },
  sell: {
    color: '#DE4949',
    fontFamily: "trebuc",
  },
  prices: {
    fontSize: 14.5,
    color: '#666',
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.3 }],
  },
  rightSection: {
    alignItems: 'flex-end',
    flex: 1,
  },
  time: {
    fontSize: 12,
    color: '#666',
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.3 }],
  },
  profit: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.3 }],
  },
});

export default TradeListScreen;
