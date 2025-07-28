import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import images from '@/constants/images';
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
    }
    const matchTime = match?.matchDate ? moment(match.matchDate).format('h:mm A') : '';
    // console.log("Final Data : ", JSON.stringify(match, null, 2));
    return (
        <TouchableOpacity style={styles.card} onPress={() => router.push(`/matchdetails/${match._id}`)}>
            <Text style={styles.matchTitle}>{match.teamA} vs {match.teamB}</Text>
            <View style={styles.teamsRow}>
                <View style={styles.team}>
                    <Image
                        source={images.mi}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.code}>{getInitials(match.teamA)}</Text>
                </View>
                <Text style={styles.vsText}>vs</Text>
                <View style={styles.team}>
                    <Image
                        source={images.csk}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.code}>{getInitials(match.teamB)}</Text>
                </View>
            </View>
            <View style={styles.timerRow}>
                <AntDesign name="clockcircleo" size={16} color="red" />
                <Text style={styles.timerText}>{matchTime}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MatchCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        borderBottomWidth: 5,
        borderBottomColor: "#111F54",
        // elevation: 3,
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
        width: scale(60), // Slightly smaller to match the second image
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
    },
    timerText: {
        color: 'red',
        fontWeight: 'bold',
        marginLeft: 5,
    },
})