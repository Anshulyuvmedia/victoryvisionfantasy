import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useCallback } from 'react';
import images from '@/constants/images';

const LineupsTab = ({ onContentHeightChange }) => {
    const handleLayout = useCallback(
                (event) => {
                    if (onContentHeightChange) {
                        const { height } = event.nativeEvent.layout;
                        onContentHeightChange(height); // Pass the measured height to the parent
                    }
                },
                [onContentHeightChange]
            );

    const [activeRole, setActiveRole] = useState('ALL'); // Default to show all players

    const teamData = [
        { id: '1', name: 'MS Dhoni', role: 'WK', score: '8.5cr', team: 'CSK', icon: images.wk, image: images.playerPlaceholder },
        { id: '2', name: 'Virat Kohli', role: 'BAT', score: '9cr', team: 'RCB', icon: images.bat, image: images.playerPlaceholder },
        { id: '3', name: 'Rohit Sharma', role: 'BAT', score: '8cr', team: 'MI', icon: images.bat, image: images.playerPlaceholder },
        { id: '4', name: 'KL Rahul', role: 'BAT', score: '7.5cr', team: 'LSG', icon: images.bat, image: images.playerPlaceholder },
        { id: '5', name: 'Suryakumar Yadav', role: 'BAT', score: '6.5cr', team: 'MI', icon: images.bat, image: images.playerPlaceholder },
        { id: '6', name: 'Ravindra Jadeja', role: 'AR', score: '7cr', team: 'CSK', icon: images.ar, image: images.playerPlaceholder },
        { id: '7', name: 'Hardik Pandya', role: 'AR', score: '6.5cr', team: 'MI', icon: images.ar, image: images.playerPlaceholder },
        { id: '8', name: 'Jasprit Bumrah', role: 'BOW', score: '9cr', team: 'MI', icon: images.bow, image: images.playerPlaceholder },
        { id: '9', name: 'Yuzvendra Chahal', role: 'BOW', score: '6cr', team: 'RR', icon: images.bow, image: images.playerPlaceholder },
        { id: '10', name: 'Mohammed Shami', role: 'BOW', score: '6.5cr', team: 'GT', icon: images.bow, image: images.playerPlaceholder },
        { id: '11', name: 'Arshdeep Singh', role: 'BOW', score: '5.5cr', team: 'PBKS', icon: images.bow, image: images.playerPlaceholder },
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
        <View style={styles.container} onLayout={handleLayout}>
            <View style={styles.header}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>Team Lineups</Text>
                </View>
                <Text>IPL 2025</Text>
            </View>
            <View style={styles.boxTitle}>
                <Text style={styles.boxTitleText}>
                    Playing XI 
                </Text>
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

export default LineupsTab;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f0fdf4',
        borderRadius: 18,
        marginTop: 10,
        borderColor: '#96e6b0',
        borderWidth: 1,
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
        color: 'green',
    },
    subtitle: {
        fontSize: 12,
        marginTop: 5,
        color: '#666',
    },
    winBox: {
        backgroundColor: 'green',
        paddingHorizontal: 20,
        paddingVertical: 5,
        color: 'white',
        borderRadius: 20,
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
        // backgroundColor: '#f0f0f0',
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
    blankText: {
        fontSize: 2,
    },
});