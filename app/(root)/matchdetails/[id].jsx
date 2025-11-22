import { View, StyleSheet, FlatList, Text, Animated, useWindowDimensions, RefreshControl } from 'react-native';
import Header from '@/components/Header';
import MatchBanner from '@/components/MatchBanner';
import HeadToHead from '@/components/HeadToHead';

import PredictionsTab from '@/components/hometabs/PredictionsTab';
import AiTeamsTab from '@/components/hometabs/AiTeamsTab';
import LineupsTab from '@/components/hometabs/LineupsTab';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';

const MatchDetails = () => {
    const { id } = useLocalSearchParams();
    const layout = useWindowDimensions();

    const [matchBannerData, setMatchBannerData] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const flatListRef = useRef(null);

    const fetchMatchData = useCallback(async () => {
        if (!id) return;

        try {
            const response = await axios.get(`https://api.victoryvision.live/api/match-details`, {
                params: { id },
            });

            const match = response.data.match?.[0];
            if (!match) return;

            const { venue, matchDate, match_number, teamA, teamB, formatStr, shortTitle, title } = match;

            const bannerData = {
                venue: venue?.name ?? "N/A",
                weatherReport: null,
                formatStr: formatStr ?? null,
                shortTitle: shortTitle ?? null,
                title: title ?? null,
                matchDate: matchDate ?? null,
                match_number: match_number ?? null,
                teamA: { name: teamA?.name ?? "N/A", logo: teamA?.logo ?? null },
                teamB: { name: teamB?.name ?? "N/A", logo: teamB?.logo ?? null },
            };

            setMatchBannerData(bannerData);
        } catch (error) {
            console.error("Error fetching Match data:", error);
        }
    }, [id]);

    useEffect(() => {
        fetchMatchData();
    }, [fetchMatchData]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setTabIndex(0);
        await fetchMatchData();
        setRefreshing(false);
    }, [fetchMatchData]);

    const refreshKey = refreshing ? Date.now() : 0;

    const routes = [
        { key: 'predictions', title: 'Predictions', matchID: id },
        { key: 'aiTeams', title: 'AI Teams', matchID: id },
        { key: 'lineupsTab', title: 'Lineups', matchID: id },
    ];

    const renderScene = SceneMap({
        predictions: ({ route }) => <PredictionsTab key={refreshKey} matchID={route.matchID} />,
        aiTeams: ({ route }) => <AiTeamsTab key={refreshKey} matchID={route.matchID} />,
        lineupsTab: ({ route }) => <LineupsTab key={refreshKey} matchID={route.matchID} />,
    });

    const renderTabBar = (props) => {
        const { navigationState, position } = props;
        const inputRange = routes.map((_, i) => i);

        return (
            <TabBar
                {...props}
                scrollEnabled
                indicatorStyle={styles.tabIndicator}
                style={styles.tabBar}
                renderLabel={({ route, focused }) => (
                    <View style={styles.tabContainer}>
                        {focused ? (
                            <View style={styles.activeTab}>
                                <Text style={[styles.tabLabel, styles.activeTabLabel]}>
                                    {route.title}
                                </Text>
                            </View>
                        ) : (
                            <View style={styles.inactiveTab}>
                                <Text style={styles.tabLabel}>{route.title}</Text>
                            </View>
                        )}
                    </View>
                )}
                renderIndicator={(indicatorProps) => {
                    const { getTabWidth } = indicatorProps;
                    const tabWidths = routes.map((_, i) => getTabWidth(i));
                    const maxTabWidth = Math.max(...tabWidths, 1);

                    const translateX = position.interpolate({
                        inputRange,
                        outputRange: tabWidths.map((_, i) =>
                            tabWidths.slice(0, i).reduce((sum, w) => sum + w, 0)
                        ),
                    });

                    const scaleX = position.interpolate({
                        inputRange,
                        outputRange: tabWidths.map((w) => w / maxTabWidth),
                    });

                    const adjustedTranslateX = Animated.add(
                        translateX,
                        Animated.multiply(Animated.subtract(1, scaleX), maxTabWidth / 2)
                    );

                    return (
                        <Animated.View
                            style={[
                                styles.pillIndicator,
                                {
                                    width: maxTabWidth,
                                    transform: [{ translateX: adjustedTranslateX }, { scaleX }],
                                },
                            ]}
                        >
                            <LinearGradient
                                colors={['#1d2a5e', '#475da8', '#1d2a5e']}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 0.5, y: 0 }}
                                style={styles.pillGradient}
                            />
                        </Animated.View>
                    );
                }}
            />
        );
    };

    const sections = [
        { key: 'banner', component: <MatchBanner matchBannerData={matchBannerData} refreshing={refreshing} /> },
        { key: 'headtohead', component: <HeadToHead headToHeadStats={null} /> },
        {
            key: 'tabs',
            component: (
                <View style={{ marginTop: 30 }}>
                    <View style={{
                        height: layout.height - 440,
                        borderRadius: 24,
                        overflow: 'hidden',
                        backgroundColor: '#fff',
                        elevation: 8,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 12,
                    }}>
                        <TabView
                            navigationState={{ index: tabIndex, routes }}
                            renderScene={renderScene}
                            onIndexChange={setTabIndex}
                            initialLayout={{ width: layout.width - 30 }}
                            renderTabBar={renderTabBar}
                            swipeEnabled={true}
                            style={{ flex: 1 }}
                            sceneContainerStyle={{ flex: 1 }}
                            renderScrollViewProps={{ nestedScrollEnabled: true }}
                            // THIS IS THE ONLY LINE ADDED - FIXES REFRESH ISSUE
                            overScrollMode="never"
                        />
                    </View>
                </View>
            ),
        },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.section}>{item.component}</View>
    );

    return (
        <View style={styles.safeArea}>
            <Header />
            <FlatList
                ref={flatListRef}
                data={sections}
                renderItem={renderItem}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
                
            />
        </View>
    );
};

export default MatchDetails;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f1f3',
    },
    flatListContent: {
        paddingHorizontal: 15,
        paddingBottom: 40,
    },
    section: {
        marginBottom: 10,
    },
    tabBar: {
        backgroundColor: '#5f83f1',
        borderRadius: 24,
        elevation: 8,
        marginHorizontal: 12,
        marginTop: 12,
        overflow: 'hidden',
    },
    tabContainer: { paddingVertical: 5 },
    activeTab: {
        backgroundColor: '#f2f6ff',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 24,
    },
    inactiveTab: {
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
    tabIndicator: { height: 0 },
    pillIndicator: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        zIndex: -1,
    },
    pillGradient: {
        flex: 1,
        borderRadius: 24,
    },
    tabLabel: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    activeTabLabel: {
        color: '#1d2a5e',
        fontWeight: '800',
    },
});