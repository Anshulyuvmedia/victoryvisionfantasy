import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState ,useEffect} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons'; // For the pick icon
import { useContext } from 'react';
import { GlobalContextReport } from '../app/GlobalContextReport';

const YouTopPlayerPicks = () => {
    const { apiData } = useContext(GlobalContextReport);
    const [topPicks, settopPicks] = useState([]);
    useEffect(() => {
        if (apiData?.topPicks) {
            settopPicks(apiData.topPicks);
        }
    }, [apiData]);

    const renderPlayerCard = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.playerInfo}>
                    <Text style={styles.playerName}>{item.player}</Text>
                    <View style={styles.statsrow}>
                        <Text style={styles.playerStat}>Picked: {item.picked} | </Text>
                        <Text style={styles.playerStat}>Avg Pts: {item.avgPoints}</Text>
                    </View>
                </View>
                <Text style={styles.playerSuccess}>Success: {item.successRate}%</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Top Player Picks</Text>
            <FlatList
                data={topPicks.slice(0, 10)}
                renderItem={renderPlayerCard}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

export default YouTopPlayerPicks;

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
        // paddingBottom: 20,
    },
    card: {
        padding: 15,
        marginBottom: 10,
        overflow: 'hidden',
        borderRadius: 20,
        backgroundColor: '#f1f5ff',
    },
    gradientBorder: {
        padding: 1,
    },
    gradientBackground: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    playerInfo: {
        flex: 1,
    },
    playerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    playerStat: {
        fontSize: 12,
        color: '#666',
        marginVertical: 2,

    },
    playerSuccess: {
        fontSize: 12,
        color: '#fff',
        marginVertical: 2,
        backgroundColor: '#5f83f1',
        paddingInline: 10,
        paddingBlock: 5,
        borderRadius: 10,
    },
    pickButton: {
        padding: 8,
    },
    statsrow: {
        flexDirection: 'row',
    },
});