import {
    StyleSheet,
    View,
    useWindowDimensions,
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
    predictions: ({ route }) => <PredictionsTab onContentHeightChange={route.onContentHeightChange} />,
    aiTeams: ({ route }) => <AiTeamsTab onContentHeightChange={route.onContentHeightChange} />,
    lineupsTab: ({ route }) => <LineupsTab onContentHeightChange={route.onContentHeightChange} />,
    statsTab: ({ route }) => <StatsTab onContentHeightChange={route.onContentHeightChange} />,
    expertTab: ({ route }) => <ExpertTab onContentHeightChange={route.onContentHeightChange} />,
});

const HomeTabNav = () => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [initialLayout, setInitialLayout] = useState({ width: layout.width - 20 });
    const [contentHeight, setContentHeight] = useState(0); // Track max content height

    useEffect(() => {
        setInitialLayout({ width: layout.width - 20 });
    }, [layout.width]);

    const handleContentHeightChange = (height) => {
        setContentHeight((prevHeight) => Math.max(prevHeight, height)); // Update to max height
    };

    const routes = [
        { key: 'predictions', title: 'Predictions', onContentHeightChange: handleContentHeightChange },
        { key: 'aiTeams', title: 'AI Teams', onContentHeightChange: handleContentHeightChange },
        { key: 'lineupsTab', title: 'Lineups', onContentHeightChange: handleContentHeightChange },
        { key: 'statsTab', title: 'Stats', onContentHeightChange: handleContentHeightChange },
        { key: 'expertTab', title: 'Expert', onContentHeightChange: handleContentHeightChange },
    ];

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
        <View style={[styles.container, { minHeight: contentHeight || 300 }]}>
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
        marginTop: 10,
        borderRadius: 24,
        flexGrow: 1, // Allow container to grow with content
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
});