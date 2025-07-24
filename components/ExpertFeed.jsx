import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';

const ExpertFeed = () => {
    const feedData = [
        { id: '1', initial: 'AK', title: 'Pitch', description: 'Pitch looks good for batting. Expect high scores.', timestamp: '2h ago' },
        { id: '2', initial: 'RG', title: 'Bowling', description: 'Pitch looks good for batting. Expect high scores.', timestamp: '2h ago' },
        { id: '3', initial: 'SG', title: 'Pitch', description: 'Pitch looks good for batting. Expect high scores.', timestamp: '2h ago' },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.feedItem}>
            <View style={styles.content}>
                <View style={styles.headerbox}>
                    <View style={styles.namebox}>
                        <View style={styles.icon}>
                            <Text style={styles.initial}>{item.initial}</Text>
                        </View>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                </View>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Expert Consensus</Text>
            <FlatList
                data={feedData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

export default ExpertFeed;

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
        marginBottom: 12,
    },
    listContent: {
        paddingBottom: 10,
    },
    feedItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f0f4ff',
        borderRadius: 8,
        marginBottom: 10,
    },
    icon: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#6b9eff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    initial: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        color: '#666',
    },
    timestamp: {
        fontSize: 12,
        color: '#666',
    },
    headerbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    namebox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});