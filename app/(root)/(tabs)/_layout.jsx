import { Tabs } from 'expo-router';
import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Get screen width
const { width: SCREEN_WIDTH } = Dimensions.get('window');

// TabItem Component
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
                toValue: isFocused ? -24 : 0,
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

    const getIconName = (routeName, focused) => {
        const iconMap = {
            index: focused ? 'home' : 'home',
            points: focused ? 'trophy' : 'trophy',
            aiteams: focused ? 'users' : 'users',
            reports: focused ? 'file' : 'file',
            kabaddi: focused ? 'futbol-o' : 'futbol-o',
        };
        return iconMap[routeName] || 'circle';
    };

    const iconColor = isFocused ? '#fff' : '#888888';

    return (
        <TouchableOpacity onPress={onPress} style={styles.tabItem} activeOpacity={1}>
            <Animated.View
                style={{
                    transform: [{ scale: iconScale }, { translateY: iconTranslateY }],
                }}
            >
                <FontAwesome
                    name={getIconName(route.name, isFocused)}
                    size={24}
                    color={iconColor}
                />
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

// Custom TabBar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
    const translateX = useRef(new Animated.Value(0)).current;
    const tabWidth = SCREEN_WIDTH / 5; // Full screen width / 5 tabs
    const circlePosition = state.index * tabWidth;

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: circlePosition,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, [state.index]);

    return (
        <View style={[styles.tabBar, { width: SCREEN_WIDTH }]}>
            <Animated.View
                style={[
                    styles.indicator,
                    {
                        transform: [{ translateX }],
                        left: tabWidth / 2 - 22, // Center indicator in tab
                    },
                ]}
            >
                <View style={styles.indicatorSolid} />
            </Animated.View>
            {state.routes.map((route, index) => (
                <TabItem
                    key={route.key}
                    route={route}
                    index={index}
                    isFocused={state.index === index}
                    options={descriptors[route.key].options}
                    navigation={navigation}
                />
            ))}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#f0f1f2',
        height: 68,
        borderRadius: 0,
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
    },
    indicator: {
        position: 'absolute',
        width: 44,
        height: 44,
        borderRadius: 100,
        top: -12,
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
    label: {
        position: 'absolute',
        bottom: 0,
        fontSize: 12,
        fontWeight: '500',
        color: '#132569',
        textAlign: 'center',
    },
});

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: { display: 'none' }, // Hide default tab bar
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