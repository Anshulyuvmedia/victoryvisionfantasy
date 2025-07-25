import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import FantasyTracker from '@/components/FantasyTracker';
import OverallAnalysis from '@/components/OverallAnalysis';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Ensure this is installed

const Points = () => {
    return (
        <View style={styles.container}>
            <Header />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <FantasyTracker/>
                </View>
            </ScrollView>
        </View>
    );
};

export default Points;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f1f3',
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