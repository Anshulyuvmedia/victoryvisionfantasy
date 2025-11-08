import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';
import { ToastAndroid, Platform } from "react-native";


const safeColors = {
    headerBg: '#bbf7d0',
    accent: '#16a34a',
    gradientEnd: '#31ae5f',
    contentBg: '#f0fdf4',
    imageBg: '#96e6b0',
    dtBg: '#4CAF50',
    zoneBorder: '#4CAF50',
    zoneColor: '#4CAF50',
    copyBg: '#bbf7d0',
};

const riskyColors = {
    headerBg: '#fee2e2',
    accent: '#dc2626',
    gradientEnd: '#ef4444',
    contentBg: '#fef2f2',
    imageBg: '#fecaca',
    dtBg: '#ef4444',
    zoneBorder: '#dc2626',
    zoneColor: '#dc2626',
    copyBg: '#fee2e2',
};

const AiGeneratedTeams = () => {
    const [apiData, setApiData] = useState([]);
    const [players, setPlayers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchGeneratedAiTeams = async () => {
        try {
            const storedData = await AsyncStorage.getItem('userData');
            const parsedData = storedData ? JSON.parse(storedData) : {};
            const userid = parsedData.userid;

            const response = await axios.get(`https://api.victoryvision.live/api/getUsers-Ai-teams`, {
                params: { userid }
            });

            // console.log('API Response:', response.data.results);

            const results = response.data.results;
            if (!Array.isArray(results) || results.length === 0) {
                console.warn("No teams found in API response");
                return;
            }

            const processedTeams = results.map((team, index) => {
                const players = team.players || [];

                // Calculate role counts
                const roleCounts = players.reduce(
                    (acc, player) => {
                        if (player.role === 'WK') acc.wk += 1;
                        else if (player.role === 'BAT') acc.bat += 1;
                        else if (player.role === 'ALL' || player.role === 'AR') acc.ar += 1;
                        else if (player.role === 'BOWL') acc.bow += 1;
                        return acc;
                    },
                    { wk: 0, bat: 0, ar: 0, bow: 0 }
                );

                // Get captain and vice-captain from settings
                const captainName = team.settings?.captain || 'Not selected';
                const viceCaptainName = team.settings?.viceCaptain || 'Not selected';
                const captain = players.find(p => p.name === captainName) || {};
                const viceCaptain = players.find(p => p.name === viceCaptainName) || {};

                return {
                    id: index.toString(),
                    name: `Team ${index + 1}`,
                    players,
                    ...roleCounts,
                    captain: captainName,
                    captainStats: 'N/A',
                    captainImage: captain.image || 'https://via.placeholder.com/40',
                    viceCaptain: viceCaptainName,
                    viceCaptainStats: 'N/A',
                    viceCaptainImage: viceCaptain.image || 'https://via.placeholder.com/40',
                    teamPoints: 'N/A',
                    dtPlayers: players.length,
                    zone: team.type || 'Balanced',
                    teamNumber: team.settings?.teamCount || index + 1,
                    teamId: team._id,
                    winRate: team.winRate || 0
                };
            });

            setApiData(processedTeams);
        } catch (error) {
            console.error('Failed to fetch AI teams:', error);
        }
    };


    const handleCopyTeam = async (team) => {
        const playerJSON = (team.players || []).map(player => JSON.stringify(player, null, 2)).join(',\n');
        // console.log(playerJSON);
        await Clipboard.setStringAsync(playerJSON);
        if (!playerJSON) {
            console.warn('No players found for this team.');
            return;
        } else {
            ToastAndroid.showWithGravity(
                "Team copied to clipboard!",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }

    };

    useEffect(() => {
        fetchGeneratedAiTeams();
    }, []);


    const filteredTeams = apiData.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderTeamCard = ({ item }) => {
        const isRisky = item.zone === 'Risky';
        const colors = isRisky ? riskyColors : safeColors;

        const dynamicPlayerTitleStyle = {
            ...styles.playerTitle,
            backgroundColor: colors.accent,
        };

        const dynamicPlayerTitleCapStyle = {
            ...styles.playerTitleCap,
            backgroundColor: colors.accent,
        };

        const dynamicPlayerImageStyle = {
            ...styles.playerImage,
            backgroundColor: colors.imageBg,
        };

        const dynamicZoneTextStyle = {
            ...styles.zoneText,
            borderColor: colors.zoneBorder,
            color: colors.zoneColor,
        };

        const dynamicDtRowStyle = {
            ...styles.dtRow,
            backgroundColor: colors.dtBg,
        };

        const dynamicDtLabelStyle = {
            ...styles.dtLabel,
            color: isRisky ? '#fff' : '#fff', // Keep white for both
        };

        return (
            <View style={styles.card}>
                <LinearGradient
                    colors={['#f0f4ff80', '#ffffff00']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientBackground}
                >
                    <View style={[styles.cardHeader, { backgroundColor: colors.headerBg }]}>
                        <View style={styles.statsContainer}>
                            <Text style={styles.statText}>WK: {item.wk}</Text>
                            <Text style={styles.statText}>BAT: {item.bat}</Text>
                            <Text style={styles.statText}>AR: {item.ar}</Text>
                            <Text style={styles.statText}>BOW: {item.bow}</Text>
                        </View>
                        <View style={styles.teamInfo}>
                            <Text style={[styles.teamNumber, { backgroundColor: colors.accent }]}>T{item.id}</Text>
                            <TouchableOpacity style={[styles.arrowButton, { backgroundColor: colors.accent }]} onPress={() => router.push(`/(root)/playerlist/${item.teamId}`)}>
                                <Feather name="arrow-up-right" size={16} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <LinearGradient
                        colors={['#f0f4ff00', colors.gradientEnd]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.gradientBorder}
                    >
                        <View style={[styles.cardContent, { backgroundColor: colors.contentBg }]}>
                            <View style={styles.playerSection}>
                                <View style={styles.playerRow}>
                                    <Text style={dynamicPlayerTitleCapStyle}>C</Text>
                                    <Image source={{ uri: item.captainImage }} style={dynamicPlayerImageStyle} />
                                    <View style={styles.playerDetails}>
                                        <Text style={styles.playerName}>{item.captain}</Text>
                                        <View style={styles.pointsRow}>
                                            <Text style={styles.playerStats}>{item.captainStats}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.playerRow}>
                                    <Text style={dynamicPlayerTitleStyle}>VC</Text>
                                    <Image source={{ uri: item.viceCaptainImage }} style={dynamicPlayerImageStyle} />
                                    <View style={styles.playerDetails}>
                                        <Text style={styles.playerName}>{item.viceCaptain}</Text>
                                        <View style={styles.pointsRow}>
                                            <Text style={styles.playerStats}>{item.viceCaptainStats}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.teamStats}>
                                <Text style={styles.statLabel}>Win Rate</Text>
                                <Text style={styles.statValue}>{item.winRate}%</Text>
                                <View style={dynamicDtRowStyle}>
                                    <Text style={styles.dtLabel}>DT Players</Text>
                                    <Text style={dynamicDtLabelStyle}>{item.dtPlayers}</Text>
                                </View>
                                <Text style={dynamicZoneTextStyle}>{item.zone} Team</Text>
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={styles.cardFooter}>
                        <TouchableOpacity onPress={() => handleCopyTeam(item)} style={[styles.copyButton, { backgroundColor: colors.copyBg }]}>
                            <Text style={styles.copyButtonText}>Copy Team</Text>
                            <Feather name="copy" size={16} color="#000" />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        );
    };

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
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

export default AiGeneratedTeams;

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
        borderRadius: 10,
    },
    arrowButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        flexDirection: 'row',
        padding: 10,
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
        borderRadius: 50,
        textAlign: 'center',
        marginRight: 10,
    },
    playerImage: {
        width: 40,
        height: 40,
        borderRadius: 10,
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
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    zoneText: {
        paddingHorizontal: 10,
        borderWidth: 1,
        marginTop: 5,
        borderRadius: 10,
        fontSize: 12,
        fontWeight: '600',
    },
    cardFooter: {
        alignItems: 'flex-end',
        marginTop: 10,
    },
    copyButton: {
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