import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApi } from '../hooks/useApi';

const SummaryCard = () => {
    const { data, error, isLoading } = useApi<any>({
        endpoint: '/getTradingSummary',
        queryOptions: {
            enabled: true,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            refetchInterval: 5000,
        },
    });

    // Extract data or provide default values
    const summary = data?.data || {
        profit: 0.0,
        deposit: 0.0,
        swap: 0.0,
        commission: 0.0,
        balance: 0.0,
    };

    const renderRow = (label, value, isNegative) => (
        <View style={styles.row}>
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.dots}>..........................................</Text>
            <Text style={[styles.value, isNegative && styles.negativeValue]}>
                {parseFloat(value).toFixed(2)}
            </Text>
        </View>
    );

    if (isLoading) {
        return <Text style={styles.loading}>Loading...</Text>;
    }

    if (error) {
        return <Text style={styles.error}>Error loading data</Text>;
    }

    return (
        <View style={styles.container}>
            {renderRow('Profit', summary.profit, parseFloat(summary.profit) < 0)}
            {renderRow('Deposit', summary.deposit, false)}
            {renderRow('Swap', summary.swap, false)}
            {renderRow('Commission', summary.commission, false)}
            {renderRow('Balance', summary.balance, parseFloat(summary.balance) < 0)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 0,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        flex: 2,
        fontFamily: "trebuc",
    },
    dots: {
        fontSize: 15,
        color: '#ddd',
        flex: 4,
        textAlign: 'center',
    },
    value: {
        fontSize: 15,
        color: '#000',
        flex: 1,
        textAlign: 'right',
        fontWeight: 'bold',
        fontFamily: "trebuc",
    },
    negativeValue: {
        color: 'red',
        fontFamily: "trebuc",
    },
    loading: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
    },
    error: {
        fontSize: 16,
        textAlign: 'center',
        color: 'red',
        fontFamily: "trebuc",
    },
});

export default SummaryCard;
