import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const CaptainAnalysis = () => {
    const [captains, setCaptains] = useState([
        {
            id: '1',
            name: 'MS Dhoni',
            matches: 50,
            wins: 40,
            points: '120 pts',
            winPercentage: '80%',
            successRate: 80,
            image: 'https://via.placeholder.com/40'
        },
        {
            id: '2',
            name: 'V Kohli',
            matches: 45,
            wins: 32,
            points: '95 pts',
            winPercentage: '71%',
            successRate: 71,
            image: 'https://via.placeholder.com/40'
        },
        {
            id: '3',
            name: 'R Sharma',
            matches: 40,
            wins: 25,
            points: '110 pts',
            winPercentage: '62%',
            successRate: 62,
            image: 'https://via.placeholder.com/40'
        },
        {
            id: '4',
            name: 'R Jadeja',
            matches: 35,
            wins: 20,
            points: '85 pts',
            winPercentage: '57%',
            successRate: 57,
            image: 'https://via.placeholder.com/40'
        },
    ]);

    // Determine best and need work players based on win percentage
    const bestChoicePlayer = captains.reduce((max, current) =>
        max.winPercentage > current.winPercentage ? max : current
    );
    const needWorkPlayer = captains.reduce((min, current) =>
        min.winPercentage < current.winPercentage ? min : current
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Captain Analysis</Text>

            {/* First Section: Success Rate with Progress Indicator */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Success Rate Overview</Text>
                <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>
                        Overall Success Rate: {Math.round(captains.reduce((sum, c) => sum + c.successRate, 0) / captains.length)}%
                    </Text>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${Math.round(captains.reduce((sum, c) => sum + c.successRate, 0) / captains.length)}%` }]} />
                    </View>
                </View>
            </View>

            {/* Second Section: Best Choice and Need Work Players */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Player Performance</Text>
                <View style={styles.playerComparison}>
                    <View style={styles.playerCard}>
                        <LinearGradient
                            colors={['#ffe0b200', '#53db83']}
                            start={{ x: 0.5, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            style={styles.gradientBorder}
                        >
                            <LinearGradient
                                colors={['#ebfff1', '#d6fde3']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.gradientBackground}
                            >
                                <Text style={styles.playerLabelBest}>Best Choice</Text>
                                <Text style={styles.playerName}>{bestChoicePlayer.name}</Text>
                            </LinearGradient>
                        </LinearGradient>
                    </View>
                    <View style={styles.playerCard}>
                        <LinearGradient
                            colors={['#ffe0b200', '#eb4865']}
                            start={{ x: 0.5, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            style={styles.gradientBorder}
                        >
                            <LinearGradient
                                colors={['#ffecf0', '#fbcbd4']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.gradientBackground}
                            >
                                <Text style={styles.playerLabel}>Need Work</Text>
                                <Text style={styles.playerName}>{needWorkPlayer.name}</Text>
                            </LinearGradient>
                        </LinearGradient>
                    </View>
                </View>
            </View>

            {/* Third Section: AI Insights */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>AI Insights</Text>
                <View style={styles.insightbox}>
                    <Text style={styles.title}>Strong Captain Choice</Text>
                    <Text style={styles.insightText}>
                        Based on current data, captains with higher win percentages (e.g., MS Dhoni at 80%) are recommended for upcoming matches. 
                    </Text>
                </View>
                <View style={styles.insightbox}>
                    <Text style={styles.title}>Strong Captain Choice</Text>
                    <Text style={styles.insightText}> Focus on improving selections for lower-performing captains like R Jadeja (57%). Optimize team composition with more all-rounders for balanced performance.
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default CaptainAnalysis;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginTop: 10,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 12,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    progressContainer: {
        padding: 10,
        backgroundColor: '#f0fdf4',
        borderRadius: 8,
    },
    progressText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    progressBar: {
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 5,
    },
    playerComparison: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    playerCard: {
        flex: 1,
        padding: 10,
        borderRadius: 15,
        marginHorizontal: 5,
    },
    playerLabelBest: {
        fontSize: 12,
        color: '#53db83',
        fontWeight: '600',
        marginBottom: 5,
    },
    playerLabel: {
        fontSize: 12,
        color: '#eb4865',
        fontWeight: '600',
        marginBottom: 5,
    },
    playerName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    playerStat: {
        fontSize: 12,
        color: '#666',
    },
    insightText: {
        fontSize: 12,
        color: '#666',
        lineHeight: 18,
    },
    gradientBorder: {
        padding: 1,
        borderRadius: 15,
    },
    gradientBackground: {
        padding: 12,
        borderRadius: 15,
    },
    insightbox: {
        backgroundColor: '#d8ffe4',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
    },
    title: {
        fontSize: 12,
        color: '#3aa460',
        fontWeight: 'bold'
    },
});