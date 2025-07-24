import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import images from '@/constants/images';

const AiRiskyTeam = () => {
    const [activeRole, setActiveRole] = useState('ALL'); // Default to show all players

    const teamData = [
        { id: '1', name: 'Rishabh Pant', role: 'WK', score: '8cr', team: 'DC', icon: images.wk, image: images.playerPlaceholder },
        { id: '2', name: 'Shubman Gill', role: 'BAT', score: '7.5cr', team: 'GT', icon: images.bat, image: images.playerPlaceholder },
        { id: '3', name: 'Ishan Kishan', role: 'BAT', score: '6.5cr', team: 'MI', icon: images.bat, image: images.playerPlaceholder },
        { id: '4', name: 'Sanju Samson', role: 'BAT', score: '7cr', team: 'RR', icon: images.bat, image: images.playerPlaceholder },
        { id: '5', name: 'Abhishek Sharma', role: 'BAT', score: '6cr', team: 'SRH', icon: images.bat, image: images.playerPlaceholder },
        { id: '6', name: 'Andre Russell', role: 'AR', score: '8.5cr', team: 'KKR', icon: images.ar, image: images.playerPlaceholder },
        { id: '7', name: 'Ben Stokes', role: 'AR', score: '7.5cr', team: 'CSK', icon: images.ar, image: images.playerPlaceholder },
        { id: '8', name: 'Trent Boult', role: 'BOW', score: '8cr', team: 'RR', icon: images.bow, image: images.playerPlaceholder },
        { id: '9', name: 'Kagiso Rabada', role: 'BOW', score: '7cr', team: 'PBKS', icon: images.bow, image: images.playerPlaceholder },
        { id: '10', name: 'Rashid Khan', role: 'BOW', score: '6.5cr', team: 'GT', icon: images.bow, image: images.playerPlaceholder },
        { id: '11', name: 'T Natarajan', role: 'BOW', score: '5.5cr', team: 'SRH', icon: images.bow, image: images.playerPlaceholder },
    ];

    const filteredData = activeRole === 'ALL' ? teamData : teamData.filter((item) => item.role === activeRole);

    const handleTabPress = (role) => {
        setActiveRole(activeRole === role ? 'ALL' : role); // Toggle to ALL if same role is clicked
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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleBox}>
                    <FontAwesome5 name="bolt" size={24} color="#ea580c" />
                    <Text style={styles.title}>Risky Team</Text>
                </View>
                <View style={styles.winRateBox}>
                    <Text style={styles.winBox}>92% Win Rate</Text>
                    <Text style={styles.subtitle}>High Risk High Rewards</Text>
                </View>
            </View>
            <View style={styles.stats}>
                <TouchableOpacity
                    style={[styles.tabBox, activeRole === 'WK' ? styles.activeTabBox : null]}
                    onPress={() => handleTabPress('WK')}
                >
                    <Text style={[styles.tabTitle, activeRole === 'WK' ? styles.activetabTitle : null]}>WK (1)</Text>
                    <Text style={styles.tabSubTitle}>8cr</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabBox, activeRole === 'BAT' ? styles.activeTabBox : null]}
                    onPress={() => handleTabPress('BAT')}
                >
                    <Text style={[styles.tabTitle, activeRole === 'BAT' ? styles.activetabTitle : null]}>BAT (4)</Text>
                    <Text style={styles.tabSubTitle}>27cr</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabBox, activeRole === 'AR' ? styles.activeTabBox : null]}
                    onPress={() => handleTabPress('AR')}
                >
                    <Text style={[styles.tabTitle, activeRole === 'AR' ? styles.activetabTitle : null]}>AR (2)</Text>
                    <Text style={styles.tabSubTitle}>16cr</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabBox, activeRole === 'BOW' ? styles.activeTabBox : null]}
                    onPress={() => handleTabPress('BOW')}
                >
                    <Text style={[styles.tabTitle, activeRole === 'BOW' ? styles.activetabTitle : null]}>BOW (4)</Text>
                    <Text style={styles.tabSubTitle}>27cr</Text>
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
                scrollEnabled={false} // Disable FlatList scrolling to rely on parent TabView
            />
        </View>
    );
};

export default AiRiskyTeam;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderColor: '#ffc377',
        borderWidth: 1,
        backgroundColor: '#fff7ed',
        borderRadius: 18,
        marginTop: 10,
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
    winRateBox: {
        flexDirection: 'column', // Fixed typo from 'col'
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    titleBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#ea580c',
    },
    subtitle: {
        fontSize: 12,
        marginTop: 5,
        color: '#666',
    },
    winBox: {
        backgroundColor: '#ea580c',
        paddingHorizontal: 20,
        paddingVertical: 5,
        color: 'white',
        borderRadius: 20,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        backgroundColor: '#ffe1bc',
        borderRadius: 10,
    },
    playerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ffc377',
        marginBottom: 10,
        backgroundColor: '#ffe1bc',
    },
    playerImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ffc377',
        backgroundColor: '#ffc377',
    },
    playerIconBox: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ffc377',
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
        backgroundColor: '#f0f0f0',
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
        color: '#ea580c',
        fontWeight: 'bold',
        fontSize: 14,
    },
    tabSubTitle: {
        fontSize: 12,
        color: '#666',
    },
});