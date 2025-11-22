import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const WinProbability = ({ winprobdata }) => {
    // console.log('Inside Win:', winprobdata);
    // console.log("Team A name:", winprobdata?.teamA);
    const teamAProb = winprobdata?.winProbability?.teamA;
    const teamBProb = winprobdata?.winProbability?.teamB;
    const getInitials = (name) => {
        if (!name) return '';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    }
    return (
        <View style={styles.outerContainer}>
            <LinearGradient
                colors={['#BBF7D0', 'rgba(187, 247, 208, 0)']} // Green linear gradient for border
                start={{ x: 1, y: 0 }} // Top-left
                end={{ x: 0, y: 0 }} // Bottom
                style={styles.gradientBorder}
            >
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Win Probability</Text>
                    <View style={styles.barContainer}>
                        <View style={styles.labelWrapper}>
                            <View style={styles.labelRow}>
                                <Text style={[styles.teamLabel,]}>{getInitials(winprobdata?.teamA)}</Text>
                                <Text style={[styles.percentage,]}>{teamAProb}%</Text>
                            </View>
                            <View style={styles.barWrapper}>
                                <View
                                    style={[
                                        styles.bar,
                                        { width: `${teamAProb}%`, backgroundColor: '#16A34A' }, // MI bar
                                    ]}
                                />
                            </View>
                        </View>
                        <View style={styles.labelWrapper}>
                            <View style={styles.labelRow}>
                                <Text style={[styles.teamLabel,]}>{getInitials(winprobdata?.teamB)}</Text>
                                <Text style={[styles.percentage,]}>{teamBProb}%</Text>
                            </View>
                            <View style={styles.barWrapper}>
                                <View
                                    style={[
                                        styles.bar,
                                        { width: `${teamBProb}%`, backgroundColor: '#16A34A' }, // MI bar
                                    ]}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.box}>
                <View style={styles.titleBox}>
                    <MaterialCommunityIcons name="file-chart" size={24} color="#16a34a" />
                    <Text style={styles.title}>Pitch Report</Text>
                </View>
                <Text style={styles.button}>{winprobdata?.pitchReport}</Text>
            </View>
        </View>
    );
};

export default WinProbability;

const styles = StyleSheet.create({
    outerContainer: {
        // alignItems: 'center',
        paddingVertical: verticalScale(10),
        marginTop: verticalScale(30),
    },
    gradientBorder: {
        width: width * 0.95,
        borderRadius: moderateScale(20),
        padding: moderateScale(2), // Slightly thicker border
    },
    innerContainer: {
        backgroundColor: '#F0FDF4', // Light green background
        borderRadius: moderateScale(18),
        padding: moderateScale(15),
        alignItems: 'start',
    },
    title: {
        color: '#16A34A',
        fontSize: scale(14),
        fontWeight: '600',
        marginBottom: verticalScale(10),
        textAlign: 'start',
    },
    barContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    labelWrapper: {
        width: '40%',
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%', // Align labels with bars
        marginBottom: verticalScale(5),
    },
    teamLabel: {
        color: '#696969',
        fontSize: scale(14),
        fontWeight: '600',
        flex: 1,
        textAlign: 'start',
    },
    barWrapper: {
        flexDirection: 'row',
        width: '100%', // Match label width
        height: verticalScale(8),
        backgroundColor: '#BBF7D0', // Unfilled bar background
        borderRadius: moderateScale(6),
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        borderRadius: moderateScale(6),
    },
    percentageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%', // Match bar width
        marginTop: verticalScale(5),
    },
    percentage: {
        color: '#696969',
        fontSize: scale(14),
        fontWeight: '600',
        textAlign: 'end',
    },
    box: {
        backgroundColor: 'white',
        paddingBlock: 10,
        paddingInline: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 100,
        marginTop: verticalScale(10),
    },
    titleBox: {
        flexDirection: 'row',
    },
    title: {
        marginStart: 5,
        fontWeight: 600,
    },
    button: {
        fontWeight: 600,
        paddingInline: 15,
        paddingBlock: 7,
        borderRadius: 100,
        backgroundColor: '#f0f1f3',

    }
});