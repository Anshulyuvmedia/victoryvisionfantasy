import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext } from 'react';
import { GlobalContextReport } from '../app/GlobalContextReport';

const PerformanceSummery = () => {
    const { apiData } = useContext(GlobalContextReport);

    // Log for debugging
    console.log('apiData:', apiData);

    // Show loading state if apiData is null
    if (!apiData) {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Performance Summary</Text>
                <Text>Right now data is dummy.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerbox}>
                <Text style={styles.header}>Performance Summary</Text>
            </View>
            <View style={styles.grid}>
                <View style={styles.card}>
                    <LinearGradient
                        colors={['#ffe0b200', '#ffe1be']}
                        start={{ x: 0.5, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        style={styles.gradientBorder}
                    >
                        <LinearGradient
                            colors={['#fefaf6', '#fde8d0']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradientBackground}
                        >
                            <Text style={styles.cardValue}>{apiData.netProfit ?? '-'}</Text>
                            <Text style={styles.cardTitle}>Net Profit</Text>
                            <Text style={styles.cardValue}>156</Text>
                            <Text style={styles.cardTitle}>Contest Played</Text>
                        </LinearGradient>
                    </LinearGradient>
                </View>
                <View style={styles.card}>
                    <LinearGradient
                        colors={['#bbdefb00', '#fbc2cd']}
                        start={{ x: 0.5, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        style={styles.gradientBorder}
                    >
                        <LinearGradient
                            colors={['#ffecf0', '#fbc2cd']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradientBackground}
                        >
                            <Text style={styles.cardValue}>{apiData.winRate ? `${apiData.winRate}%` : '-'}</Text>
                            <Text style={styles.cardTitle}>Winning Rate</Text>
                            <Text style={styles.cardValue}>{apiData.avgRank ?? '-'}</Text>
                            <Text style={styles.cardTitle}>Avg Rank</Text>
                        </LinearGradient>
                    </LinearGradient>
                </View>
            </View>
        </View>
    );
};

export default PerformanceSummery;

// Styles remain the same
const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginTop: 10,
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    headerbox: {
        flexDirection: 'row',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        borderRadius: 8,
        overflow: 'hidden',
    },
    gradientBorder: {
        padding: 1,
        borderRadius: 15,
    },
    gradientBackground: {
        padding: 12,
        borderRadius: 15,
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: '400',
        color: '#000',
        marginBottom: 8,
    },
    cardValue: {
        fontSize: 25,
        fontWeight: '800',
        color: '#101d4c',
    },
});