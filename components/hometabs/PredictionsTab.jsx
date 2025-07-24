import React, { useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PredictionsTab = ({ onContentHeightChange }) => {
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
            <Text style={styles.header}>Match Predictions</Text>
            <View style={styles.matchsection}>
                <LinearGradient
                    colors={['#9dc5f7', '#fff']}
                    style={styles.gradientBorder}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <TouchableOpacity style={styles.card}>
                        <Text>Toss Winner</Text>
                        <Text style={styles.highlighttext}>Mumbai Indians</Text>
                        <Text>65% Probability</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient
                    colors={['#df6a3a', '#fff']}
                    style={styles.gradientBorder}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <TouchableOpacity style={styles.cardOrange}>
                        <Text>First Innings Score</Text>
                        <Text style={styles.highlighttextorange}>185-190</Text>
                        <Text>Predicted Range</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>

            <Text style={styles.subheader}>Top Batsman Predictions</Text>
            <View style={styles.section}>
                <View style={styles.cardGray}>
                    <Text>Top Batsman Predictions</Text>
                    <Text style={styles.highlight}>45+ Runs</Text>
                </View>
                <View style={styles.cardGray}>
                    <Text>Top Batsman Predictions</Text>
                    <Text style={styles.highlight}>45+ Runs</Text>
                </View>
            </View>

            <Text style={styles.subheader}>Top Bowler Predictions</Text>
            <View style={styles.section}>
                <View style={styles.cardGray}>
                    <Text>Jasprit Bumrah (MI)</Text>
                    <Text style={styles.highlight}>2+ Wickets</Text>
                </View>
                <View style={styles.cardGray}>
                    <Text>Deepak Chahar (CSK)</Text>
                    <Text style={styles.highlight}>2+ Wickets</Text>
                </View>
            </View>
        </View>
    );
};

export default PredictionsTab;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 18,
        marginTop: 10,
    },
    gradientBorder: {
        flex: 1,
        padding: 1,
        borderRadius: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subheader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    matchsection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    section: {
        flexDirection: 'col',
        justifyContent: 'space-between',
        marginBottom: 15,

    },
    card: {
        backgroundColor: '#e6f0fa',
        padding: 15,
        borderRadius: 20,
        width: '95%',
        alignItems: 'start',
    },
    cardOrange: {
        backgroundColor: '#ffe6cc',
        padding: 15,
        borderRadius: 20,
        width: '100%',
        alignItems: 'start',
    },
    cardGray: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 20,
        paddingInline: 10,

    },
    highlight: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
        backgroundColor: 'white',
        paddingInline: 10,
        borderRadius: 10,
    },
    highlighttext: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
        color: '#4a93f0',
    },
    highlighttextorange: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
        color: '#df6a3a',
    },
});