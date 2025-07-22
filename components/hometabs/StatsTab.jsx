import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react';

import LinearGradient from 'react-native-linear-gradient';
import { Entypo } from '@expo/vector-icons';

const StatsTab = ({ onContentHeightChange }) => {
    const handleLayout = useCallback(
        (event) => {
            if (onContentHeightChange) {
                const { height } = event.nativeEvent.layout;
                onContentHeightChange(height); // Pass the measured height to the parent
            }
        },
        [onContentHeightChange]
    );
    return (
        <View style={styles.container} onLayout={handleLayout}>
            <View style={styles.header}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>Match Stats</Text>
                </View>
                <Text>IPL 2025</Text>
            </View>

            <View style={styles.outerContainer}>
                <LinearGradient
                    colors={['#91a9f1', '#fff']}
                    style={styles.gradientBorder}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.3, y: 0.7 }}
                >
                    <View style={styles.stadiumBox}>
                        <View style={styles.content}>
                            <View style={styles.headerbox}>
                                <Text style={styles.title}>Stadium Stats</Text>
                            </View>
                            <View style={styles.contentbox}>
                                <Text style={styles.playerName}>Average 1st Innings Score</Text>
                                <Text style={styles.stats}>172</Text>
                            </View>
                            <View style={styles.contentbox}>
                                <Text style={styles.playerName}>Chasing Success %</Text>
                                <Text style={styles.stats}>68%</Text>
                            </View>
                            <View style={styles.contentbox}>
                                <Text style={styles.playerName}>Boundary %</Text>
                                <Text style={styles.stats}>42%</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
            <View style={styles.outerContainer}>
                <LinearGradient
                    colors={['#fed7aa', '#fff']}
                    style={styles.gradientBorder}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.3, y: 0.7 }}
                >
                    <View style={styles.batsmanBox}>
                        <View style={styles.content}>
                            <View style={styles.headerbox}>
                                <Text style={styles.title}>Top Batsmen</Text>
                            </View>
                            <View style={styles.contentbox}>
                                <Text style={styles.playerName}>Top Batsmen</Text>
                                <View style={styles.statbox}>
                                    <Text style={styles.stats}>543 Runs</Text>
                                    <Text style={styles.stats}>Avg: 45.2</Text>
                                    <Text style={styles.stats}>SR: 138.5</Text>
                                </View>
                            </View>
                            <View style={styles.contentbox}>
                                <Text style={styles.playerName}>Rohit Sharma</Text>
                                <View style={styles.statbox}>
                                    <Text style={styles.stats}>398 Runs</Text>
                                    <Text style={styles.stats}>Avg: 33.2</Text>
                                    <Text style={styles.stats}>SR: 142.1</Text>
                                </View>
                            </View>
                            <View style={styles.contentbox}>
                                <Text style={styles.playerName}>KL Rahul</Text>
                                <View style={styles.statbox}>
                                    <Text style={styles.stats}>456 Runs</Text>
                                    <Text style={styles.stats}>Avg: 38.0</Text>
                                    <Text style={styles.stats}>SR: 135.8</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
            <View style={styles.outerContainer}>
                <LinearGradient
                    colors={['#f69ab1', '#fff']}
                    style={styles.gradientBorder}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.3, y: 0.7 }}
                >
                    <View style={styles.bowlerBox}>
                        <View style={styles.content}>
                            <View style={styles.headerbox}>
                                <Text style={styles.title}>Top Bowler</Text>
                            </View>
                            <View style={styles.contentbox}>
                                <Text style={styles.playerName}>Jasprit Bumrah</Text>
                                <View style={styles.statbox}>
                                    <Text style={styles.stats}>24 Wkts</Text>
                                    <Text style={styles.stats}>Avg: 18.2</Text>
                                    <Text style={styles.stats}>Eco: 6.8</Text>
                                </View>
                            </View>
                            <View style={styles.contentbox}>
                                <Text style={styles.playerName}>Deepak Chahar</Text>
                                <View style={styles.statbox}>
                                    <Text style={styles.stats}>16 Wkts</Text>
                                    <Text style={styles.stats}>Avg: 16.4</Text>
                                    <Text style={styles.stats}>Eco: 8.5</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </View>
    )
}

export default StatsTab

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 18,
        marginTop: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    titleBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
    },
    gradientBorder: {
        // flex: 1,
        padding: 1,
        borderRadius: 20,
    },
    outerContainer: {
        marginBottom: 15,
    },
    stadiumBox: {
        // flex: 1,
        backgroundColor: '#e7ebf7',
        borderRadius: 20,
    },
    batsmanBox: {
        // flex: 1,
        backgroundColor: '#fef7ef',
        borderRadius: 20,
    },
    bowlerBox: {
        // flex: 1,
        backgroundColor: '#f8e5e9',
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
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 10,
        paddingBlock: 5,
        paddingInline: 10,
    },
    statbox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    stats: {
        marginStart: 7,
    },
    playerName: {
        fontWeight: 'bold',
    },
})