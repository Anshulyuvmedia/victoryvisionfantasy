import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const PredictionsTab = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Match Predictions</Text>

            <View style={styles.section}>
                <TouchableOpacity style={styles.card}>
                    <Text>Toss Winner</Text>
                    <Text style={styles.highlight}>Mumbai Indians</Text>
                    <Text>65% Probability</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardOrange}>
                    <Text>First Innings Score</Text>
                    <Text style={styles.highlight}>185-190</Text>
                    <Text>Predicted Range</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.header}>Top Batsman Predictions</Text>
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

            <Text style={styles.header}>Top Bowler Predictions</Text>
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
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    card: {
        backgroundColor: '#e6f0fa',
        padding: 10,
        borderRadius: 8,
        width: '48%',
        alignItems: 'center',
    },
    cardOrange: {
        backgroundColor: '#ffe6cc',
        padding: 10,
        borderRadius: 8,
        width: '48%',
        alignItems: 'center',
    },
    cardGray: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        width: '48%',
        alignItems: 'center',
        marginBottom: 10,
    },
    highlight: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
});