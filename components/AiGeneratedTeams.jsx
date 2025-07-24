import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons'; // For the arrow icon

const AiGeneratedTeams = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [teams, setTeams] = useState([
        {
            id: '1',
            name: 'Team Alpha',
            initial: 'A',
            wk: 1, bat: 5, ar: 3, bow: 2,
            captain: 'MS Dhoni', captainStats: '120 pts', captainImage: 'https://via.placeholder.com/40',
            viceCaptain: 'V Kohli', viceCaptainStats: '95 pts', viceCaptainImage: 'https://via.placeholder.com/40',
            teamPoints: 450, dtPlayers: 3, zone: 'Winning',
            teamNumber: 1
        },
        {
            id: '2',
            name: 'Team Bravo',
            initial: 'B',
            wk: 1, bat: 4, ar: 4, bow: 2,
            captain: 'R Sharma', captainStats: '110 pts', captainImage: 'https://via.placeholder.com/40',
            viceCaptain: 'S Gill', viceCaptainStats: '85 pts', viceCaptainImage: 'https://via.placeholder.com/40',
            teamPoints: 420, dtPlayers: 2, zone: 'Losing',
            teamNumber: 2
        },
        {
            id: '3',
            name: 'Team Charlie',
            initial: 'C',
            wk: 2, bat: 4, ar: 3, bow: 2,
            captain: 'J Root', captainStats: '100 pts', captainImage: 'https://via.placeholder.com/40',
            viceCaptain: 'B Stokes', viceCaptainStats: '90 pts', viceCaptainImage: 'https://via.placeholder.com/40',
            teamPoints: 410, dtPlayers: 2, zone: 'Winning',
            teamNumber: 1
        },
        {
            id: '4',
            name: 'Team Delta',
            initial: 'D',
            wk: 1, bat: 5, ar: 2, bow: 3,
            captain: 'K Williamson', captainStats: '115 pts', captainImage: 'https://via.placeholder.com/40',
            viceCaptain: 'T Southee', viceCaptainStats: '80 pts', viceCaptainImage: 'https://via.placeholder.com/40',
            teamPoints: 430, dtPlayers: 3, zone: 'Losing',
            teamNumber: 2
        },
    ]);

    const filteredTeams = teams.filter(team =>
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
                {/* Card Header */}
                <View style={styles.cardHeader}>
                    <View style={styles.statsContainer}>
                        <Text style={styles.statText}>WK: {item.wk}</Text>
                        <Text style={styles.statText}>BAT: {item.bat}</Text>
                        <Text style={styles.statText}>AR: {item.ar}</Text>
                        <Text style={styles.statText}>BOW: {item.bow}</Text>
                    </View>
                    <View style={styles.teamInfo}>
                        <Text style={styles.teamNumber}>T{item.id}</Text>
                        <TouchableOpacity style={styles.arrowButton}>
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
                    {/* Card Content */}
                    <View style={styles.cardContent}>
                        <View style={styles.playerSection}>
                            <View style={styles.playerRow}>
                                <Text style={styles.playerTitleCap}>C</Text>
                                <Image source={{ uri: item.captainImage }} style={styles.playerImage} />
                                <View style={styles.playerDetails}>
                                    <Text style={styles.playerName}>{item.captain}</Text>
                                    <View style={styles.pointsRow}>
                                        <Text style={styles.playerStats}>{item.captainStats}</Text>
                                        <Text style={styles.playerStats}>{item.captainStats}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.playerRow}>
                                <Text style={styles.playerTitle}>VC</Text>
                                <Image source={{ uri: item.viceCaptainImage }} style={styles.playerImage} />
                                <View style={styles.playerDetails}>
                                    <Text style={styles.playerName}>{item.captain}</Text>
                                    <View style={styles.pointsRow}>
                                        <Text style={styles.playerStats}>{item.captainStats}</Text>
                                        <Text style={styles.playerStats}>{item.captainStats}</Text>
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
                {/* Card Footer */}
                <View style={styles.cardFooter}>
                    <TouchableOpacity style={styles.copyButton}>
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
                keyExtractor={item => item.id}
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
        // padding: 12,
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
        flexDirection: 'col',
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
        paddingInline: '10',
        borderRadius: 10,
    },
    zoneText: {
        paddingInline: '10',
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