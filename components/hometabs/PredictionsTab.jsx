import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';


const PredictionsTab = ({ onContentHeightChange ,matchID }) => {
    const [matchId, setmatchId] = useState('');
    const [apiData, setapiData] = useState({});

    const handleLayout = useCallback(
        (event) => {
            if (onContentHeightChange) {
                const { height } = event.nativeEvent.layout;
                onContentHeightChange(height); // Pass the measured height to the parent
            }
        },
        [onContentHeightChange]
    );

    // Fetch Match Predictions Data here by matching  Match ID..............
    useEffect(() => {
        const fetchMatchPredictions = async (matchID) => {
            try {
                const response = await axios.get(`http://13.203.214.179:3000/api/get-matchprediction`, {
                    params: { matchID }
                });
                // console.log(`Response: ${JSON.stringify(response.data, null, 2)}`);
                if (response && response.data) {
                    setapiData(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching Match Predictions data:', error);
            }
        };
        fetchMatchPredictions(matchID);
    }, []);
    return (
        <View style={styles.container} onLayout={handleLayout}>
            <Text style={styles.header}>Match Predictions</Text>
            <View style={styles.matchsection}>
                <LinearGradient
                    colors={['#9dc5f7', '#fff']}
                    style={styles.gradientBorder}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <TouchableOpacity style={styles.card}>
                        <Text>Toss Winner</Text>
                        <Text style={styles.highlighttext}>{apiData?.tossWinner}</Text>
                        <Text>{apiData?.tossProbability}% Probability</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient
                    colors={['#df6a3a', '#fff']}
                    style={styles.gradientBorder}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <TouchableOpacity style={styles.cardOrange}>
                        <Text>First Innings Score</Text>
                        <Text style={styles.highlighttextorange}>{apiData?.predictedScore}</Text>
                        <Text>Predicted Range</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>

            {apiData?.topBatsmen && (
                <>
                    <Text style={styles.subheader}>Top Batsman Predictions</Text>
                    <View style={styles.section}>
                        {apiData.topBatsmen.map((batsman, index) => (
                            <View style={styles.cardGray} key={index}>
                                <Text>{batsman.name}</Text>
                                <Text style={styles.highlight}>{batsman.points}+ Runs</Text>
                            </View>
                        ))}
                    </View>
                </>
            )}
            {apiData?.topBowlers && (
                <>
                    <Text style={styles.subheader}>Top Bowler Predictions</Text>
                    <View style={styles.section}>
                        {apiData.topBowlers.map((bowler, index) => (
                            <View style={styles.cardGray} key={index}>
                                <Text>{bowler.name}</Text>
                                <Text style={styles.highlight}>{bowler.wickets}+ Wickets</Text>
                            </View>
                        ))}
                    </View>
                </>
            )}
        </View>
    );
};

export default PredictionsTab;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 18,
        marginTop: 10,
    },
    gradientBorder: {
        flex: 1,
        padding: 1,
        borderRadius: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subheader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    matchsection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    section: {
        flexDirection: 'col',
        justifyContent: 'space-between',
        marginBottom: 15,

    },
    card: {
        backgroundColor: '#e6f0fa',
        padding: 15,
        borderRadius: 20,
        width: '95%',
        alignItems: 'start',
    },
    cardOrange: {
        backgroundColor: '#ffe6cc',
        padding: 15,
        borderRadius: 20,
        width: '100%',
        alignItems: 'start',
    },
    cardGray: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 20,
        paddingInline: 10,

    },
    highlight: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
        backgroundColor: 'white',
        paddingInline: 10,
        borderRadius: 10,
    },
    highlighttext: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
        color: '#4a93f0',
    },
    highlighttextorange: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
        color: '#df6a3a',
    },
});