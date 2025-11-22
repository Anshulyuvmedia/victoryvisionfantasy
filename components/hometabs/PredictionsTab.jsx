import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const PredictionsTab = ({ matchID }) => {
    const [apiData, setApiData] = useState({});

    useEffect(() => {
        if (!matchID) return;

        const fetchData = async () => {
            try {
                const res = await axios.get('https://api.victoryvision.live/api/get-matchprediction', {
                    params: { matchID }
                });
                if (res?.data?.data) setApiData(res.data.data);
            } catch (err) {
                console.error('Predictions error:', err);
            }
        };
        fetchData();
    }, [matchID]);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}        // THIS IS THE KEY
            bounces={true}
            overScrollMode="always"
        >
            <Text style={styles.header}>Match Predictions</Text>

            <View style={styles.row}>
                {/* Toss Winner */}
                <LinearGradient colors={['#9dc5f7', '#fff']} style={styles.gradient}>
                    <View style={styles.cardBlue}>
                        <Text style={styles.label}>Toss Winner</Text>
                        <Text style={styles.valueBlue}>{apiData?.tossWinner || '—'}</Text>
                        <Text style={styles.prob}>{apiData?.tossProbability ? `${apiData.tossProbability}%` : '—'}</Text>
                    </View>
                </LinearGradient>

                {/* First Innings */}
                <LinearGradient colors={['#df6a3a', '#fff']} style={styles.gradient}>
                    <View style={styles.cardOrange}>
                        <Text style={styles.label}>1st Innings Score</Text>
                        <Text style={styles.valueOrange}>{apiData?.predictedScore || '—'}</Text>
                        <Text style={styles.small}>Predicted</Text>
                    </View>
                </LinearGradient>
            </View>

            {/* Top Batsmen */}
            {apiData?.topBatsmen?.length > 0 && (
                <>
                    <Text style={styles.subheader}>Top Batsman Predictions</Text>
                    {apiData.topBatsmen.map((p, i) => (
                        <View key={i} style={styles.playerCard}>
                            <Text style={styles.playerName}>{p.name}</Text>
                            <Text style={styles.badge}>{p.points}+ Runs</Text>
                        </View>
                    ))}
                </>
            )}

            {/* Top Bowlers */}
            {apiData?.topBowlers?.length > 0 && (
                <>
                    <Text style={styles.subheader}>Top Bowler Predictions</Text>
                    {apiData.topBowlers.map((p, i) => (
                        <View key={i} style={styles.playerCard}>
                            <Text style={styles.playerName}>{p.name}</Text>
                            <Text style={styles.badge}>{p.wickets}+ Wickets</Text>
                        </View>
                    ))}
                </>
            )}

        </ScrollView>
    );
};

export default PredictionsTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,                    // Critical
        backgroundColor: '#fff',
    },
    content: {
        padding: 16,
        paddingBottom: 40,
    },
    header: {
        fontSize: 20,
        fontWeight: '800',
        color: '#222',
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    gradient: {
        flex: 1,
        padding: 1.5,
        borderRadius: 20,
    },
    cardBlue: {
        backgroundColor: '#e6f4ff',
        padding: 16,
        borderRadius: 18,
        alignItems: 'center',
    },
    cardOrange: {
        backgroundColor: '#fff4e6',
        padding: 16,
        borderRadius: 18,
        alignItems: 'center',
    },
    label: { fontSize: 13, color: '#666', marginBottom: 4 },
    valueBlue: { fontSize: 18, fontWeight: 'bold', color: '#1e88e5' },
    valueOrange: { fontSize: 18, fontWeight: 'bold', color: '#ef6c00' },
    prob: { fontSize: 13, color: '#444', marginTop: 4 },
    small: { fontSize: 12, color: '#888', marginTop: 4 },
    subheader: {
        fontSize: 17,
        fontWeight: '700',
        color: '#222',
        marginTop: 20,
        marginBottom: 12,
    },
    playerCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 10,
    },
    playerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    badge: {
        backgroundColor: '#fff',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        fontWeight: 'bold',
        color: '#2c3e50',
    },
});