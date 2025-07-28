import { StyleSheet, Text, View, useWindowDimensions, Animated } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Twenty20 from './Twenty20';
import OneDay from './OneDay';
import TestMatches from './TestMatches';
import { useContext } from 'react';
import { GlobalContextReport } from '../../app/GlobalContextReport';

const TodayMatches = () => {

    const { todaymatches } = useContext(GlobalContextReport);

    // Ensure todaymatches is always an array to avoid TypeError
    const safeTodayMatches = Array.isArray(todaymatches) ? todaymatches : [];

    // Filter matches by type
    const matchesByType = {
        Twenty20: safeTodayMatches.filter(match => match.matchType === 'Twenty20'),
        OneDay: safeTodayMatches.filter(match => match.matchType === 'OneDay'),
        TestMatches: safeTodayMatches.filter(match => match.matchType === 'TestMatches'),
    };

    //  console.log("Twenty 20 :", matchesByType.Twenty20);


    const renderScene = SceneMap({
        Twenty20: () => <Twenty20 data={matchesByType.Twenty20} />,
        OneDay: () => <OneDay data={matchesByType.OneDay} />,
        TestMatches: () => <TestMatches data={matchesByType.TestMatches} />,
    });

    const routes = [
        { key: 'Twenty20', title: 'Twenty20' },
        { key: 'OneDay', title: 'OneDay' },
        { key: 'TestMatches', title: 'TestMatches' },
    ];

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

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
                        outputRange: tabWidths.map((width) => width / maxTabWidth),
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
    return (
        <View style={styles.container}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                style={styles.tabView}
                sceneContainerStyle={styles.sceneContainer}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
            />
        </View>
    )
}

export default TodayMatches

const styles = StyleSheet.create({
    container: {
        height: 700,
    },
    tabView: {
        borderRadius: 24,
        flexGrow: 1, // Allow TabView to grow with content
    },
    sceneContainer: {
        flexGrow: 1, // Allow scenes to grow based on content
    },
    tabBar: {
        backgroundColor: '#5f83f1',
        borderRadius: 24,
        position: 'relative',
    },
    tabContainer: {
        paddingVertical: 5,
    },
    activeTab: {
        backgroundColor: '#f2f6ff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 15,
    },
    inactiveTab: {
        backgroundColor: '#4a60ab',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 15,
    },
    tabIndicator: {
        height: 0,
        backgroundColor: 'transparent',
        borderRadius: 24,
    },
    pillIndicator: {
        position: 'absolute',
        bottom: 0,
        height: 48,
        zIndex: -1,
    },
    pillGradient: {
        flex: 1,
        borderRadius: 20,
    },
    tabLabel: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
    activeTabLabel: {
        fontWeight: 'bold',
        color: '#000',
    },

})