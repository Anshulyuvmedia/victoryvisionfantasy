import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';


const AiGeneratedTeams = () => {
    const [apiData, setApiData] = useState([]);
    console.log(apiData);
    const [players, setPlayers] = useState([]);
    // const [copiedText, setCopiedText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchGeneratedAiTeams = async () => {
        try {
            const storedData = await AsyncStorage.getItem('userData');
            const parsedData = storedData ? JSON.parse(storedData) : {};
            const userid = parsedData.userid;
            // console.log("USER DATA AI: ", parsedData.userid);
            const response = await axios.get(`http://192.168.1.159:3000/api/get-ai-teams`, {
                params: { userid }
            });
            // console.log('API Response:', response.data);

            // Handle the case where results is an object with a players array
            const results = response.data.results;
            // console.log("results :", results);

            let processedTeams = [];

            if (results && results.players && Array.isArray(results.players)) {
                // Process single team
                const players = results.players;
                setPlayers(players);

                // Calculate role counts
                const roleCounts = players.reduce(
                    (acc, player) => {
                        if (player.role === 'WK') acc.wk += 1;
                        else if (player.role === 'BAT') acc.bat += 1;
                        else if (player.role === 'AR') acc.ar += 1;
                        else if (player.role === 'BOW') acc.bow += 1;
                        return acc;
                    },
                    { wk: 0, bat: 0, ar: 0, bow: 0 }
                );

                // Find captain and vice-captain
                const captain = players.find(player => player.isCaptain) || {};
                const viceCaptain = players.find(player => player.isViceCaptain) || {};

                // Calculate total points
                const totalPoints = players.reduce((sum, player) => sum + (player.points || 0), 0);

                // Create team object
                processedTeams = [{
                    id: '1',
                    name: 'Team 1',
                    initial: '1',
                    ...roleCounts,
                    captain: captain.name || 'Not selected',
                    captainStats: `${captain.points || 0} pts`,
                    captainImage: captain.image || 'https://via.placeholder.com/40',
                    viceCaptain: viceCaptain.name || 'Not selected',
                    viceCaptainStats: `${viceCaptain.points || 0} pts`,
                    viceCaptainImage: viceCaptain.image || 'https://via.placeholder.com/40',
                    teamPoints: totalPoints,
                    dtPlayers: players.length,
                    zone: totalPoints > 1000 ? 'Winning' : totalPoints > 800 ? 'Competitive' : 'Chasing',
                    teamNumber: 1,
                    teamId : results._id
                }];
            } else {
                console.warn('No valid players array found in response.data.results');
            }

            setApiData(processedTeams);
        } catch (error) {
            console.error('Failed to fetch AI teams:', error);
        }
    };

    // Handle copy team button press
    const handleCopyTeam = async () => {
        const playerJSON = players.map(player => JSON.stringify(player, null, 2)).join(',\n');
        await Clipboard.setStringAsync(playerJSON);
        // console.log("Copied Player JSON:\n", playerJSON);
    };

    useEffect(() => {
        fetchGeneratedAiTeams();
    }, []);

    const filteredTeams = apiData.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderTeamCard = ({ item }) => (
        <View style={styles.card}>
            <LinearGradient
                colors={['#f0f4ff80', '#ffffff00']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground}
            >
                <View style={styles.cardHeader}>
                    <View style={styles.statsContainer}>
                        <Text style={styles.statText}>WK: {item.wk}</Text>
                        <Text style={styles.statText}>BAT: {item.bat}</Text>
                        <Text style={styles.statText}>AR: {item.ar}</Text>
                        <Text style={styles.statText}>BOW: {item.bow}</Text>
                    </View>
                    <View style={styles.teamInfo}>
                        <Text style={styles.teamNumber}>T{item.id}</Text>
                        <TouchableOpacity style={styles.arrowButton} onPress={() => router.push(`/(root)/playerlist/${item.teamId}`)}>
                            <Feather name="arrow-up-right" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <LinearGradient
                    colors={['#f0f4ff00', '#31ae5f']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientBorder}
                >
                    <View style={styles.cardContent}>
                        <View style={styles.playerSection}>
                            <View style={styles.playerRow}>
                                <Text style={styles.playerTitleCap}>C</Text>
                                <Image source={{ uri: item.captainImage }} style={styles.playerImage} />
                                <View style={styles.playerDetails}>
                                    <Text style={styles.playerName}>{item.captain}</Text>
                                    <View style={styles.pointsRow}>
                                        <Text style={styles.playerStats}>{item.captainStats}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.playerRow}>
                                <Text style={styles.playerTitle}>VC</Text>
                                <Image source={{ uri: item.viceCaptainImage }} style={styles.playerImage} />
                                <View style={styles.playerDetails}>
                                    <Text style={styles.playerName}>{item.viceCaptain}</Text>
                                    <View style={styles.pointsRow}>
                                        <Text style={styles.playerStats}>{item.viceCaptainStats}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.teamStats}>
                            <Text style={styles.statLabel}>Points</Text>
                            <Text style={styles.statValue}>{item.teamPoints}</Text>
                            <View style={styles.dtRow}>
                                <Text style={styles.dtLabel}>DT Players</Text>
                                <Text style={styles.dtLabel}>{item.dtPlayers}</Text>
                            </View>
                            <Text style={styles.zoneText}>{item.zone} Zone</Text>
                        </View>
                    </View>
                </LinearGradient>
                <View style={styles.cardFooter}>
                    <TouchableOpacity style={styles.copyButton} onPress={handleCopyTeam}>
                        <Text style={styles.copyButtonText}>Copy Team</Text>
                        <Feather name="copy" size={16} color="#000" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>AI Generated Teams</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search teams..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
            />
            <FlatList
                data={filteredTeams}
                renderItem={renderTeamCard}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

export default AiGeneratedTeams;

// Styles remain unchanged
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
    searchInput: {
        height: 40,
        borderColor: '#c2d0ff',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    listContent: {
        paddingBottom: 20,
    },
    card: {
        marginBottom: 10,
        overflow: 'hidden',
        borderRadius: 20,
    },
    gradientBorder: {
        padding: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    gradientBackground: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#bbf7d0',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    },
    statText: {
        fontSize: 12,
        color: '#000',
        fontWeight: 'bold',
    },
    teamInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    teamNumber: {
        fontSize: 12,
        color: '#fff',
        fontWeight: 'bold',
        marginRight: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
        backgroundColor: '#16a34a',
        borderRadius: 10,
    },
    arrowButton: {
        backgroundColor: '#16a34a',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#f0fdf4',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    playerSection: {
        marginBottom: 10,
        flexDirection: 'column',
        flex: 1,
    },
    playerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    pointsRow: {
        flexDirection: 'row',
    },
    playerTitleCap: {
        fontSize: 10,
        color: '#fff',
        fontWeight: '600',
        paddingHorizontal: 6,
        paddingVertical: 2,
        backgroundColor: '#16a34a',
        borderRadius: 50,
        textAlign: 'center',
        marginRight: 16,
    },
    playerTitle: {
        fontSize: 10,
        color: '#fff',
        fontWeight: '600',
        paddingHorizontal: 6,
        paddingVertical: 2,
        backgroundColor: '#16a34a',
        borderRadius: 50,
        textAlign: 'center',
        marginRight: 10,
    },
    playerImage: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#96e6b0',
        marginEnd: 10,
    },
    playerDetails: {
        flex: 1,
    },
    playerName: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 2,
    },
    playerStats: {
        fontSize: 12,
        color: '#666',
        marginEnd: 5,
    },
    teamStats: {
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 12,
        color: '#000',
        fontWeight: 'bold',
    },
    statValue: {
        fontSize: 30,
        color: '#000',
        fontWeight: 'bold',
    },
    dtLabel: {
        fontSize: 12,
        color: '#fff',
        fontWeight: 'bold',
        marginStart: 5,
    },
    dtRow: {
        flexDirection: 'row',
        backgroundColor: '#4CAF50',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    zoneText: {
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#4CAF50',
        marginTop: 5,
        borderRadius: 10,
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: '600',
    },
    cardFooter: {
        alignItems: 'flex-end',
        marginTop: 10,
    },
    copyButton: {
        backgroundColor: '#bbf7d0',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    copyButtonText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '600',
        marginRight: 5,
    },
});