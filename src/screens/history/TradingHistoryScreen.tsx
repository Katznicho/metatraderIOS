import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Platform, Image, TouchableOpacity } from 'react-native';
import { useApi } from '../../hooks/useApi';
import Summary from '../../component/Summary';

const TradingHistoryScreen = () => {

  const { data, error, isLoading } = useApi<any>({
    endpoint: '/getHistory',
    queryOptions: {
      enabled: true,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchInterval: 5000,
    },
  });

  const navigation = useNavigation<any>();

  // const [totalProfit , setTotalProfile] =  useState<any>(0)
  const [totalProfit, setTotalProfit] = useState<number>(0);

  useEffect(() => {
    if (data?.data) {
      const total = data.data
        .filter((item: any) => item.pairs !== 'Balance') // Exclude 'Balance' pairs
        .reduce((sum: number, item: any) => sum + (item.profit || 0), 0); // Sum profits

      setTotalProfit(parseFloat(total.toFixed(2))); // Format to 2 decimal places
    }
  }, [data]); // Runs when `data` changes

  // console.log('totalProfit', totalProfit)

  const formatProfit = (value: number) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).replace(/,/g, ' ');
  };



  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {Platform.OS === 'ios' && <View style={{ height: StatusBar.currentHeight || 40 }} />}
      <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('HistoryDaysScreen')}>
        <Image
          source={require('../../assets/header_history.jpeg')}
          style={styles.headerImage}
        />

      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Transaction Data */}
        {data?.data?.map((item, index) => {
          // Determine border color based on item.color
          const borderColor =
            item.color === 'tp' ? '#41BE57' :
              item.color === 'sl' ? '#EF5350' :
                'transparent';

          return (
            <View
              key={index}
              style={[
                // styles.row,
                styles.border,
                { borderLeftWidth: item.color ? 3 : 0, borderLeftColor: borderColor }
              ]}
            >
              <View style={styles.row}>
                <View style={styles.rowHeader}>
                  <Text style={[styles.text, { color: '#000' }]}>
                    {item.pairs}{' '}
                    {item.pairs !== 'Balance' && (
                      <Text style={{ color: item.type === 'buy' ? '#0D71F3' : '#EF5350' }}>
                        {item?.type} {item?.volume}
                      </Text>
                    )}
                  </Text>
                  <Text
                    style={[
                      styles.profit,
                      { color: item.profit < 0 ? '#EF5350' : '#0D71F3' }
                    ]}
                  >
                    {formatProfit(item?.profit ?? 0)}
                  </Text>
                </View>
                <View style={styles.rowFooter}>
                  <Text style={styles.subText}>{item?.price_range}</Text>
                  <Text style={styles.subText}>{item?.time}</Text>
                </View>

              </View>



            </View>
          );
        })}


        {/* Summary */}
        <Summary totalProfit={totalProfit} />
        {/* summary */}
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
  headerImage: {
    width: '100%',
    height: 80,
    resizeMode: 'contain',
  },
  scrollView: {
    paddingHorizontal: 5,
    paddingBottom: 20,
  },
  row: {
    marginBottom: 5,
    paddingVertical: 5,
    paddingLeft: 5,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowFooter: {
    marginTop: 2.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 17.25,
    fontWeight: '700',
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.2 }]
  },
  profit: {
    fontSize: 19,
    fontWeight: 'bold',
    // letterSpacing: 1.2,
    fontFamily: "RobotoCondensed-SemiBold",
    transform: [{ scaleY: 1.43 }],
  },
  subText: {
    fontSize: 14,
    color: 'gray',
    // fontFamily: "trebuc",
    fontFamily: "trebuc",
    transform: [{ scaleY: 1.25 }],
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
    fontFamily: "RobotoCondensed-SemiBold",
    // textAlign: 'center',
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#000',
    // fontFamily: "trebuc",
    fontFamily: "trebuc",
    transform: [{ scaleY: 1.2 }],
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    // fontFamily: "trebuc",
    fontFamily: "trebuc",
    transform: [{ scaleY: 1.2 }],
  },
  border: {
    marginLeft: -5,
  },
});

export default TradingHistoryScreen;