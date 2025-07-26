import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalContextReport } from '../app/GlobalContextReport';
import { useContext } from 'react';

const CaptainAnalysis = () => {
    const { apiData } = useContext(GlobalContextReport);
    const [captainAnalysis, setCaptainAnalysis] = useState([]);

    useEffect(() => {
        if (apiData?.captainAnalysis?.length > 0) {
            const formatted = apiData.captainAnalysis.map((item) => ({
                ...item,
                _id: typeof item._id === 'object' && item._id.$oid ? item._id.$oid : item._id
            }));
            setCaptainAnalysis(formatted);
        }
    }, [apiData]);

    // Calculate average success rate from captainAnalysis
    const avgSuccessRate = captainAnalysis.length > 0
        ? Math.round(captainAnalysis.reduce((sum, c) => sum + c.successRate, 0) / captainAnalysis.length)
        : 0;

    // Get best choice and need work players from playerPerformance
    const bestChoicePlayer = apiData?.playerPerformance?.bestChoice || { player: 'N/A', successRate: 0 };
    const needWorkPlayer = apiData?.playerPerformance?.needWork || { player: 'N/A', successRate: 0 };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Captain Analysis</Text>

            {/* First Section: Success Rate with Progress Indicator */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Success Rate Overview</Text>
                <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>
                        Overall Success Rate: {avgSuccessRate}%
                    </Text>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${avgSuccessRate}%` }]} />
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
                                <Text style={styles.playerName}>{bestChoicePlayer.player}</Text>
                                <Text style={styles.playerStat}>Success Rate: {bestChoicePlayer.successRate}%</Text>
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
                                <Text style={styles.playerName}>{needWorkPlayer.player}</Text>
                                <Text style={styles.playerStat}>Success Rate: {needWorkPlayer.successRate}%</Text>
                            </LinearGradient>
                        </LinearGradient>
                    </View>
                </View>
            </View>

            {/* Third Section: AI Insights */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>AI Insights</Text>
                {apiData?.aiInsights?.map((insight, index) => (
                    <View key={index} style={styles.insightbox}>
                        <Text style={[styles.title, { color: insight.colorCode || '#3aa460' }]}>
                            Recommendation
                        </Text>
                        <Text style={styles.insightText}>
                            {insight.suggestion}
                        </Text>
                    </View>
                ))}
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
        fontWeight: 'bold'
    },
});