import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Octicons, Ionicons } from '@expo/vector-icons';

const OverallAnalysis = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerbox}>
                <Ionicons name="search" size={24} color="black" />
                <Text style={styles.header}>Overall Analysis</Text>
            </View>
            <View style={styles.grid}>
                <View style={styles.card}>
                    <LinearGradient
                        colors={['#ffe0b200', '#ffe1be']}
                        start={{ x: 0.5, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        style={styles.gradientBorder}
                    >
                        <LinearGradient
                            colors={['#fff8f1', '#fee5ca']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradientBackground}
                        >
                            <Text style={styles.cardTitle}>Team Strength</Text>
                            <Text style={styles.cardValue}>77%</Text>
                        </LinearGradient>
                    </LinearGradient>
                </View>
                <View style={styles.card}>
                    <LinearGradient
                        colors={['#bbdefb00', '#b6e2ff']}
                        start={{ x: 0.5, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        style={styles.gradientBorder}
                    >
                        <LinearGradient
                            colors={['#e7f5ff', '#c1e6ff']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradientBackground}
                        >
                            <Text style={styles.cardTitle}>Winning Chance</Text>
                            <Text style={styles.cardValue}>85%</Text>
                        </LinearGradient>
                    </LinearGradient>
                </View>
                <View style={styles.card}>
                    <LinearGradient
                        colors={['#c8e6c900', '#c8fdda']}
                        start={{ x: 0.5, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        style={styles.gradientBorder}
                    >
                        <LinearGradient
                            colors={['#ebfff1', '#c8fdda']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradientBackground}
                        >
                            <Text style={styles.cardTitle}>Best Captain</Text>
                            <View style={styles.textContainer}>
                                <Text style={styles.cardText}>MS Dhoni or V Kohli</Text>
                            </View>
                        </LinearGradient>
                    </LinearGradient>
                </View>
                <View style={styles.card}>
                    <LinearGradient
                        colors={['#f8bbd000', '#f6b6c1']}
                        start={{ x: 0.5, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        style={styles.gradientBorder}
                    >
                        <LinearGradient
                            colors={['#ffecf0', '#f6b6c1']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradientBackground}
                        >
                            <Text style={styles.cardTitle}>Projected Points (Captain)</Text>
                            <Text style={styles.cardValue}>250</Text>
                        </LinearGradient>
                    </LinearGradient>
                </View>
                <View style={styles.card}>
                    <LinearGradient
                        colors={['#dcedc800', '#f9c0e7']}
                        start={{ x: 0.5, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        style={styles.gradientBorder}
                    >
                        <LinearGradient
                            colors={['#ffebf8', '#f9c0e7']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradientBackground}
                        >
                            <Text style={styles.cardTitle}>Best Vice Captain</Text>
                            <View style={styles.textContainer}>
                                <Text style={styles.cardText}>R Jadeja or S Gill</Text>
                            </View>
                        </LinearGradient>
                    </LinearGradient>
                </View>
                <View style={styles.card}>
                    <LinearGradient
                        colors={['#f8bbd000', '#aef4d8']}
                        start={{ x: 0.5, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        style={styles.gradientBorder}
                    >
                        <LinearGradient
                            colors={['#d9faed', '#aef4d8']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradientBackground}
                        >
                            <Text style={styles.cardTitle}>Projected Points (Vice Captain)</Text>
                            <Text style={styles.cardValue}>220</Text>
                        </LinearGradient>
                    </LinearGradient>
                </View>
            </View>
            <View style={styles.strongPointsSection}>
                <Text style={styles.strongPointsTitle}>Strong Points:</Text>
                <View style={styles.bulletList}>
                    <View style={styles.bulletItem}>
                        <Octicons name="dot-fill" size={18} color="#101d4d" style={styles.bullet} />
                        <Text style={styles.bulletText}>S Dube is in great form and expected to perform well.</Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <Octicons name="dot-fill" size={18} color="#101d4d" style={styles.bullet} />
                        <Text style={styles.bulletText}>M Siraj has delivered crucial performances in key moments and maintains a high fantasy points average.</Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <Octicons name="dot-fill" size={18} color="#101d4d" style={styles.bullet} />
                        <Text style={styles.bulletText}>U Patel has made a significant impact in multiple games and remains a reliable choice.</Text>
                    </View>
                </View>
            </View>
            <View style={styles.strongPointsSection}>
                <Text style={styles.strongPointsTitle}>Important Points:</Text>
                <View style={styles.bulletList}>
                    <View style={styles.bulletItem}>
                        <Octicons name="dot-fill" size={18} color="#101d4d" style={styles.bullet} />
                        <Text style={styles.bulletText}>S Dube is in great form and expected to perform well.</Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <Octicons name="dot-fill" size={18} color="#101d4d" style={styles.bullet} />
                        <Text style={styles.bulletText}>M Siraj has delivered crucial performances in key moments and maintains a high fantasy points average.</Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <Octicons name="dot-fill" size={18} color="#101d4d" style={styles.bullet} />
                        <Text style={styles.bulletText}>U Patel has made a significant impact in multiple games and remains a reliable choice.</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default OverallAnalysis;

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
        marginBottom: 20,
    },
    headerbox: {
        flexDirection: 'row',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        width: '48%',
        borderRadius: 8,
        marginBottom: 10,
        overflow: 'hidden',
    },
    gradientBorder: {
        padding: 1,
        borderRadius: 15,
    },
    gradientBackground: {
        padding: 12,
        borderRadius: 15,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
    },
    cardValue: {
        fontSize: 25,
        fontWeight: '800',
        color: '#101d4c',
    },
    cardText: {
        fontSize: 20,
        fontWeight: '800',
        color: '#101d4c',
    },
    strongPointsSection: {
        marginBottom: 20,
    },
    strongPointsTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#101d4c',
        marginBottom: 10,
    },
    bulletList: {
        marginLeft: 20,
    },
    bulletItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    bullet: {
        marginRight: 8,
    },
    bulletText: {
        fontSize: 14,
        color: '#000',
        flex: 1,
    },
});