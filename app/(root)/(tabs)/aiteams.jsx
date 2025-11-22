import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Aiteamconfig from '@/components/Aiteamconfig';
import AiGeneratedTeams from '@/components/AiGeneratedTeams';
import { Feather } from '@expo/vector-icons';

const AiTeams = () => {
    const [userAITeams, setuserAITeams] = useState('');

    // Data for FlatList sections
    const sections = [
        {
            id: 'config',
            component: <Aiteamconfig setuserAITeams={setuserAITeams} />,
            title: 'Configure AI Team',
        },
        {
            id: 'teams',
            component: <AiGeneratedTeams userAITeams={userAITeams} />,
            title: 'Your AI Generated Teams',
        },
    ];

    const renderSection = ({ item }) => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <View style={styles.sectionContent}>
                {item.component}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header />

            <FlatList
                data={sections}
                renderItem={renderSection}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            {/* Floating Action Buttons */}
            {/* <View style={styles.fabContainer}>
                <TouchableOpacity style={styles.fabButton} onPress={() => console.log('Copy Team')}>
                    <Feather name="copy" size={22} color="#ea580c" />
                    <Text style={styles.fabText}>Copy Team</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.fabButton} onPress={() => console.log('Bulk Copy')}>
                    <Feather name="copy" size={22} color="#ea580c" />
                    <Text style={styles.fabText}>Bulk Copy Teams</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
};

export default AiTeams;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f1f3',
    },
    listContent: {
        padding: 16,
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1a1a1a',
        marginBottom: 12,
        paddingLeft: 4,
    },
    sectionContent: {
        // backgroundColor: '#fff',
        // borderRadius: 16,
        overflow: 'hidden',
        // elevation: 6,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.08,
        // shadowRadius: 10,
    },

    // FAB Container (Floating Action Buttons)
    fabContainer: {
        position: 'absolute',
        bottom: 28,
        left: 16,
        right: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#ffffffee',
        borderRadius: 50,
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.18,
        shadowRadius: 12,
        borderWidth: 1,
        borderColor: '#fed7aa',
    },
    fabButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff7ed',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 30,
        borderWidth: 1.5,
        borderColor: '#fb923c',
    },
    fabText: {
        color: '#ea580c',
        fontSize: 15,
        fontWeight: '700',
        marginLeft: 10,
    },
});