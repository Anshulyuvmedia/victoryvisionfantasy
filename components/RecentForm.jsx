import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const RecentForm = ({ recentForm }) => {
    // console.log('Inside Recent Form:', recentForm);
    const recentFormArray = recentForm?.recentForm ?? []; // Safe fallback
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
                colors={['#fadebf', '#fff7ed']}
                style={styles.gradientBorder}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Recent Form</Text>
                        {recentFormArray.map((teamData, index) => (
                            <View key={index} style={styles.teamContainer}>
                                <Text style={styles.team}>{getInitials(teamData.team)}</Text>
                                <View style={styles.form}>
                                    {teamData.last5.map((result, i) => (
                                        <View
                                            key={i}
                                            style={result === 'W' ? styles.win : styles.loss}
                                        >
                                            <Text style={styles.indicatorText}>{result}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

export default RecentForm;

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
        backgroundColor: '#fff4e6',
        borderRadius: 20,
        overflow: 'hidden',
    },
    content: {
        paddingStart: 15,
        paddingTop: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    teamContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    team: {
        fontSize: 16,
        marginRight: 10,
        fontWeight: 'bold',
    },
    form: {
        flexDirection: 'row',
    },
    win: {
        paddingBlock: 5,
        paddingInline: 8,
        borderRadius: 100,
        backgroundColor: 'green',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loss: {
        paddingBlock: 5,
        paddingInline: 11,
        borderRadius: 100,
        backgroundColor: 'red',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicatorText: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});