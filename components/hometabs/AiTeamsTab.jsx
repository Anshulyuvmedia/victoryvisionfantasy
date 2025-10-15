import { StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import AiSafeTeam from '../AiSafeTeam';
import AiRiskyTeam from '../AiRiskyTeam';

const AiTeamsTab = ({ onContentHeightChange, matchID }) => {
    const [teams, setTeams] = useState({ safeTeam: null, riskyTeam: null });

    // Handle layout changes for dynamic height
    const handleLayout = useCallback(
        (event) => {
            if (onContentHeightChange) {
                const { height } = event.nativeEvent.layout;
                onContentHeightChange(height); // Pass the measured height to the parent
            }
        },
        [onContentHeightChange]
    );

    // Fetch AI-generated teams
    const fetchGeneratedAiTeams = async (matchID) => {
        try {
            const response = await axios.get(`http://api.victoryvision.live:3000/api/get-ai-teams`, {
                params: { matchID },
            });
            // console.log('API Response:', response.data);

            if (response.data.status && response.data.results) {
                const safeTeam = response.data.results.find((team) => team.type === 'Safe') || null;
                const riskyTeam = response.data.results.find((team) => team.type === 'Risky') || null;
                console.log("riskyTeam : ", JSON.stringify(riskyTeam, null, 2));
                setTeams({ safeTeam, riskyTeam });
            } else {
                console.warn('No valid data in API response');
                setTeams({ safeTeam: null, riskyTeam: null });
            }
        } catch (error) {
            console.error('Error fetching AI teams:', error.message);
            setTeams({ safeTeam: null, riskyTeam: null });
        }
    };

    // Fetch data when matchID changes
    useEffect(() => {
        if (matchID) {
            fetchGeneratedAiTeams(matchID);
        }
    }, [matchID]);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer} onLayout={handleLayout}>
                <View style={styles.section}>
                    <AiSafeTeam teamData={teams.safeTeam} />
                </View>
                <View style={styles.section}>
                    <AiRiskyTeam teamData={teams.riskyTeam} />
                </View>
            </View>
        </View>
    );
};

export default AiTeamsTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1, // Allow content to grow vertically
        paddingBottom: 40, // Prevent content from being cut off
    },
    section: {
        marginVertical: 10, // Spacing between sections
        marginHorizontal: 10, // Horizontal spacing for better appearance
    },
});