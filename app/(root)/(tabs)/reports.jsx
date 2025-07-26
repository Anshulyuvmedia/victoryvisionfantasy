import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';

import React from 'react'
import Header from '@/components/Header';
import PerformanceSummery from '@/components/PerformanceSummery';
import YouTopPlayerPicks from '@/components/YouTopPlayerPicks';
import CaptainAnalysis from '@/components/CaptainAnalysis';


const Reports = () => {

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerbox} >
                    <View style={styles.header}>
                        <View style={styles.titleBox}>
                            <Text style={styles.title}>Performance Report</Text>
                        </View>
                        <Text>IPL 2025</Text>
                    </View>

                    <View style={styles.section}>
                        <PerformanceSummery />
                    </View>
                    <View style={styles.section}>
                        <YouTopPlayerPicks />
                    </View>
                    <View style={styles.section}>
                        <CaptainAnalysis />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Reports

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f1f3',
    },
    headerbox: {
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    playerheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000',
    },

    scrollView: {
        padding: 15,
    },
    scrollContent: {
        paddingBottom: 80, // Accommodate the fixed button
    },
    section: {
        marginBottom: 20,
    },
});