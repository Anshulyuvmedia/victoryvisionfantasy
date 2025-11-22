import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import images from '@/constants/images';

// Role icon mapping
const ROLE_ICONS = {
    WK: images.wk,
    BAT: images.bat,
    ALL: images.ar,
    BOWL: images.bow,
    AR: images.ar,
};

const getRoleIcon = (role) => {
    const key = role?.toUpperCase();
    return ROLE_ICONS[key] || images.ar;
};

const ROLE_TABS = [
    { key: 'ALL', label: 'ALL' },
    { key: 'WK', label: 'WK' },
    { key: 'BAT', label: 'BAT' },
    { key: 'AR', label: 'AR' },   // All-Rounder
    { key: 'BOWL', label: 'BOWL' },
];

const LineupsTab = ({ matchID }) => {
    const [teamData, setTeamData] = useState({ teama: [], teamb: [], teams: [] });
    const [activeRole, setActiveRole] = useState('ALL');
    useEffect(() => {
        if (!matchID) return;

        const fetchTeamPlayers = async () => {
            try {
                const { data } = await axios.get('https://api.victoryvision.live/api/team-players', {
                    params: { matchID },
                });

                const result = data.results[0];
                const { teama, teamb, teams } = result.squads;

                const processSquad = (squad) => {
                    const teamInfo = teams.find(t => t.tid === squad.team_id);
                    return squad.squads.map(player => ({
                        id: player.player_id,
                        name: player.name,
                        role: player.role?.toUpperCase() || 'ALL',
                        team: teamInfo?.abbr || 'N/A',
                        teamName: teamInfo?.title || 'Unknown Team',
                        teamLogo: teamInfo?.thumb_url || images.teamPlaceholder,
                        icon: getRoleIcon(player.role),
                    }));
                };

                setTeamData({
                    teama: processSquad(teama),
                    teamb: processSquad(teamb),
                    teams,
                });
            } catch (error) {
                console.error('Error fetching lineups:', error);
            }
        };

        fetchTeamPlayers();
    }, [matchID]);

    const handleTabPress = useCallback((role) => {
        setActiveRole(prev => prev === role ? 'ALL' : role);
    }, []);

    const filteredPlayers = useCallback((players) => {
        return activeRole === 'ALL' ? players : players.filter(p => p.role === activeRole);
    }, [activeRole]);

    const PlayerItem = React.memo(({ item }) => (
        <View style={styles.playerContainer}>
            <View style={styles.iconBox}>
                <Image source={item.icon} style={styles.roleIcon} resizeMode="contain" />
            </View>
            <View style={styles.playerInfo}>
                <View style={styles.row}>
                    <Text style={styles.playerName}>{item.name}</Text>
                    <View style={styles.roleBadge}>
                        <Text style={styles.roleText}>{item.role}</Text>
                    </View>
                </View>
                <Text style={styles.teamText}>{item.team}</Text>
            </View>
        </View>
    ));

    const TeamCard = React.memo(({ players, title, logo }) => {
        const data = filteredPlayers(players);

        if (data.length === 0) {
            return (
                <View style={styles.teamCard}>
                    <Text style={styles.noPlayersText}>No {activeRole === 'ALL' ? '' : activeRole} players</Text>
                </View>
            );
        }

        return (
            <View style={styles.teamCard}>
                <View style={styles.teamHeader}>
                    <Image source={{ uri: logo }} style={styles.teamLogo} defaultSource={images.teamPlaceholder} />
                    <Text style={styles.teamTitle}>{title}</Text>
                </View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <PlayerItem item={item} />}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    scrollEnabled={false}
                />
            </View>
        );
    });

    if (teamData.teams.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading Lineups...</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}        // THIS IS THE KEY
            bounces={true}
            overScrollMode="always"
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Official Lineups</Text>
            </View>

            {/* Filter Tabs */}
            <View style={styles.filterTabs}>
                {ROLE_TABS.map(({ key, label }) => (
                    <TouchableOpacity
                        key={key}  // Unique keys!
                        style={[styles.tab, activeRole === key && styles.activeTab]}
                        onPress={() => handleTabPress(key)}
                    >
                        <Text style={[styles.tabText, activeRole === key && styles.activeTabText]}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.sectionTitle}>
                Playing XI {activeRole !== 'ALL' ? `(${activeRole})` : ''}
            </Text>

            {/* Team A */}
            {teamData.teama.length > 0 && (
                <TeamCard
                    players={teamData.teama}
                    title={teamData.teama[0]?.teamName || 'Team A'}
                    logo={teamData.teama[0]?.teamLogo}
                />
            )}

            {/* Team B */}
            {teamData.teamb.length > 0 && (
                <TeamCard
                    players={teamData.teamb}
                    title={teamData.teamb[0]?.teamName || 'Team B'}
                    logo={teamData.teamb[0]?.teamLogo}
                />
            )}

            <View style={{ height: 100 }} />
        </ScrollView>
    );
};

export default React.memo(LineupsTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1a1a1a',
    },
    filterTabs: {
        flexDirection: 'row',
        backgroundColor: '#f0fdf4',
        padding: 8,
        borderRadius: 16,
        marginBottom: 16,
        justifyContent: 'space-around',
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
    },
    activeTab: {
        backgroundColor: '#16a34a',
    },
    tabText: {
        fontWeight: 'bold',
        color: '#333',
    },
    activeTabText: {
        color: 'white',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 16,
    },
    teamCard: {
        backgroundColor: '#f0fdf4',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#86efac',
    },
    teamHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    teamLogo: {
        width: 48,
        height: 48,
        borderRadius: 50,
        backgroundColor: '#e0e0e0',
    },
    teamTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginLeft: 12,
    },
    playerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#d0e8d5',
    },
    iconBox: {
        width: 48,
        height: 48,
        backgroundColor: '#fff',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#86efac',
    },
    roleIcon: {
        width: 36,
        height: 36,
    },
    playerInfo: {
        flex: 1,
        marginLeft: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    playerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    roleBadge: {
        backgroundColor: '#e6f7ee',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#86efac',
    },
    roleText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#16a34a',
    },
    teamText: {
        fontSize: 13,
        color: '#666',
        marginTop: 4,
    },
    noPlayersText: {
        textAlign: 'center',
        color: '#999',
        fontStyle: 'italic',
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
    },
});