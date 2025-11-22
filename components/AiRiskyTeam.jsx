import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useMemo } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import images from '@/constants/images';

const AiRiskyTeam = ({ teamData }) => {
    const [activeRole, setActiveRole] = useState('ALL');

    const getRoleIcon = (role) => {
        switch (role) {
            case 'WK': return images.wk;
            case 'BAT': return images.bat;
            case 'BOW': return images.bow;
            case 'ALL': return images.ar;
            default: return images.ar;
        }
    };
    // Safely process team data
    const processedTeamData = useMemo(() => {
        if (!teamData?.players || !Array.isArray(teamData.players)) return [];

        const seen = new Set();
        return teamData.players
            .filter(player => player?._id && player.name && !seen.has(player._id))
            .map(player => {
                seen.add(player._id);
                return {
                    id: player._id,
                    name: player.name,
                    role: player.role || 'ALL',
                    score: player.credit ? `${player.credit}cr` : 'N/A',
                    icon: getRoleIcon(player.role),
                    isCaptain: teamData.settings?.captain === player.name,
                    isViceCaptain: teamData.settings?.viceCaptain === player.name,
                };
            });
    }, [teamData]);


    // Stats for tabs
    const stats = useMemo(() => {
        const counts = { ALL: processedTeamData.length, WK: 0, BAT: 0, BOW: 0 };
        const credits = { ALL: 0, WK: 0, BAT: 0, BOW: 0 };

        processedTeamData.forEach(p => {
            const role = p.role;
            counts[role] = (counts[role] || 0) + 1;
            counts.ALL++;
            const cr = parseFloat(p.score) || 0;
            credits[role] = (credits[role] || 0) + cr;
            credits.ALL += cr;
        });

        return ['ALL', 'WK', 'BAT', 'BOW'].map(role => ({
            role,
            count: counts[role],
            totalCredits: credits[role].toFixed(1),
        }));
    }, [processedTeamData]);

    const filteredData = activeRole === 'ALL'
        ? processedTeamData
        : processedTeamData.filter(p => p.role === activeRole);

    const handleTabPress = (role) => {
        setActiveRole(activeRole === role ? 'ALL' : role);
    };

    const renderPlayer = ({ item }) => (
        <View style={styles.playerContainer}>
            <View style={styles.playerIconBox}>
                <Image source={item.icon} style={styles.playerIcon} resizeMode="contain" />
            </View>

            <View style={styles.playerInfo}>
                <View style={styles.row}>
                    <View style={styles.nameRow}>
                        <Text style={styles.playerName}>{item.name}</Text>
                        {item.isCaptain && <Text style={styles.captainBadge}> (C)</Text>}
                        {item.isViceCaptain && <Text style={styles.viceCaptainBadge}> (VC)</Text>}
                    </View>
                    <View style={styles.roleBadge}>
                        <Text style={styles.roleText}>{item.role}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={styles.creditText}>{item.score}</Text>
                </View>
            </View>
        </View>
    );

    if (!teamData) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Risky Team Not Available</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.titleSection}>
                    <FontAwesome5 name="bolt" size={26} color="#ea580c" />
                    <Text style={styles.title}>Risky Team</Text>
                </View>
                <View style={styles.winRateSection}>
                    <Text style={styles.winRate}>{teamData.winRate ? `${teamData.winRate}% Win` : 'N/A'}</Text>
                    <Text style={styles.subtitle}>High Risk • High Reward</Text>
                </View>
            </View>

            {/* Role Tabs */}
            <View style={styles.tabsContainer}>
                {stats.map(({ role, count, totalCredits }) => (
                    <TouchableOpacity
                        key={role}
                        style={[styles.tab, activeRole === role && styles.activeTab]}
                        onPress={() => handleTabPress(role)}
                    >
                        <Text style={[styles.tabText, activeRole === role && styles.activeTabText]}>
                            {role} ({count})
                        </Text>
                        <Text style={styles.tabCredits}>{totalCredits}cr</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Playing XI Title */}
            <Text style={styles.playingXiTitle}>
                Playing XI {activeRole !== 'ALL' ? `(${activeRole})` : ''}
            </Text>

            {/* Players List */}
            <FlatList
                data={filteredData}
                renderItem={renderPlayer}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}   // Critical for TabView
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

export default AiRiskyTeam;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff7ed',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#ffd7a3',
        overflow: 'hidden',
        marginVertical: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff3e0',
        borderBottomWidth: 1,
        borderColor: '#ffd7a3',
    },
    titleSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#ea580c',
        marginLeft: 8,
    },
    winRateSection: {
        alignItems: 'flex-end',
    },
    winRate: {
        backgroundColor: '#ea580c',
        color: 'white',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        fontWeight: 'bold',
        fontSize: 15,
    },
    subtitle: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffe1bc',
        padding: 8,
        margin: 12,
        borderRadius: 12,
        justifyContent: 'space-around',
    },
    tab: {
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    activeTab: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 5,
    },
    tabText: {
        fontWeight: 'bold',
        color: '#666',
    },
    activeTabText: {
        color: '#ea580c',
    },
    tabCredits: {
        fontSize: 11,
        color: '#888',
        marginTop: 2,
    },
    playingXiTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#333',
        paddingHorizontal: 16,
        marginTop: 8,
        marginBottom: 12,
    },
    playerContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffe8c4',
        marginHorizontal: 16,
        marginBottom: 10,
        padding: 12,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#ffd7a3',
        alignItems: 'center',
    },
    playerIconBox: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ffd7a3',
    },
    playerIcon: {
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
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    playerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    captainBadge: {
        color: '#d32f2f',
        fontWeight: 'bold',
        fontSize: 13,
        marginLeft: 6,
    },
    viceCaptainBadge: {
        color: '#1976d2',
        fontWeight: 'bold',
        fontSize: 13,
        marginLeft: 6,
    },
    roleBadge: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    roleText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#444',
    },
    creditText: {
        fontSize: 15,
        color: '#ea580c',
        fontWeight: '600',
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        fontStyle: 'italic',
    },
});