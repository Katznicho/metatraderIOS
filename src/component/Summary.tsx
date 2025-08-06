import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useApi } from '../hooks/useApi';

const formatBalance = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    })
      .format(value)
      .replace(/,/g, ' '); // Replace commas with spaces
  };

export default function Summary({totalProfit}:any) {

      const { data, error, isLoading } = useApi<any>({
        endpoint: '/getTradingSummary',
        queryOptions: {
          enabled: true,
          refetchOnWindowFocus: true,
          refetchOnMount: true,
          refetchInterval: 5000,
        },
      });



      
    return (
        <View style={[styles.summary, { marginVertical: 30, borderTopColor: '#DDD', borderBottomColor: '#DDD', borderTopWidth: 1, borderBottomWidth: 1 }]}>
            <View style={styles.centeredText}>
                <Text style={styles.label}>Deposit</Text>
                <Text style={styles.value}>{formatBalance(data?.data?.deposit)}</Text>
            </View>
            <View style={styles.centeredText}>
                <Text style={styles.label}>Withdrawal</Text>
                <Text style={styles.value}>{formatBalance(data?.data?.withdrawal)}</Text>
            </View>
            <View style={styles.centeredText}>
                <Text style={styles.label}>Profit</Text>
                <Text style={styles.value}>{formatBalance(totalProfit)}</Text>
            </View>
            <View style={styles.centeredText}>
                <Text style={styles.label}>Swap</Text>
                <Text style={styles.value}>{formatBalance(data?.data?.swap)}</Text>
            </View>
            <View style={styles.centeredText}>
                <Text style={styles.label}>Commission</Text>
                <Text style={styles.value}>{formatBalance(data?.data?.commission)}</Text>
            </View>
            <View style={styles.centeredText}>
                <Text style={styles.label}>Balance</Text>
                <Text style={styles.value}>{formatBalance(parseFloat(data?.data?.deposit) + parseFloat(totalProfit) + parseFloat(data?.data?.withdrawal))}</Text>
            </View>
        </View>
    )
}

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
        fontWeight: '500',
        
    },
    profit: {
        fontSize: 14.5,
        fontWeight: 'bold',
    },
    subText: {
        fontSize: 12,
        color: 'gray',
        fontFamily: "trebuc",
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
        fontFamily: "trebuc",
        // textAlign: 'center',
        justifyContent: "space-between",
        marginBottom: 6,
    },
    label: {
        fontSize: 16,
        // fontWeight: 'bold',
        color: '#000',
        fontFamily: "trebuc",
    },
    value: {
        fontSize: 16.5,
        fontWeight: '500',
        color: '#000',
        fontFamily: "trebuc",
    },
});