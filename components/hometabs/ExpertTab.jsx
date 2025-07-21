import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import images from '@/constants/images';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

const ExpertTab = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>Expert Consensus</Text>
                </View>
                <Text style={styles.iplText}>IPL 2025</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.col}>
                    <View style={styles.bigcard}>
                        <LinearGradient
                            colors={['#FED7AA00', '#FED7AA']}
                            start={{ x: 0.5, y: 0.2 }}
                            end={{ x: 0, y: 0 }}
                            style={styles.borderGradient}
                        >
                            <ImageBackground
                                source={images.crown}
                                style={styles.cardImage}
                                resizeMode="contain"
                            >
                                <Text style={styles.cardTitle}>Must-Have Captain</Text>
                                <View style={styles.playerBox}>
                                    <FontAwesome5 name="crown" size={22} color="#ff9800" />
                                    <Text style={styles.playerName}>Virat Kohli</Text>
                                </View>
                                <Text style={styles.expertPercent}>85% Experts</Text>
                            </ImageBackground>
                        </LinearGradient>
                    </View>
                    <View style={styles.smallcard}>
                        <LinearGradient
                            colors={['#BBF7D000', '#BBF7D0']}
                            start={{ x: 0.5, y: 0.2 }}
                            end={{ x: 0, y: 0 }}
                            style={styles.borderGradient}
                        >
                            <ImageBackground
                                source={images.greenUp}
                                style={styles.cardImage}
                                resizeMode="contain"
                            >
                                <Text style={styles.cardTitle}>Differential Pick</Text>
                                <View style={styles.playerBox}>
                                    <Image source={images.gaingreen} style={styles.playerIcon} resizeMode="contain" />
                                    <Text style={styles.playerName}>Deepak Chahar</Text>
                                </View>
                                <Text style={styles.ownershipText}>Low Ownership</Text>
                            </ImageBackground>
                        </LinearGradient>
                    </View>
                </View>
                <View style={styles.col}>
                    <View style={styles.smallcard}>
                        <LinearGradient
                            colors={['#ACDDFF00', '#ACDDFF']}
                            start={{ x: 0.5, y: 0.2 }}
                            end={{ x: 0, y: 0 }}
                            style={styles.borderGradient}
                        >
                            <ImageBackground
                                source={images.star}
                                style={styles.cardImage}
                                resizeMode="contain"
                            >
                                <Text style={styles.cardTitle}>Vice-Captain Pick</Text>
                                <View style={styles.playerBox}>
                                    <FontAwesome name="star" size={24} color="#91CCF3" />
                                    <Text style={styles.playerName}>Jasprit Bumrah</Text>
                                </View>
                                <Text style={styles.expertPercent}>72% Experts</Text>
                            </ImageBackground>
                        </LinearGradient>
                    </View>
                    <View style={styles.bigcard}>
                        <LinearGradient
                            colors={['#F4A1AF00', '#F4A1AF']}
                            start={{ x: 0.5, y: 0.2 }}
                            end={{ x: 0, y: 0 }}
                            style={styles.borderGradient}
                        >
                            <ImageBackground
                                source={images.redDown}
                                style={styles.cardImage}
                                resizeMode="contain"
                            >
                                <Text style={styles.cardTitle}>Avoid List</Text>
                                <View style={styles.playerBox}>
                                    <Image source={images.lossred} style={styles.playerIcon} resizeMode="contain" />
                                    <Text style={styles.playerName}>Player X</Text>
                                </View>
                                <Text style={styles.injuryText}>Injury Concern</Text>
                            </ImageBackground>
                        </LinearGradient>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ExpertTab;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 20,
        marginTop: 10,
        backgroundColor: '#fff',
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
        color: '#000',
    },
    iplText: {
        fontSize: 14,
        color: '#000',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    col: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginHorizontal: 5,
    },
    smallcard: {
        width: '100%',
        height: 150,
        marginBottom: 10,
        borderRadius: 12,
        overflow: 'hidden',
    },
    bigcard: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        borderRadius: 12,
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'bottom',
    },
    borderGradient: {
        padding: 12,
        borderRadius: 12,
        height: '100%',
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    playerBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
        marginLeft: 4,
    },
    expertPercent: {
        fontSize: 12,
        color: '#666',
    },
    ownershipText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    playerIcon: {
        width: 25,
        height: 25,
    },
});