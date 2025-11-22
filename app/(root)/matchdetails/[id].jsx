import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '@/components/Header';
import MatchBanner from '@/components/MatchBanner';
import WinProbability from '@/components/WinProbability';
import RecentForm from '@/components/RecentForm';
import HeadToHead from '@/components/HeadToHead';
import HomeTabNav from '@/components/hometabs/HomeTabNav';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useLocalSearchParams } from 'expo-router';


const MatchDetails = () => {
    const { id } = useLocalSearchParams();
    const [matchBannerData, setmatchBannerData] = useState();
    const [winprobdata, setwinprobdata] = useState();
    const [recentForm, setrecentForm] = useState();
    const [headToHeadStats, setheadToHeadStats] = useState();


    // Fetch Match Data here by matching ID..............
    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.victoryvision.live/api/match-details`,
                    { params: { id } }
                );

                //console.log("API raw:", JSON.stringify(response.data, null, 2));

                // API returns { match: [ ... ] }
                const match = response.data.match?.[0];
                if (!match) {
                    console.warn("No match found in API response");
                    return;
                }

                const { venue, matchDate, match_number, teamA, teamB, formatStr, shortTitle, title } = match;

                const bannerData = {
                    venue: venue?.name ?? "N/A",
                    weatherReport: null,
                    formatStr: formatStr ?? null,
                    shortTitle: shortTitle ?? null,
                    title: title ?? null,
                    matchDate: matchDate ?? null,
                    match_number: match_number ?? null,
                    teamA: {
                        name: teamA?.name ?? "N/A",
                        logo: teamA?.logo ?? null,
                    },
                    teamB: {
                        name: teamB?.name ?? "N/A",
                        logo: teamB?.logo ?? null,
                    },
                };

                setmatchBannerData(bannerData);
            } catch (error) {
                console.error("Error fetching Match data:", error);
            }
        };

        if (id) fetchMatchData();
    }, [id]);

    // Watch for updates in state
    useEffect(() => {
        // if (matchBannerData) {
        //     console.log("matchBannerData updated:", matchBannerData);
        // }
    }, [matchBannerData]);



    return (
        <View style={styles.safeArea}>
            <View style={styles.container}>
                <Header />
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.section}>
                        <MatchBanner matchBannerData={matchBannerData} />
                    </View>
                    {false && (
                        <View style={styles.section}>
                            <WinProbability winprobdata={winprobdata} />
                        </View>
                    )}

                    {false && (
                        <View style={styles.section}>
                            <RecentForm recentForm={recentForm} />
                        </View>
                    )}

                    <View style={styles.section}>
                        <HeadToHead headToHeadStats={headToHeadStats} />
                    </View>
                    <View style={styles.section}>
                        <HomeTabNav matchID={id} />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default MatchDetails;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f1f3',
    },
    container: {
        flex: 1,
    },
    scrollView: {
        padding: 15,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    section: {
        // marginTop: 5,
    },
});