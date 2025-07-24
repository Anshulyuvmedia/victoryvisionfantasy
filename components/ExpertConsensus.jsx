import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import images from '@/constants/images';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

const ExpertConsensus = () => {
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
                            start={{ x: 0.5, y: 0.8 }}
                            end={{ x: 0, y: 0 }}
                            style={styles.borderGradient}
                        >
                            <LinearGradient
                                colors={['#ffffff', '#fed7aa8e']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={styles.bgGradient}
                            >
                                <Image
                                    source={images.crown}
                                    style={styles.cardImageCrown}
                                    resizeMode="contain"
                                ></Image>
                                <View style={styles.content}>
                                    <Text style={styles.cardTitle}>Must-Have Captain</Text>
                                    <View style={styles.playerBox}>
                                        <FontAwesome5 name="crown" size={18} color="#ffc078" />
                                        <Text style={styles.playerName}>Virat Kohli</Text>
                                    </View>
                                    <View style={styles.orangePill}>
                                        <Text style={styles.expertPercent}>85% Experts</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </LinearGradient>
                    </View>

                    <View style={styles.smallcard}>
                        <LinearGradient
                            colors={['#BBF7D000', '#BBF7D0']}
                            start={{ x: 0.5, y: 0.8 }}
                            end={{ x: 0, y: 0 }}
                            style={styles.borderGradient}
                        >
                            <LinearGradient
                                colors={['#ffffff', '#dbfde6']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={styles.bgGradient}
                            >
                                <Image
                                    source={images.greenUp}
                                    style={styles.cardImageUpArrow}
                                    resizeMode="contain"
                                >
                                </Image>
                                <View style={styles.content}>
                                    <Text style={styles.cardTitle}>Differential Pick</Text>
                                    <View style={styles.playerBox}>
                                        <Image source={images.gaingreen} style={styles.playerIcon} resizeMode="contain" />
                                        <Text style={styles.playerName}>Deepak Chahar</Text>
                                    </View>
                                    <View style={styles.greenPill}>
                                        <Text style={styles.expertPercent}>Low Ownership</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </LinearGradient>
                    </View>
                </View>
                <View style={styles.col}>
                    <View style={styles.smallcard}>
                        <LinearGradient
                            colors={['#ACDDFF00', '#ACDDFF']}
                            start={{ x: 0.5, y: 0.8 }}
                            end={{ x: 0, y: 0 }}
                            style={styles.borderGradient}
                        >
                            <LinearGradient
                                colors={['#ffffff', '#e4f4ff']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={styles.bgGradient}
                            >
                                <Image
                                    source={images.star}
                                    style={styles.cardImageStar}
                                    resizeMode="contain"
                                >
                                </Image>
                                <View style={styles.content}>
                                    <Text style={styles.cardTitle}>Vice-Captain Pick</Text>
                                    <View style={styles.playerBox}>
                                        <FontAwesome name="star" size={18} color="#91CCF3" />
                                        <Text style={styles.playerName}>Jasprit Bumrah</Text>
                                    </View>
                                    <View style={styles.bluePill}>
                                        <Text style={styles.expertPercent}>72% Experts</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </LinearGradient>
                    </View>
                    <View style={styles.bigcard}>
                        <LinearGradient
                            colors={['#F4A1AF00', '#F4A1AF']}
                            start={{ x: 0.5, y: 0.8 }}
                            end={{ x: 0, y: 0 }}
                            style={styles.borderGradient}
                        >
                            <LinearGradient
                                colors={['#ffffff', '#ffecf0']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={styles.bgGradient}
                            >
                                <Image
                                    source={images.redDown}
                                    style={styles.cardImageDownArrow}
                                    resizeMode="contain"
                                >
                                </Image>
                                <View style={styles.content}>
                                    <Text style={styles.cardTitle}>Avoid List</Text>
                                    <View style={styles.playerBox}>
                                        <Image source={images.lossred} style={styles.playerIcon} resizeMode="contain" />
                                        <Text style={styles.playerName}>Player X</Text>
                                    </View>
                                    <View style={styles.redPill}>
                                        <Text style={styles.expertPercent}>Injury Concern</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </LinearGradient>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ExpertConsensus

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
        height: 120,
        marginBottom: 10,
        borderRadius: 12,
        overflow: 'hidden',
        // borderWidth: 1,

    },
    bigcard: {
        width: '100%',
        height: 175,
        marginBottom: 10,
        borderRadius: 12,
        overflow: 'hidden',
        // borderWidth: 1,
    },
    cardImageCrown: {
        width: '75%',
        height: '75%',
        position: 'absolute',
        bottom: -15,
        right: 0,
    },
    cardImageStar: {
        width: '75%',
        height: '75%',
        position: 'absolute',
        bottom: -15,
        right: -25,
    },
    cardImageUpArrow: {
        width: '75%',
        height: '75%',
        position: 'absolute',
        bottom: -10,
        right: 10,
    },
    cardImageDownArrow: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: -10,
        right: 10,
    },
    borderGradient: {
        borderRadius: 12,
        height: '100%',
        padding: 1,
    },
    bgGradient: {
        padding: 12,
        borderRadius: 12,
        height: '100%',
    },
    content: {
        // padding: 5,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000',
    },
    playerBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerName: {
        fontSize: 14,
        fontWeight: 'normal',
        marginBottom: 4,
        color: '#333',
        marginLeft: 4,
    },
    expertPercent: {
        fontSize: 10,
        color: '#000',
    },
    orangePill: {
        marginTop: 5,
        backgroundColor: '#ffe0bc',
        paddingBlock: 3,
        alignItems: 'center',
        borderRadius: 20,
        width: 100,
    },
    greenPill: {
        marginTop: 5,
        backgroundColor: '#ccfadd',
        paddingBlock: 3,
        alignItems: 'center',
        borderRadius: 20,
        width: 100,

    },
    redPill: {
        marginTop: 5,
        backgroundColor: '#ffd4dc',
        paddingBlock: 3,
        alignItems: 'center',
        borderRadius: 20,
        width: 100,
    },
    bluePill: {
        marginTop: 5,
        backgroundColor: '#cbeaff',
        paddingBlock: 3,
        alignItems: 'center',
        width: 100,
        borderRadius: 20,
    },
    playerIcon: {
        width: 18,
        height: 18,
    },
});