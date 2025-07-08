import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const { width } = Dimensions.get('window');

const WinProbability = () => {
    // Sample win probabilities (replace with dynamic data if needed)
    const miProbability = 52; // Mumbai Indians win probability (60%)
    const cskProbability = 48; // Chennai Super Kings win probability (40%)

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
                                <Text style={[styles.teamLabel,]}>MI</Text>
                                <Text style={[styles.percentage,]}>{miProbability}%</Text>
                            </View>
                            <View style={styles.barWrapper}>
                                <View
                                    style={[
                                        styles.bar,
                                        { width: `${miProbability}%`, backgroundColor: '#16A34A' }, // MI bar
                                    ]}
                                />
                            </View>
                        </View>
                        <View style={styles.labelWrapper}>
                            <View style={styles.labelRow}>
                                <Text style={[styles.teamLabel,]}>CSK</Text>
                                <Text style={[styles.percentage,]}>{cskProbability}%</Text>
                            </View>
                            <View style={styles.barWrapper}>
                                <View
                                    style={[
                                        styles.bar,
                                        { width: `${miProbability}%`, backgroundColor: '#16A34A' }, // MI bar
                                    ]}
                                />

                            </View>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

export default WinProbability;

const styles = StyleSheet.create({
    outerContainer: {
        alignItems: 'center',
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
});