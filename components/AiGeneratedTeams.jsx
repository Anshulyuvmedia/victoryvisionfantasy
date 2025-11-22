import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image, SectionList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';
import { ToastAndroid } from 'react-native';
import images from '@/constants/images';

// Role Icons
const ROLE_ICONS = {
    WK: images.wk,
    BAT: images.bat,
    ALL: images.ar,
    AR: images.ar,
    BOWL: images.bow,
};

const getRoleIcon = (role) => ROLE_ICONS[role?.toUpperCase()] || images.ar;

// Dynamic Theme
const getTheme = (zone) => {
    const isRisky = zone === 'Risky';
    return {
        headerBg: isRisky ? '#fee2e2' : '#bbf7d0',
        accent: isRisky ? '#dc2626' : '#16a34a',
        gradientEnd: isRisky ? '#ef4444' : '#31ae5f',
        contentBg: isRisky ? '#fef2f2' : '#f0fdf4',
        zoneBorder: isRisky ? '#dc2626' : '#4CAF50',
        zoneColor: isRisky ? '#dc2626' : '#4CAF50',
        copyBg: isRisky ? '#fee2e2' : '#bbf7d0',
        dtBg: isRisky ? '#ef4444' : '#4CAF50',
    };
};

const AiGeneratedTeams = ({ userAITeams }) => {
    const [pairedTeams, setPairedTeams] = useState([]); // Will hold { time, safe, risky }
    const [searchQuery, setSearchQuery] = useState('');

    const formatDate = (date) => {
        const d = new Date(date);
        const now = new Date();
        const isToday = d.toDateString() === now.toDateString();

        if (isToday) {
            return d.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).replace(' ', '').toLowerCase(); // e.g., "03:45pm"
        }

        return d.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).replace(',', ''); // e.g., "22 Nov, 03:45 pm"
    };


    const fetchTeams = async () => {
        try {
            const stored = await AsyncStorage.getItem('userData');
            const user = stored ? JSON.parse(stored) : {};
            const userid = user.userid;

            const res = await axios.get('https://api.victoryvision.live/api/getUsers-Ai-teams', {
                params: userid ? { userid } : {}
            });

            const results = res.data.results || [];

            const processedTeams = results.map(team => {
                const players = team.players || [];
                const counts = players.reduce((a, p) => {
                    if (p.role === 'WK') a.wk++;
                    else if (p.role === 'BAT') a.bat++;
                    else if (p.role === 'ALL' || p.role === 'AR') a.ar++;
                    else if (p.role === 'BOWL') a.bow++;
                    return a;
                }, { wk: 0, bat: 0, ar: 0, bow: 0 });

                const cap = players.find(p => p.name === team.settings?.captain) || {};
                const vc = players.find(p => p.name === team.settings?.viceCaptain) || {};

                return {
                    id: team._id,
                    teamId: team._id,
                    players,
                    ...counts,
                    captain: team.settings?.captain || '—',
                    captainRole: cap.role || 'ALL',
                    viceCaptain: team.settings?.viceCaptain || '—',
                    viceCaptainRole: vc.role || 'ALL',
                    dtPlayers: players.length,
                    zone: team.type || 'Balanced',
                    teamNumber: team.settings?.teamCount || 1,
                    winRate: team.winRate || 0,
                    createdAt: team.createdAt ? new Date(team.createdAt) : new Date(),
                };
            });

            // Sort newest first
            processedTeams.sort((a, b) => b.createdAt - a.createdAt);

            // Group by same minute (Safe + Risky generated together)
            const pairsMap = {};
            processedTeams.forEach(team => {
                const minuteKey = team.createdAt.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
                if (!pairsMap[minuteKey]) {
                    pairsMap[minuteKey] = { time: team.createdAt, safe: null, risky: null };
                }
                if (team.zone === 'Risky') {
                    pairsMap[minuteKey].risky = team;
                } else {
                    pairsMap[minuteKey].safe = team; // Assume non-risky = safe
                }
            });

            // Convert to array, sort by time, take latest 5
            const pairedList = Object.values(pairsMap)
                .sort((a, b) => b.time - a.time)
                .slice(0, 5)
                .map(pair => ({
                    ...pair,
                    title: formatDate(pair.time), // Uses our custom formatter
                    data: [pair],
                }));

            setPairedTeams(pairedList);
        } catch (err) {
            console.error('Fetch failed:', err);
            setPairedTeams([]);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, [userAITeams]);

    const copyTeam = async (team) => {
        const text = team.players.map(p => `${p.name} (${p.role})`).join(', ');
        await Clipboard.setStringAsync(text);
        ToastAndroid.show('Team copied!', ToastAndroid.SHORT);
    };



    // Filter pairs by team number or time
    const filteredSections = pairedTeams
        .map(section => {
            const safeNum = section.safe?.teamNumber?.toString() || '';
            const riskyNum = section.risky?.teamNumber?.toString() || '';
            const timeStr = section.title.toLowerCase();

            const matches = safeNum.includes(searchQuery) ||
                riskyNum.includes(searchQuery) ||
                timeStr.includes(searchQuery.toLowerCase());

            return matches ? section : null;
        })
        .filter(Boolean);

    const renderTeamCard = (team) => {
        if (!team) return null;
        const theme = getTheme(team.zone);

        return (
            <View style={styles.card}>
                <LinearGradient colors={['#f0f4ff80', '#ffffff00']} style={styles.gradientBg}>
                    {/* Header */}
                    <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
                        <View style={styles.stats}>
                            <Text style={styles.stat}>WK: {team.wk}</Text>
                            <Text style={styles.stat}>BAT: {team.bat}</Text>
                            <Text style={styles.stat}>AR: {team.ar}</Text>
                            <Text style={styles.stat}>BOW: {team.bow}</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={[styles.teamNo, { backgroundColor: theme.accent }]}>T{team.teamNumber}</Text>
                            <TouchableOpacity
                                style={[styles.arrow, { backgroundColor: theme.accent }]}
                                onPress={() => router.push(`/(root)/playerlist/${team.teamId}`)}
                            >
                                <Feather name="arrow-up-right" size={16} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Body */}
                    <LinearGradient colors={['#f0f4ff00', theme.gradientEnd]} style={styles.borderGradient}>
                        <View style={[styles.body, { backgroundColor: theme.contentBg }]}>
                            <View style={styles.captains}>
                                {/* Captain */}
                                <View style={styles.row}>
                                    <Text style={[styles.cvc, { backgroundColor: theme.accent }]}>C</Text>
                                    <View style={styles.iconBox}>
                                        <Image source={getRoleIcon(team.captainRole)} style={styles.roleIcon} resizeMode="contain" />
                                    </View>
                                    <View style={styles.details}>
                                        <Text style={styles.name}>{team.captain}</Text>
                                        <Text style={styles.role}>{team.captainRole}</Text>
                                    </View>
                                </View>

                                {/* Vice-Captain */}
                                <View style={styles.row}>
                                    <Text style={[styles.cvc, { backgroundColor: theme.accent }]}>VC</Text>
                                    <View style={styles.iconBox}>
                                        <Image source={getRoleIcon(team.viceCaptainRole)} style={styles.roleIcon} resizeMode="contain" />
                                    </View>
                                    <View style={styles.details}>
                                        <Text style={styles.name}>{team.viceCaptain}</Text>
                                        <Text style={styles.role}>{team.viceCaptainRole}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.statsRight}>
                                <Text style={styles.winLabel}>Win Rate</Text>
                                <Text style={styles.winRate}>{team.winRate}%</Text>
                                <View style={[styles.dtBox, { backgroundColor: theme.dtBg }]}>
                                    <Text style={styles.dtText}>DT Players</Text>
                                    <Text style={styles.dtCount}>{team.dtPlayers}</Text>
                                </View>
                                <Text style={[styles.zone, { borderColor: theme.zoneBorder, color: theme.zoneColor }]}>
                                    {team.zone} Team
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={[styles.copyBtn, { backgroundColor: theme.copyBg }]} onPress={() => copyTeam(team)}>
                            <Text style={styles.copyText}>Copy Team</Text>
                            <Feather name="copy" size={16} color="#000" />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        );
    };

    const renderSection = ({ item }) => (
        <View style={styles.sectionContainer}>
            {/* Section Header - Time + Icons */}
            <View style={styles.sectionHeader}>
                <Feather name="clock" size={16} color="#666" />
                <Text style={styles.sectionTitle}>{item.title}</Text>
                <View style={styles.zoneLabels}>
                    {item.safe && <Text style={styles.safeLabel}>Safe</Text>}
                    {item.risky && <Text style={styles.riskyLabel}>Risky</Text>}
                </View>
            </View>

            {/* Two Teams Side by Side */}
            <View style={styles.pairContainer}>
                <View style={styles.teamWrapper}>{renderTeamCard(item.safe)}</View>
                <View style={styles.teamWrapper}>{renderTeamCard(item.risky)}</View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.mainBox}>
                <Text style={styles.title}>AI Generated Teams (Latest 5 Pairs)</Text>
                <TextInput
                    style={styles.search}
                    placeholder="Search by team no. or time..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {filteredSections.length === 0 ? (
                <Text style={styles.noData}>No teams found</Text>
            ) : (
                <FlatList
                    data={filteredSections}
                    renderItem={renderSection}
                    keyExtractor={(item) => item.title}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

export default AiGeneratedTeams;

// Updated Styles
const styles = StyleSheet.create({
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
    search: { height: 44, borderWidth: 1, borderColor: '#ddd', borderRadius: 22, paddingHorizontal: 16, backgroundColor: '#f9f9f9', marginBottom: 16 },
    list: { paddingBottom: 20 },
    noData: { textAlign: 'center', color: '#999', fontSize: 16, marginTop: 40 },
    mainBox: {backgroundColor: 'white', marginBottom: 10, padding: 10, borderRadius: 10},
    sectionContainer: { marginBottom: 24, backgroundColor: 'white', padding: 10, borderRadius: 20, },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, paddingHorizontal: 4 },
    sectionTitle: { fontSize: 15, fontWeight: '600', color: '#333', marginLeft: 8, flex: 1 },
    zoneLabels: { flexDirection: 'row', gap: 8 },
    safeLabel: { fontSize: 11, color: '#16a34a', backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    riskyLabel: { fontSize: 11, color: '#dc2626', backgroundColor: '#fee2e2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },

    pairContainer: { flexDirection: 'col', gap: 16, justifyContent: 'space-between', },
    teamWrapper: { flex: 1 },

    card: { borderRadius: 20, overflow: 'hidden' },
    gradientBg: { borderRadius: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 },
    stats: { flexDirection: 'row', gap: 12 },
    stat: { fontSize: 13, fontWeight: 'bold', color: '#1a1a1a' },
    right: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    teamNo: { fontSize: 13, color: '#fff', fontWeight: 'bold', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    arrow: { width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
    borderGradient: { padding: 2, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 },
    body: { flexDirection: 'row', padding: 16, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 },
    captains: { flex: 1, gap: 12 },
    row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    cvc: { width: 28, height: 28, borderRadius: 14, textAlign: 'center', textAlignVertical: 'center', color: '#fff', fontWeight: 'bold', fontSize: 12 },
    iconBox: { width: 44, height: 44, backgroundColor: '#fff', borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: '#e0e0e0' },
    roleIcon: { width: 32, height: 32 },
    details: { flex: 1 },
    name: { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
    role: { fontSize: 12, color: '#666', marginTop: 2 },
    statsRight: { alignItems: 'center', justifyContent: 'center', gap: 6 },
    winLabel: { fontSize: 12, color: '#555', fontWeight: '600' },
    winRate: { fontSize: 32, fontWeight: 'bold', color: '#000' },
    dtBox: { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, gap: 6 },
    dtText: { fontSize: 10, color: '#fff', fontWeight: 'bold' },
    dtCount: { fontSize: 10, color: '#fff', fontWeight: 'bold' },
    zone: { paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1.5, borderRadius: 12, fontSize: 12, fontWeight: 'bold', marginTop: 8 },
    footer: { paddingHorizontal: 16, paddingVertical: 10, alignItems: 'flex-end' },
    copyBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, gap: 8 },
    copyText: { fontSize: 14, fontWeight: '600', color: '#000' },
});