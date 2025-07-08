import {
    StyleSheet,
    View,
    useWindowDimensions,
    Platform,
    Text,
    Animated,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import PredictionsTab from './PredictionsTab';
import AiTeamsTab from './AiTeamsTab';
import LineupsTab from './LineupsTab';
import StatsTab from './StatsTab';
import ExpertTab from './ExpertTab';

const renderScene = SceneMap({
    predictions: PredictionsTab,
    aiTeams: AiTeamsTab,
    lineupsTab: LineupsTab,
    statsTab: StatsTab,
    expertTab: ExpertTab,
});

const routes = [
    { key: 'predictions', title: 'Predictions' },
    { key: 'aiTeams', title: 'AI Teams' },
    { key: 'lineupsTab', title: 'Lineups' },
    { key: 'statsTab', title: 'Stats' },
    { key: 'expertTab', title: 'Expert' },
];

const HomeTabNav = () => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [initialLayout, setInitialLayout] = useState({ width: layout.width - 20 }); // Account for padding

    useEffect(() => {
        setInitialLayout({ width: layout.width - 20 }); // Adjust for paddingHorizontal: 10
    }, [layout.width]);

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
            {initialLayout.width > 0 && (
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                    style={styles.tabView}
                    sceneContainerStyle={styles.sceneContainer}
                    swipeEnabled={true}
                    renderTabBar={renderTabBar}
                />
            )}
        </View>
    );
};

export default HomeTabNav;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        paddingHorizontal: 10,
    },
    tabView: {
        flex: 1,
    },
    sceneContainer: {
        flex: 1, // Ensure the scene container takes full height
        // paddingBottom: 70, // Reserve space for bottom tabs
    },
    tabBar: {
        backgroundColor: '#5f83f1',
        borderRadius: 24,
        position: 'relative',
    },
    tabContainer: {
        // paddingHorizontal: 10,
        paddingVertical: 5,
    },
    activeTab: {
        backgroundColor: '#f2f6ff', // Light background for active tab
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
        color: '#000', // Ensure black text
        fontSize: 14,
        textAlign: 'center',
    },
    activeTabLabel: {
        fontWeight: 'bold',
    },
});