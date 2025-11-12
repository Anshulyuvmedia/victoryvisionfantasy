import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Octicons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const OverallAnalysis = ({ analysisId }) => {
    console.log("Overall data : ", analysisId);
    const analysismainid = analysisId._id;
    const [isLoading, setisLoading] = useState(false);
    const [apiData, setapiData] = useState({});
    const [analysisData, setanalysisData] = useState([]);
    const [error, setError] = useState(null); // New: For error display

    const fetchAnalysis = async () => {
        setisLoading(true);
        setError(null); // Reset error
        console.log('Fetching with ID:', analysismainid); // Debug log
        try {
            const response = await axios.get(`https://api.victoryvision.live/api/analysis-result`, {
                params: { analysismainid }
            });
            console.log('Analysis Success:', response.data);

            const analysisObj = response.data.analysisResults?.analysis || {}; // Safer chaining
            const entries = Object.entries(analysisObj);
            console.log('Processed entries:', entries); // Debug: Check if entries is populated
            setanalysisData(entries);
            setapiData(response.data.analysisResults);
            setisLoading(false);

        } catch (error) {
            console.error('Analysis failed:', error);
            setError('Failed to load analysis. Check connection or ID.'); // User-friendly
            setisLoading(false);
        }
    };

    useEffect(() => {
        if (analysismainid) { // Guard: Only fetch if ID exists
            fetchAnalysis();
        } else {
            console.warn('No analysismainid provided'); // Debug
            setError('Invalid analysis ID');
        }
    }, []); // Note: If analysisId changes, add [analysisID] dependency

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

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
                    data={analysisData}
                    keyExtractor={([title], index) => title || `item-${index}`} // Improved: Use title if available
                    numColumns={2}
                    contentContainerStyle={styles.grid}
                    ListEmptyComponent={<Text style={styles.emptyText}>No analysis data available</Text>} // New: Empty state
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
                                    .filter(point => point.trim().length > 0)
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

// ... (styles unchanged, but add these new ones)
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
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        padding: 20,
    },
});