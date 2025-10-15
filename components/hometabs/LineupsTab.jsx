import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import images from '@/constants/images';

const LineupsTab = ({ onContentHeightChange, matchID }) => {
    const [teamData, setTeamData] = useState({ teama: [], teamb: [], teams: [] });
    const [activeRole, setActiveRole] = useState('ALL');

    const handleLayout = useCallback(
        (event) => {
            if (onContentHeightChange) {
                const { height } = event.nativeEvent.layout;
                onContentHeightChange(height);
            }
        },
        [onContentHeightChange]
    );

    const fetchTeamPlayers = async (matchID) => {
        try {
            const response = await axios.get(`http://api.victoryvision.live:3000/api/team-players`, {
                params: { matchID },
            });
            const data = response.data.results[0];
            setTeamData({
                teama: data.squads.teama.squads.map((player) => ({
                    id: player.player_id,
                    name: player.name,
                    role: player.role,
                    team: data.squads.teams.find((team) => team.tid === data.squads.teama.team_id).abbr,
                    image: images.playerPlaceholder,
                    icon: images.roleIcon,
                    score: 'N/A',
                })),
                teamb: data.squads.teamb.squads.map((player) => ({
                    id: player.player_id,
                    name: player.name,
                    role: player.role,
                    team: data.squads.teams.find((team) => team.tid === data.squads.teamb.team_id).abbr,
                    image: images.playerPlaceholder,
                    icon: images.roleIcon,
                    score: 'N/A',
                })),
                teams: data.squads.teams,
            });
            // console.log('Processed team data:', JSON.stringify({ teama: data.squads.teama, teamb: data.squads.teamb }, null, 2));
        } catch (error) {
            console.error('Error fetching Match data:', error);
        }
    };

    useEffect(() => {
        if (matchID) {
            fetchTeamPlayers(matchID);
        }
    }, [matchID]);

    const handleTabPress = (role) => {
        setActiveRole(activeRole === role ? 'ALL' : role);
    };

    const renderPlayer = ({ item }) => (
        <View style={styles.playerContainer}>
            <Image source={item.image} style={styles.playerImage} />
            <View style={styles.playerInfo}>
                <View style={styles.playerheader}>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={styles.roleContainer}>
                        <Text style={styles.roleText}>{item.role.toUpperCase()}</Text>
                    </View>
                </View>
                <View style={styles.playerheader}>
                    <View>
                        <Text style={styles.scoreText}>{item.score}</Text>
                        <Text style={styles.teamText}>{item.team}</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const renderTeamCard = (team, title, logoUrl) => {
        const filteredPlayers = activeRole === 'ALL' ? team : team.filter((player) => player.role === activeRole);
        return (
            <View style={styles.teamCard}>
                <View style={styles.teamHeader}>
                    <Image source={{ uri: logoUrl }} style={styles.teamLogo} />
                    <Text style={styles.teamTitle}>{title}</Text>
                </View>
                <FlatList
                    data={filteredPlayers}
                    renderItem={renderPlayer}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                />
            </View>
        );
    };

    return (
        <View style={styles.container} onLayout={handleLayout}>
            <View style={styles.header}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>Team Lineups</Text>
                </View>
            </View>
            <View style={styles.filterTabs}>
                {['ALL', 'wk', 'bat', 'all', 'bowl'].map((role) => (
                    <TouchableOpacity
                        key={role}
                        style={activeRole === role ? styles.activeTabBox : styles.tabBox}
                        onPress={() => handleTabPress(role)}
                    >
                        <Text style={activeRole === role ? styles.activetabTitle : styles.tabTitle}>
                            {role === 'wk' ? 'W-K' : role === 'bat' ? 'BAT' : role === 'all' ? 'A-L' : role === 'bowl' ? 'Bowl' : 'All'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.boxTitle}>
                <Text style={styles.boxTitleText}>Playing XI</Text>
            </View>
            {teamData.teams.length > 0 && (
                <>
                    {renderTeamCard(
                        teamData.teama,
                        teamData.teams.find((t) => t.tid === teamData.teama[0]?.team_id)?.title || 'Team A',
                        teamData.teams.find((t) => t.tid === teamData.teama[0]?.team_id)?.thumb_url || images.teamPlaceholder
                    )}
                    {renderTeamCard(
                        teamData.teamb,
                        teamData.teams.find((t) => t.tid === teamData.teamb[0]?.team_id)?.title || 'Team B',
                        teamData.teams.find((t) => t.tid === teamData.teamb[0]?.team_id)?.thumb_url || images.teamPlaceholder
                    )}
                </>
            )}
        </View>
    );
};

export default LineupsTab;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f0fdf4',
        borderRadius: 18,
        marginTop: 10,
        borderColor: '#96e6b0',
        borderWidth: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    playerheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    boxTitle: {
        marginVertical: 10,
    },
    boxTitleText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    titleBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 18,
        color: 'green',
    },
    teamCard: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#96e6b0',
        backgroundColor: '#d8fae3',
    },
    teamHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    teamLogo: {
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    teamTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 10,
        color: '#333',
    },
    playerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#96e6b0',
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    playerImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#96e6b0',
        backgroundColor: '#96e6b0',
    },
    playerIconBox: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#96e6b0',
        backgroundColor: '#fff',
        padding: 5,
    },
    playerIcon: {
        width: 25,
        height: 25,
    },
    playerInfo: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    roleContainer: {
        padding: 5,
        borderRadius: 5,
    },
    roleText: {
        fontSize: 12,
        color: '#333',
    },
    scoreText: {
        fontSize: 14,
        color: '#333',
    },
    teamText: {
        fontSize: 12,
        color: '#666',
    },
    filterTabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    tabBox: {
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
    },
    activeTabBox: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        alignItems: 'center',
    },
    tabTitle: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    activetabTitle: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 14,
    },
});