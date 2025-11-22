import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Entypo } from '@expo/vector-icons';

const HeadToHead = ({ headToHeadStats }) => {
    if (!headToHeadStats) return null;
    // console.log('Inside headToHeadStats:', headToHeadStats);
    const getInitials = (name) => {
        if (!name) return '';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    }
    const getHeadToHeadStats = (data) => {
        const { headToHeadStats: matches, teamA, teamB } = data;

        let teamAWins = 0;
        let teamBWins = 0;

        const safeMatches = Array.isArray(matches) ? matches : [];

        safeMatches.forEach((match) => {
            if (match.winner === teamA) teamAWins++;
            else if (match.winner === teamB) teamBWins++;
        });

        return {
            total: safeMatches.length,
            teamAName: teamA,
            teamBName: teamB,
            teamAWins,
            teamBWins,
        };
    };
    const {
        total,
        teamAName,
        teamBName,
        teamAWins,
        teamBWins
    } = getHeadToHeadStats(headToHeadStats);


    return (
        <View style={styles.outerContainer}>
            <LinearGradient
                colors={['#ea580c', '#fff']}
                style={styles.gradientBorder}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.headerbox}>
                            <Entypo name="trophy" size={24} color="#ea580c" />
                            <Text style={styles.title}>Head to Head</Text>
                        </View>
                        <View style={styles.contentbox}>
                            <View style={styles.teamContainer}>
                                <Text style={styles.stat1}>{teamAWins}</Text>
                                <Text style={styles.team}>{getInitials(teamAName)} Wins</Text>
                            </View>
                            <View style={styles.teamContainer}>
                                <Text style={styles.totaltitle}>Total Matches</Text>
                                <Text style={styles.totaltitle}>{total}</Text>
                            </View>
                            <View style={styles.teamContainer}>
                                <Text style={styles.stat2}>{teamBWins}</Text>
                                <Text style={styles.team}>{getInitials(teamBName)} Wins</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

export default HeadToHead;

const styles = StyleSheet.create({
    outerContainer: {
        marginTop: 15,
    },
    gradientBorder: {
        flex: 1,
        padding: 1,
        borderRadius: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    content: {
        padding: 15,
    },
    headerbox: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        marginStart: 5,
    },
    contentbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    teamContainer: {
        flexDirection: 'col',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    totaltitle: {
        fontSize: 12,
    },
    team: {
        fontSize: 16,
    },
    stat1: {
        fontSize: 18,
        color: '#5e83f2',
        fontWeight: 'bold',
    },
    stat2: {
        fontSize: 18,
        color: '#e3b80b',
        fontWeight: 'bold',

    },
    totalContainer: {
        marginTop: 10,
    },
    total: {
        fontSize: 16,
        fontStyle: 'italic',
    },
});