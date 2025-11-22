import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { moderateScale } from 'react-native-size-matters';
import Header from '../../../components/Header';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import images from '@/constants/images';

const playerlist = () => {
    const { id } = useLocalSearchParams();
    const [team, setTeam] = useState({ players: [], captain: '', viceCaptain: '', zone: 'Balanced' });
    const [loading, setLoading] = useState(true);
    const [activeRole, setActiveRole] = useState('ALL');

    const roleIcons = { WK: images.wk, BAT: images.bat, AR: images.ar, BOWL: images.bow, ALL: images.ar };
    const getIcon = (r) => roleIcons[r] || images.ar;

    useEffect(() => {
        if (!id) return;
        axios.get(`https://api.victoryvision.live/api/getUserAITeamByID`, { params: { id } })
            .then(res => {
                const t = res.data.team?.[0];
                if (t) {
                    setTeam({
                        players: t.players || [],
                        captain: t.settings?.captain || '',
                        viceCaptain: t.settings?.viceCaptain || '',
                        zone: t.type || 'Balanced'
                    });
                }
            })
            .catch(() => setTeam({ players: [], captain: '', viceCaptain: '', zone: 'Balanced' }))
            .finally(() => setLoading(false));
    }, [id]);

    const { players, captain, viceCaptain, zone } = team;
    const isRisky = zone === 'Risky';

    const theme = {
        bg: isRisky ? '#fef2f2' : '#f0fdf4',
        card: isRisky ? '#fef2f2' : '#f8fdfa',
        accent: isRisky ? '#dc2626' : '#16a34a',
        border: isRisky ? '#fecaca' : '#86efac',
        cBadge: isRisky ? '#dc2626' : '#16a34a',
        vcBadge: isRisky ? '#ef4444' : '#22c55e',
    };

    const stats = players.reduce((a, p) => {
        const r = p.role || 'ALL';
        a[r] = (a[r] || 0) + 1;
        a[`${r}_pts`] = (a[`${r}_pts`] || 0) + (p.points || 0);
        return a;
    }, { WK: 0, BAT: 0, AR: 0, BOWL: 0, ALL: 0 });

    const filtered = activeRole === 'ALL' ? players : players.filter(p => p.role === activeRole);

    const PlayerCard = ({ item }) => {
        const isC = item.name === captain;
        const isVC = item.name === viceCaptain;

        return (
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <View style={[styles.iconBox, { borderColor: theme.border }]}>
                    <Image source={getIcon(item.role)} style={styles.roleIcon} resizeMode="contain" />
                </View>
                <View style={styles.info}>
                    <View style={styles.nameRow}>
                        <Text style={styles.name}>{item.name}</Text>
                        {(isC || isVC) && (
                            <View style={[styles.badge, { backgroundColor: isC ? theme.cBadge : theme.vcBadge }]}>
                                <Text style={styles.badgeText}>{isC ? 'C' : 'VC'}</Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.role}>{item.role}</Text>
                </View>
                {/* <View style={styles.pts}>
                    <Text style={[styles.points, { color: theme.accent }]}>{item.points || 0}</Text>
                    <Text style={styles.ptsLabel}>pts</Text>
                </View> */}
            </View>
        );
    };


    if (!players.length) return <View style={styles.center}><Header /><Text>No players</Text></View>;

    return (
        <View style={styles.main}>
            <Header />

            {loading &&
                <View style={styles.center}><Header /><Text>Loading...</Text></View>
            }
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={[styles.title, { color: theme.accent, }]}>Team Players</Text>

                    <View style={[styles.tabs, { backgroundColor: theme.card, borderColor: theme.border }]}>
                        {['ALL', 'WK', 'BAT', 'AR', 'BOWL'].map(r => (
                            <TouchableOpacity
                                key={r}
                                style={[styles.tab, activeRole === r && { backgroundColor: theme.cBadge }]}
                                onPress={() => setActiveRole(r)}
                            >
                                <Text style={[styles.tabText, activeRole === r && styles.activeTabText]}>
                                    {r} ({stats[r] || 0})
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.playingXI}>
                        Playing XI {activeRole !== 'ALL' ? `(${activeRole})` : ''}
                    </Text>

                    <FlatList
                        data={filtered}
                        renderItem={PlayerCard}
                        keyExtractor={i => i._id || i.name}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default playerlist;

const styles = StyleSheet.create({
    main: { flex: 1, backgroundColor: '#f0fdf4' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: { backgroundColor: '#fff', padding: 16, elevation: 8, borderWidth: 1, borderColor: '#e0f2e6' },
    title: { fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 16 },
    tabs: { flexDirection: 'row', backgroundColor: '#f0fdf4', padding: 12, borderRadius: 16, justifyContent: 'space-around', borderWidth: 1.5, borderColor: '#86efac', marginBottom: 16 },
    tab: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12 },
    activeTab: { backgroundColor: '#16a34a' },
    tabText: { fontSize: 14, fontWeight: 'bold', color: '#333' },
    activeTabText: { color: '#fff' },
    playingXI: { fontSize: 17, fontWeight: '700', color: '#1a1a1a', marginBottom: 12 },
    card: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 16, marginBottom: 10, borderWidth: 1.5 },
    iconBox: { width: 48, height: 48, backgroundColor: '#fff', borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5 },
    roleIcon: { width: 36, height: 36 },
    info: { flex: 1, marginLeft: 14 },
    nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    name: { fontSize: 16, fontWeight: '600', color: '#1a1a1a', flex: 1 },
    badge: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
    badgeText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
    role: { fontSize: 13, color: '#666', marginTop: 4 },
    pts: { alignItems: 'center' },
    points: { fontSize: 18, fontWeight: 'bold' },
    ptsLabel: { fontSize: 11, color: '#666', marginTop: 2 },
});