import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import React from 'react';
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
                    <FantasyTracker />
                </View>
                <View style={styles.section}>
                    <OverallAnalysis />
                </View>
            </ScrollView>
            <TouchableOpacity
                style={styles.chatButton}
                onPress={() => console.log('Chat button pressed')} // Simplified handler
            >
                <View style={styles.buttonContent}>
                    <MaterialCommunityIcons name="robot-excited-outline" size={20} color="#ea580c" />
                    <Text style={styles.buttonText}>Chat With AI</Text>
                </View>
            </TouchableOpacity>
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
    chatButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        width: "90%", // Increased width to fit text
        height: 50,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#ea580c',
        backgroundColor: '#fff7ed',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ea580c',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8, // Space between icon and text
    },
});