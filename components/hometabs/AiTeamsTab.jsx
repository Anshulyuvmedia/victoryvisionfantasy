// AiTeamsTab.js — PERFECT AS IS
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AiSafeTeam from '../AiSafeTeam';
import AiRiskyTeam from '../AiRiskyTeam';

const AiTeamsTab = ({ matchID }) => {
    const [teams, setTeams] = useState({ safeTeam: null, riskyTeam: null });

    useEffect(() => {
        if (!matchID) return;

        const fetchTeams = async () => {
            try {
                const res = await axios.get('https://api.victoryvision.live/api/get-ai-teams', {
                    params: { matchID },
                });
                if (res.data.status && res.data.results) {
                    const safe = res.data.results.find(t => t.type === 'Safe');
                    const risky = res.data.results.find(t => t.type === 'Risky');
                    setTeams({ safeTeam: safe || null, riskyTeam: risky || null });
                }
            } catch (err) {
                console.error('AI Teams error:', err);
            }
        };
        fetchTeams();
    }, [matchID]);

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}        // THIS IS THE KEY
            bounces={true}
            overScrollMode="always"
        >
            <View style={styles.content}>
                <View style={styles.section}>
                    <AiSafeTeam teamData={teams.safeTeam} />
                </View>
                <View style={styles.section}>
                    <AiRiskyTeam teamData={teams.riskyTeam} />
                </View>
                <View style={{ height: 100 }} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10,},
    content: { paddingTop: 5 },
    section: { marginBottom: 24 },
});

export default AiTeamsTab;