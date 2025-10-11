import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Octicons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const OverallAnalysis = ({ analysisId }) => {
    console.log("Overall data : ", analysisId);
    const [isLoading, setisLoading] = useState(false);
    const [apiData, setapiData] = useState({});
    const [analysisData, setanalysisData] = useState({});

    const fetchAnalysis = async () => {
        try {
            const response = await axios.get(`http://13.203.214.179:3000/api/analysis-result`, {
                params: { analysisId }
            });
            console.log('Analysis Success:', response.data);

            const analysisObj = response.data.analysisResults.analysis || {};
            setanalysisData(Object.entries(analysisObj));
            setapiData(response.data.analysisResults);
            setisLoading(false);

        } catch (error) {
            console.error('Analysis failed:', error);
            setisLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalysis();
    }, []);

    return (
        isLoading ? (
            <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />
        ) : (
            <View style={styles.container}>
                <View style={styles.headerbox}>
                    <Ionicons name="search" size={24} color="black" />
                    <Text style={styles.header}>Overall Analysis</Text>
                </View>

                <FlatList
                    data={analysisData || []}
                    keyExtractor={([title], index) => `${title}-${index}`}
                    numColumns={2}
                    contentContainerStyle={styles.grid}
                    renderItem={({ item }) => {
                        const [title, value] = item;
                        return (
                            <View style={styles.card}>
                                <LinearGradient
                                    colors={['#ffe0b200', '#ffe1be']}
                                    start={{ x: 0.5, y: 1 }}
                                    end={{ x: 0, y: 0 }}
                                    style={styles.gradientBorder}
                                >
                                    <LinearGradient
                                        colors={['#fff8f1', '#fee5ca']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.gradientBackground}
                                    >
                                        <Text style={styles.cardTitle}>{title}</Text>
                                        <Text style={styles.cardValue}>{value}</Text>
                                    </LinearGradient>
                                </LinearGradient>
                            </View>
                        );
                    }}
                />

                {apiData?.strongPoints && (
                    <>
                        <View style={styles.strongPointsSection}>
                            <Text style={styles.strongPointsTitle}>Strong Points:</Text>
                            <View style={styles.bulletList}>
                                {apiData.strongPoints
                                    .split('.')
                                    .filter(point => point.trim().length > 0) // remove empty strings
                                    .map((point, index) => (
                                        <View key={index} style={styles.bulletItem}>
                                            <Octicons name="dot-fill" size={18} color="#101d4d" style={styles.bullet} />
                                            <Text style={styles.bulletText}>{point.trim()}.</Text>
                                        </View>
                                    ))}
                            </View>
                        </View>
                    </>
                )}
            </View>
        )
    );

};

export default OverallAnalysis;

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
        marginBottom: 20,
    },
    headerbox: {
        flexDirection: 'row',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        width: '48%',
        borderRadius: 8,
        margin: 3,
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
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
    },
    cardValue: {
        fontSize: 18,
        fontWeight: '800',
        color: '#101d4c',
    },
    cardText: {
        fontSize: 20,
        fontWeight: '800',
        color: '#101d4c',
    },
    strongPointsSection: {
        marginBottom: 20,
    },
    strongPointsTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#101d4c',
        marginBottom: 10,
    },
    bulletList: {
        marginLeft: 20,
    },
    bulletItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    bullet: {
        marginRight: 8,
    },
    bulletText: {
        fontSize: 14,
        color: '#000',
        flex: 1,
    },
});