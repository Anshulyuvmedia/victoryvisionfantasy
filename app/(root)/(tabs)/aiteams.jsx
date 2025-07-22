import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import React from 'react'
import Header from '@/components/Header';
import Aiteamconfig from '@/components/Aiteamconfig';
import AiGeneratedTeams from '@/components/AiGeneratedTeams';
import { Feather } from '@expo/vector-icons'; // Ensure this is installed

const AiTeams = () => {
    return (
        <View style={styles.container}>
            <Header />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <Aiteamconfig />
                </View>
                <View style={styles.section}>
                    <AiGeneratedTeams />
                </View>
            </ScrollView>
            <View style={styles.actionBox}>
                <TouchableOpacity
                    style={styles.chatButton}
                    onPress={() => console.log('Chat button pressed')} // Simplified handler
                >
                    <View style={styles.buttonContent}>
                        <Feather name="plus" size={24} color="#ea580c" />
                        <Text style={styles.buttonText}>Copy Team</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.chatButton}
                    onPress={() => console.log('Chat button pressed')} // Simplified handler
                >
                    <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>Bulk Copy Teams</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AiTeams

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f1f3',
    },
    scrollView: {
        padding: 15,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    section: {
        // marginBottom: 5,
    },
    actionBox: {
        position: 'absolute',
        bottom: 30,
        right: 10,
        width: "95%",
        borderRadius: 10,
        paddingBlock: 10,
        backgroundColor: '#ffffffcb',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    chatButton: {
        paddingInline: 20,
        paddingBlock: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#ea580c',
        backgroundColor: '#fff7ed',
        justifyContent: 'center',
        alignItems: 'center',
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
})