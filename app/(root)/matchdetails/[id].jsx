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
    const [matchId, setmatchId] = useState(id);
    const [matchBannerData, setmatchBannerData] = useState();
    const [winprobdata, setwinprobdata] = useState();
    const [recentForm, setrecentForm] = useState();
    const [headToHeadStats, setheadToHeadStats] = useState();

    // Fetch Match Data here by matching ID..............
    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                const response = await axios.get(`http://192.168.1.159:3000/api/match-details`, {
                    params: { matchId }
                });
                // console.log("Win prob",response.data.match);
                if (response && response.data && response.data.match) {
                    const { venue, weatherReport, matchDate } = response.data.match;
                    const { winProbability,teamA, teamB,pitchReport } = response.data.match;
                    const {recentForm } = response.data.match;
                    const { headToHeadStats } = response.data.match;
                    setmatchBannerData({ venue, weatherReport, matchDate });
                    setwinprobdata({ winProbability,teamA, teamB, pitchReport });
                    setrecentForm({ recentForm });
                    setheadToHeadStats({ headToHeadStats,teamA, teamB });
                    console.log(matchBannerData);
                }
            } catch (error) {
                console.error('Error fetching Match data:', error);
            }
        };
        fetchMatchData();
    }, []);
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
                    <View style={styles.section}>
                        <WinProbability winprobdata={winprobdata} />
                    </View>
                    <View style={styles.section}>
                        <RecentForm recentForm={recentForm} />
                    </View>
                    <View style={styles.section}>
                        <HeadToHead headToHeadStats={headToHeadStats} />
                    </View>
                    <View style={styles.section}>
                        <HomeTabNav />
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
        // marginBottom: 5,
    },
});