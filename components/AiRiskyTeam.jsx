import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useMemo } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import images from '@/constants/images';

const AiRiskyTeam = ({ teamData }) => {
    const [activeRole, setActiveRole] = useState('ALL'); // Default to show all players

    // Map role to icon
    const getRoleIcon = (role) => {
        switch (role) {
            case 'WK':
                return images.wk;
            case 'BAT':
                return images.bat;
            case 'ALL':
                return images.ar;
            case 'BOW':
                return images.bow;
            default:
                return images.ar; // Fallback for unknown roles
        }
    };

    // Process teamData from props, handle missing data and duplicates
    const processedTeamData = useMemo(() => {
        if (!teamData || !teamData.players) return [];

        // Remove duplicates based on _id
        const uniquePlayers = [];
        const seenIds = new Set();
        teamData.players.forEach((player) => {
            if (!seenIds.has(player._id) && player.name && player.role) {
                seenIds.add(player._id);
                uniquePlayers.push({
                    id: player._id,
                    name: player.name,
                    role: player.role,
                    score: player.credit ? `${player.credit}cr` : 'N/A', // Format credit as score
                    team: 'TBD', // Placeholder; replace with logic to get team
                    icon: getRoleIcon(player.role),
                    image: images.playerPlaceholder, // Default placeholder
                    status: player.status || 'Unknown',
                });
            }
        });

        return uniquePlayers;
    }, [teamData]);

    // Calculate stats for tabs (WK, BAT, ALL, BOW counts and total credits)
    const stats = useMemo(() => {
        const roles = ['ALL', 'WK', 'BAT', 'BOW'];
        return roles.map((role) => {
            const players = processedTeamData.filter((p) => p.role === role);
            const count = players.length;
            const totalCredits = players.reduce((sum, p) => {
                const credit = parseFloat(p.score) || 0;
                return sum + credit;
            }, 0);
            return { role, count, totalCredits: totalCredits.toFixed(1) };
        });
    }, [processedTeamData]);

    // Filter data based on active role
    const filteredData = activeRole === 'ALL' ? processedTeamData : processedTeamData.filter((item) => item.role === activeRole);

    const handleTabPress = (role) => {
        setActiveRole(activeRole === role ? 'ALL' : role); // Toggle to ALL if same role is clicked
    };

    const renderItem = ({ item }) => (
        <View style={styles.playerContainer}>
            <Image source={item.image} style={styles.playerImage} />
            <View style={styles.playerInfo}>
                <View style={styles.playerheader}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{item.name}</Text>
                        {teamData?.settings?.captain === item.name && (
                            <Text style={styles.captainText}>(C)</Text>
                        )}
                        {teamData?.settings?.viceCaptain === item.name && (
                            <Text style={styles.captainText}>(VC)</Text>
                        )}
                    </View>
                    <View style={styles.roleContainer}>
                        <Text style={styles.roleText}>{item.role}</Text>
                    </View>
                </View>
                <View style={styles.playerheader}>
                    <View>
                        <Text style={styles.scoreText}>{item.score}</Text>
                        <Text style={styles.teamText}>{item.team}</Text>
                    </View>
                    <View style={styles.playerIconBox}>
                        <Image source={item.icon} style={styles.playerIcon} resizeMode="contain" />
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleBox}>
                    <FontAwesome5 name="bolt" size={24} color="#ea580c" />
                    <Text style={styles.title}>Risky Team</Text>
                </View>
                <View style={styles.winRateBox}>
                    <Text style={styles.winBox}>{teamData?.winRate ? `${teamData.winRate}% Win Rate` : 'N/A'}</Text>
                    <Text style={styles.subtitle}>High Risk High Rewards</Text>
                </View>
            </View>
            <View style={styles.stats}>
                {stats.map(({ role, count, totalCredits }) => (
                    <TouchableOpacity
                        key={role}
                        style={[styles.tabBox, activeRole === role ? styles.activeTabBox : null]}
                        onPress={() => handleTabPress(role)}
                    >
                        <Text style={[styles.tabTitle, activeRole === role ? styles.activetabTitle : null]}>
                            {role} ({count})
                        </Text>
                        <Text style={styles.tabSubTitle}>{totalCredits}cr</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.boxTitle}>
                <TouchableOpacity onPress={() => setActiveRole('ALL')}>
                    <Text style={styles.boxTitleText}>
                        Playing XI {activeRole !== 'ALL' ? `(${activeRole})` : ''}
                    </Text>
                </TouchableOpacity>
            </View>
            {processedTeamData.length === 0 ? (
                <Text style={styles.noDataText}>No team data available</Text>
            ) : (
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false} // Disable FlatList scrolling to rely on parent TabView
                />
            )}
        </View>
    );
};

export default AiRiskyTeam;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderColor: '#ffc377',
        borderWidth: 1,
        backgroundColor: '#fff7ed',
        borderRadius: 18,
        marginTop: 10,
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
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    boxTitle: {
        marginVertical: 10,
    },
    boxTitleText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    winRateBox: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    titleBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#ea580c',
    },
    subtitle: {
        fontSize: 12,
        marginTop: 5,
        color: '#666',
    },
    winBox: {
        backgroundColor: '#ea580c',
        paddingHorizontal: 20,
        paddingVertical: 5,
        color: 'white',
        borderRadius: 20,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        backgroundColor: '#ffe1bc',
        borderRadius: 10,
    },
    playerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ffc377',
        marginBottom: 10,
        backgroundColor: '#ffe1bc',
    },
    playerImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ffc377',
        backgroundColor: '#ffc377',
    },
    playerIconBox: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ffc377',
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
    captainText: {
        fontSize: 12,
        color: '#ea580c',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    roleContainer: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
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
        color: '#ea580c',
        fontWeight: 'bold',
        fontSize: 14,
    },
    tabSubTitle: {
        fontSize: 12,
        color: '#666',
    },
    noDataText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginVertical: 20,
    },
});