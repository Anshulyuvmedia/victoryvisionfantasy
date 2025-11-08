import { Tabs } from 'expo-router';
import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import icons from '@/constants/icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ───────────────────────────────
// Tab Item Component
// ───────────────────────────────
const TabItem = ({ route, index, isFocused, options, navigation }) => {
    const iconScale = useRef(new Animated.Value(isFocused ? 1 : 0.84)).current;
    const iconTranslateY = useRef(new Animated.Value(isFocused ? -24 : 0)).current;
    const labelOpacity = useRef(new Animated.Value(isFocused ? 1 : 0)).current;
    const labelTranslateY = useRef(new Animated.Value(isFocused ? -14 : -8)).current;
    const labelScale = useRef(new Animated.Value(isFocused ? 1 : 0.92)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(iconScale, {
                toValue: isFocused ? 1 : 0.84,
                friction: 6,
                tension: 50,
                useNativeDriver: true,
            }),
            Animated.spring(iconTranslateY, {
                toValue: isFocused ? -35 : 0,
                friction: 6,
                tension: 50,
                useNativeDriver: true,
            }),
            Animated.timing(labelOpacity, {
                toValue: isFocused ? 1 : 0,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.spring(labelTranslateY, {
                toValue: isFocused ? -14 : -8,
                friction: 6,
                tension: 50,
                useNativeDriver: true,
            }),
            Animated.spring(labelScale, {
                toValue: isFocused ? 1 : 0.92,
                friction: 6,
                tension: 50,
                useNativeDriver: true,
            }),
        ]).start();
    }, [isFocused]);

    const onPress = () => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
        }
    };

    const iconColor = isFocused ? '#fff' : '#888888';
    const customIcons = {
        index: icons.cricketwhite,
        points: icons.pointswhite,
        aiteams: icons.aiteamwhite,
        reports: icons.reportwhite,
        kabaddi: icons.kabaddiwhite,
    };

    return (
        <TouchableOpacity onPress={onPress} style={styles.tabItem} activeOpacity={1}>
            <Animated.View
                style={{
                    transform: [{ scale: iconScale }, { translateY: iconTranslateY }],
                }}
            >
                <View style={styles.iconWrapper}>
                    <Animated.Image
                        source={customIcons[route.name]}
                        style={{
                            width: 28,
                            height: 28,
                            tintColor: iconColor,
                        }}
                        resizeMode="contain"
                    />
                </View>
            </Animated.View>

            <Animated.Text
                style={[
                    styles.label,
                    {
                        opacity: labelOpacity,
                        transform: [{ translateY: labelTranslateY }, { scale: labelScale }],
                    },
                ]}
            >
                {options.title}
            </Animated.Text>
        </TouchableOpacity>
    );
};

// ───────────────────────────────
// Custom TabBar Component
// ───────────────────────────────
const CustomTabBar = ({ state, descriptors, navigation }) => {
    const translateX = useRef(new Animated.Value(0)).current;

    // Hide any tabs you don't want shown (like "reports")
    const HIDDEN_TABS = ['reports'];
    const visibleRoutes = state.routes.filter(
        (route) => !HIDDEN_TABS.includes(route.name)
    );

    const tabCount = visibleRoutes.length;
    const tabWidth = SCREEN_WIDTH / tabCount;

    useEffect(() => {
        const visibleIndex = visibleRoutes.findIndex(
            (r) => r.name === state.routes[state.index].name
        );
        if (visibleIndex >= 0) {
            Animated.timing(translateX, {
                toValue: visibleIndex * tabWidth,
                duration: 400,
                useNativeDriver: true,
            }).start();
        }
    }, [state.index, tabCount]);

    return (
        <View style={[styles.tabBar, { width: SCREEN_WIDTH }]}>
            {/* Floating Circular Indicator */}
            <Animated.View
                style={[
                    styles.indicator,
                    {
                        transform: [{ translateX }],
                        left: tabWidth / 2 - 22, // centers the indicator
                    },
                ]}
            >
                <View style={styles.indicatorSolid} />
            </Animated.View>

            {/* Ellipse background image */}
            <Animated.Image
                source={icons.ellipse}
                style={[
                    styles.ellipse,
                    {
                        transform: [{ translateX }],
                        left: tabWidth / 2 - 50, // centers the ellipse
                    },
                ]}
                resizeMode="contain"
            />

            {/* Render visible tabs only */}
            {visibleRoutes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.routes[state.index].name === route.name;
                return (
                    <TabItem
                        key={route.key}
                        route={route}
                        index={index}
                        isFocused={isFocused}
                        options={options}
                        navigation={navigation}
                    />
                );
            })}
        </View>
    );
};

// ───────────────────────────────
// Styles
// ───────────────────────────────
const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fafafa',
        height: 70,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: 'rgba(18, 22, 33, 0.1)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 16,
        elevation: 5,
        alignSelf: 'center',
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99,
    },
    iconWrapper: {
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicator: {
        position: 'absolute',
        width: 44,
        height: 44,
        borderRadius: 100,
        top: -23,
        zIndex: 9,
    },
    indicatorSolid: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        backgroundColor: '#132569',
        shadowColor: 'rgba(18, 22, 33, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 5,
    },
    ellipse: {
        position: 'absolute',
        zIndex: 0,
        width: 100,
        height: 28,
        top: 0,
    },
    label: {
        position: 'absolute',
        bottom: 0,
        fontSize: 14,
        fontWeight: '500',
        color: '#132569',
        textAlign: 'center',
    },
});

// ───────────────────────────────
// Tabs Layout
// ───────────────────────────────
export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: { display: 'none' },
            }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Cricket',
                    lazy: true,
                }}
            />
            <Tabs.Screen
                name="points"
                options={{
                    title: 'Points',
                    lazy: true,
                }}
            />
            <Tabs.Screen
                name="aiteams"
                options={{
                    title: 'AI Teams',
                    lazy: true,
                }}
            />
            <Tabs.Screen
                name="reports"
                options={{
                    title: 'Reports',
                    href: null, // hides this tab, route still accessible via navigation
                    lazy: true,
                }}
            />
            <Tabs.Screen
                name="kabaddi"
                options={{
                    title: 'Kabaddi',
                    lazy: true,
                }}
            />
        </Tabs>
    );
}
