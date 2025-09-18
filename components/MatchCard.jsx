import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { router } from 'expo-router';

const MatchCard = ({ match }) => {
    const getInitials = (name) => {
        if (!name) return '';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    // Convert UTC matchDate to IST
    const matchTime = match?.matchDate
        ? moment(match.matchDate).utcOffset('+05:30').format('h:mm A')
        : '';

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/matchdetails/${match.matchId}`)}
        >
            <Text style={styles.matchTitle}>{match.shortTitle}</Text>
            <View style={styles.teamsRow}>
                <View style={styles.team}>
                    <Image
                        source={{ uri: match.teamA.logo }}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.code}>{match.teamA.name}</Text>
                </View>
                <Text style={styles.vsText}>vs</Text>
                <View style={styles.team}>
                    <Image
                        source={{ uri: match.teamB.logo }}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.code}>{match.teamB.name}</Text>
                </View>
            </View>
            <View style={styles.timerRow}>
                <AntDesign name="clockcircleo" size={16} color="red" />
                <Text style={styles.timerText}>{matchTime}</Text>
            </View>
            <Text style={styles.venue}>
                {match.venue.name}, {match.venue.location}, {match.venue.country}
            </Text>
            <Text style={styles.competition}>{match.competition.title} ({match.formatStr})</Text>
        </TouchableOpacity>
    );
};

export default MatchCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        borderBottomWidth: 5,
        borderBottomColor: '#111F54',
    },
    matchTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 10,
        textAlign: 'center',
    },
    teamsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10,
    },
    team: {
        alignItems: 'center',
    },
    logo: {
        width: scale(60),
        height: verticalScale(50),
        marginHorizontal: moderateScale(0),
    },
    code: {
        fontSize: 13,
        fontWeight: '600',
    },
    vsText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    timerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        marginBottom: 5,
    },
    timerText: {
        color: 'red',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    venue: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginBottom: 5,
    },
    competition: {
        fontSize: 12,
        color: '#111F54',
        textAlign: 'center',
    },
});