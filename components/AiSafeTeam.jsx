import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useMemo } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import images from '@/constants/images';

const AiSafeTeam = ({ teamData }) => {
    const [activeRole, setActiveRole] = useState('ALL');

    // MOVE THIS TO THE TOP — BEFORE useMemo!
    const getRoleIcon = (role) => {
        switch (role) {
            case 'WK': return images.wk;
            case 'BAT': return images.bat;
            case 'BOW': return images.bow;
            case 'ALL': return images.ar;
            default: return images.ar;
        }
    };

    const processedTeamData = useMemo(() => {
        if (!teamData?.players || !Array.isArray(teamData.players)) return [];

        const seen = new Set();
        return teamData.players
            .filter(p => p?._id && p.name && !seen.has(p._id))
            .map(p => {
                seen.add(p._id);
                return {
                    id: p._id,
                    name: p.name,
                    role: p.role || 'ALL',
                    score: p.credit ? `${p.credit}cr` : 'N/A',
                    icon: getRoleIcon(p.role), // Now it's defined!
                    isCaptain: teamData.settings?.captain === p.name,
                    isViceCaptain: teamData.settings?.viceCaptain === p.name,
                };
            });
    }, [teamData]);

    const stats = useMemo(() => {
        const counts = { ALL: 0, WK: 0, BAT: 0, BOW: 0 };
        const credits = { ALL: 0, WK: 0, BAT: 0, BOW: 0 };

        processedTeamData.forEach(p => {
            counts[p.role] = (counts[p.role] || 0) + 1;
            counts.ALL++;
            const cr = parseFloat(p.score) || 0;
            credits[p.role] = (credits[p.role] || 0) + cr;
            credits.ALL += cr;
        });

        return ['ALL', 'WK', 'BAT', 'BOW'].map(role => ({
            role,
            count: counts[role],
            totalCredits: credits[role].toFixed(1),
        }));
    }, [processedTeamData]);

    const filteredData = activeRole === 'ALL' ? processedTeamData : processedTeamData.filter(p => p.role === activeRole);

    const handleTabPress = (role) => {
        setActiveRole(activeRole === role ? 'ALL' : role);
    };

    const renderPlayer = ({ item }) => (
        <View style={styles.playerContainer}>
            <View style={styles.playerIconBox}>
                <Image source={item.icon} style={styles.playerIcon} resizeMode="contain" />
            </View>
            <View style={styles.playerInfo}>
                <View style={styles.row}>
                    <View style={styles.nameRow}>
                        <Text style={styles.playerName}>{item.name}</Text>
                        {item.isCaptain && <Text style={styles.captainBadge}> (C)</Text>}
                        {item.isViceCaptain && <Text style={styles.viceCaptainBadge}> (VC)</Text>}
                    </View>
                    <View style={styles.roleBadge}>
                        <Text style={styles.roleText}>{item.role}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={styles.creditText}>{item.score}</Text>
                </View>
            </View>
        </View>
    );

    if (!teamData) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Safe Team Not Available</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleSection}>
                    <Entypo name="shield" size={28} color="#16a34a" />
                    <Text style={styles.title}>Safe Team</Text>
                </View>
                <View style={styles.winRateSection}>
                    <Text style={styles.winRate}>
                        {teamData.winRate ? `${teamData.winRate}% Win` : 'N/A'}
                    </Text>
                    <Text style={styles.subtitle}>Low Risk • High Consistency</Text>
                </View>
            </View>

            <View style={styles.tabsContainer}>
                {stats.map(({ role, count, totalCredits }) => (
                    <TouchableOpacity
                        key={role}
                        style={[styles.tab, activeRole === role && styles.activeTab]}
                        onPress={() => handleTabPress(role)}
                    >
                        <Text style={[styles.tabText, activeRole === role && styles.activeTabText]}>
                            {role} ({count})
                        </Text>
                        <Text style={styles.tabCredits}>{totalCredits}cr</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.playingXiTitle}>
                Playing XI {activeRole !== 'ALL' ? `(${activeRole})` : ''}
            </Text>

            <FlatList
                data={filteredData}
                renderItem={renderPlayer}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

export default AiSafeTeam;

// Styles remain the same
const styles = StyleSheet.create({
    container: { backgroundColor: '#f0fdf4', borderRadius: 20, borderWidth: 2, borderColor: '#86efac', overflow: 'hidden', marginVertical: 8 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#ecfdf5', borderBottomWidth: 1, borderColor: '#86efac' },
    titleSection: { flexDirection: 'row', alignItems: 'center' },
    title: { fontSize: 22, fontWeight: '800', color: '#16a34a', marginLeft: 10 },
    winRateSection: { alignItems: 'flex-end' },
    winRate: { backgroundColor: '#16a34a', color: 'white', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, fontWeight: 'bold', fontSize: 15 },
    subtitle: { fontSize: 12, color: '#666', marginTop: 4 },
    tabsContainer: { flexDirection: 'row', backgroundColor: '#bbf7d0', padding: 8, margin: 12, borderRadius: 12, justifyContent: 'space-around' },
    tab: { alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
    activeTab: { backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 5 },
    tabText: { fontWeight: 'bold', color: '#666' },
    activeTabText: { color: '#16a34a' },
    tabCredits: { fontSize: 11, color: '#888', marginTop: 2 },
    playingXiTitle: { fontSize: 17, fontWeight: '700', color: '#333', paddingHorizontal: 16, marginTop: 8, marginBottom: 12 },
    playerContainer: { flexDirection: 'row', backgroundColor: '#bbf7d0', marginHorizontal: 16, marginBottom: 10, padding: 12, borderRadius: 14, borderWidth: 1, borderColor: '#86efac', alignItems: 'center' },
    playerIconBox: { backgroundColor: 'white', padding: 8, borderRadius: 12, borderWidth: 1, borderColor: '#86efac' },
    playerIcon: { width: 36, height: 36 },
    playerInfo: { flex: 1, marginLeft: 12 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    nameRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    playerName: { fontSize: 16, fontWeight: '600', color: '#333' },
    captainBadge: { color: '#d32f2f', fontWeight: 'bold', fontSize: 13, marginLeft: 6 },
    viceCaptainBadge: { color: '#1976d2', fontWeight: 'bold', fontSize: 13, marginLeft: 6 },
    roleBadge: { backgroundColor: '#f0f0f0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    roleText: { fontSize: 13, fontWeight: 'bold', color: '#444' },
    creditText: { fontSize: 15, color: '#16a34a', fontWeight: '600' },
    emptyContainer: { padding: 40, alignItems: 'center' },
    emptyText: { fontSize: 16, color: '#999', fontStyle: 'italic' },
});