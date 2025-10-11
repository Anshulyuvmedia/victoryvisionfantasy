import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodayMatches from '../../../components/matchestabs/TodayMatches';
const HomeScreen = () => {

    // Fetch Match Data here by matching ID..............
    // useEffect(() => {
    //     const fetchMatchData = async () => {
    //         try {
    //             const response = await axios.get(`http://13.203.214.179:3000/api/match-details`, {
    //                 params: { matchId }
    //             });
    //             // console.log("Win prob",response.data.match);
    //             if (response && response.data && response.data.match) {
    //                 const { venue, weatherReport, matchDate } = response.data.match;
    //                 const { winProbability,teamA, teamB,pitchReport } = response.data.match;
    //                 const {recentForm } = response.data.match;
    //                 const { headToHeadStats } = response.data.match;
    //                 setmatchBannerData({ venue, weatherReport, matchDate });
    //                 setwinprobdata({ winProbability,teamA, teamB, pitchReport });
    //                 setrecentForm({ recentForm });
    //                 setheadToHeadStats({ headToHeadStats,teamA, teamB });
    //                 console.log(matchBannerData);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching Match data:', error);
    //         }
    //     };
    //     fetchMatchData();
    // }, []);
    return (
        <View style={styles.safeArea}>
            <View style={styles.container}>
                <Header />
                <View style={styles.scrollView}>
                    <View style={styles.section}>
                        <TodayMatches />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default HomeScreen;

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