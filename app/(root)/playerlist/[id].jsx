import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Header from '../../../components/Header';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import images from '@/constants/images';

const playerlist = () => {
    const { id } = useLocalSearchParams();
    const [apiData, setApiData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeRole, setActiveRole] = useState('ALL');

    // Map roles to icons
    const roleIcons = {
        WK: images.wk,
        BAT: images.bat,
        AR: images.ar,
        BOW: images.bow,
    };

    // Transform API data to match the expected structure
    const transformedData = apiData.map((player) => ({
        id: player._id,
        name: player.name,
        role: player.role,
        score: `${player.points} pts`, // Map points to score
        team: 'N/A', // Placeholder since team is not in API data
        icon: roleIcons[player.role] || images.playerPlaceholder, // Map role to icon
        image: images.playerPlaceholder, // Placeholder for player image
    }));

    // Calculate counts and total points for each role
    const roleCounts = apiData.reduce(
        (acc, player) => {
            acc[player.role] = (acc[player.role] || 0) + 1;
            acc[`${player.role}_points`] = (acc[`${player.role}_points`] || 0) + player.points;
            return acc;
        },
        { WK: 0, BAT: 0, AR: 0, BOW: 0, WK_points: 0, BAT_points: 0, AR_points: 0, BOW_points: 0 }
    );

    const filteredData = activeRole === 'ALL' ? transformedData : transformedData.filter((item) => item.role === activeRole);

    const handleTabPress = (role) => {
        setActiveRole(activeRole === role ? 'ALL' : role);
    };

    const renderItem = ({ item }) => (
        <View style={styles.playerContainer}>
            <Image source={item.image} style={styles.playerImage} />
            <View style={styles.playerInfo}>
                <View style={styles.playerheader}>
                    <View>
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                    <View style={styles.roleContainer}>
                        <Text style={styles.roleText}>{item.role}</Text>
                    </View>
                </View>
                <View style={styles.playerheader}>
                    <View>
                        <Text style={styles.scoreText}>{item.score}</Text>
                        <Text style={styles.teamText}>{item.team}</Text>
                    </View>
                    <View style={styles.playerIconBox}>
                        <Image source={item.icon} style={styles.playerIcon} resizeMode="contain" />
                    </View>
                </View>
            </View>
        </View>
    );

    const fetchAllTeamMembers = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://192.168.1.159:3000/api/get-ai-teams`, {
                params: { id },
            });
            // console.log('Team Data:', JSON.stringify(response.data, null, 2));

            setApiData(response.data.results.players || []);
        } catch (error) {
            console.error('Team fetch failed:', error.message);
            setApiData([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllTeamMembers();
    }, [id]);

    if (isLoading) {
        return (
            <View style={styles.main}>
                <Header />
                <View style={styles.container}>
                    <Text style={styles.title}>Loading...</Text>
                </View>
            </View>
        );
    }

    if (apiData.length === 0) {
        return (
            <View style={styles.main}>
                <Header />
                <View style={styles.container}>
                    <Text style={styles.title}>No players found</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.main}>
            <Header />
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.titleBox}>
                            <Text style={styles.title}>Players List</Text>
                        </View>
                    </View>
                    <View style={styles.stats}>
                        <TouchableOpacity
                            style={[styles.tabBox, activeRole === 'WK' ? styles.activeTabBox : null]}
                            onPress={() => handleTabPress('WK')}
                        >
                            <Text style={[styles.tabTitle, activeRole === 'WK' ? styles.activetabTitle : null]}>
                                WK ({roleCounts.WK})
                            </Text>
                            <Text style={styles.tabSubTitle}>{roleCounts.WK_points} pts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabBox, activeRole === 'BAT' ? styles.activeTabBox : null]}
                            onPress={() => handleTabPress('BAT')}
                        >
                            <Text style={[styles.tabTitle, activeRole === 'BAT' ? styles.activetabTitle : null]}>
                                BAT ({roleCounts.BAT})
                            </Text>
                            <Text style={styles.tabSubTitle}>{roleCounts.BAT_points} pts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabBox, activeRole === 'AR' ? styles.activeTabBox : null]}
                            onPress={() => handleTabPress('AR')}
                        >
                            <Text style={[styles.tabTitle, activeRole === 'AR' ? styles.activetabTitle : null]}>
                                AR ({roleCounts.AR})
                            </Text>
                            <Text style={styles.tabSubTitle}>{roleCounts.AR_points} pts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabBox, activeRole === 'BOW' ? styles.activeTabBox : null]}
                            onPress={() => handleTabPress('BOW')}
                        >
                            <Text style={[styles.tabTitle, activeRole === 'BOW' ? styles.activetabTitle : null]}>
                                BOW ({roleCounts.BOW})
                            </Text>
                            <Text style={styles.tabSubTitle}>{roleCounts.BOW_points} pts</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boxTitle}>
                        <TouchableOpacity onPress={() => setActiveRole('ALL')}>
                            <Text style={styles.boxTitleText}>
                                Playing XI {activeRole !== 'ALL' ? `(${activeRole})` : ''}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={filteredData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default playerlist;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginBottom: verticalScale(20),
    },
    container: {
        padding: 16,
        backgroundColor: '#f0fdf4',
        borderRadius: 18,
        marginTop: 10,
        borderColor: '#96e6b0',
        borderWidth: 1,
        margin: verticalScale(10),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    playerheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    boxTitle: {
        marginVertical: 10,
    },
    boxTitleText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
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
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        backgroundColor: '#d8fae3',
        borderRadius: 10,
    },
    playerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#96e6b0',
        marginBottom: 10,
        backgroundColor: '#d8fae3',
    },
    playerImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#96e6b0',
        backgroundColor: '#96e6b0',
    },
    playerIconBox: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#96e6b0',
        backgroundColor: '#fff',
        padding: 5,
    },
    playerIcon: {
        width: 25,
        height: 25,
    },
    playerInfo: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    roleContainer: {
        padding: 5,
        borderRadius: 5,
    },
    roleText: {
        fontSize: 12,
        color: '#333',
    },
    scoreText: {
        fontSize: 14,
        color: '#333',
    },
    teamText: {
        fontSize: 12,
        color: '#666',
    },
    tabBox: {
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
    },
    activeTabBox: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        alignItems: 'center',
    },
    tabTitle: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    activetabTitle: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 14,
    },
    tabSubTitle: {
        fontSize: 12,
        color: '#666',
    },
});