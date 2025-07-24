import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '@/components/Header';
import MatchBanner from '@/components/MatchBanner';
import WinProbability from '@/components/WinProbability';
import PitchReport from '@/components/PitchReport';
import RecentForm from '@/components/RecentForm';
import HeadToHead from '@/components/HeadToHead';
import HomeTabNav from '@/components/hometabs/HomeTabNav';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
const HomeScreen = () => {

    const [matchId, setmatchId] = useState('687e09ecc30e02e5166907ac');
    const [matchBannerData, setmatchBannerData] = useState();

    // Fetch Match Data here by matching ID..............
    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                const response = await axios.get(`http://192.168.1.159:3000/api/match-details`, {
                    params: { matchId }
                });
                if (response && response.data && response.data.match) {
                    const { venue, weatherReport, matchDate } = response.data.match;
                    setmatchBannerData({ venue, weatherReport, matchDate });
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
                        <WinProbability />
                    </View>
                    <View style={styles.section}>
                        <PitchReport />
                    </View>
                    <View style={styles.section}>
                        <RecentForm />
                    </View>
                    <View style={styles.section}>
                        <HeadToHead />
                    </View>
                    <View style={styles.section}>
                        <HomeTabNav />
                    </View>
                </ScrollView>
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