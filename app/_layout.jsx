import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { SafeAreaView, View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const checkAuthState = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                setIsAuthenticated(!!token);
            } catch (error) {
                console.error('Error checking auth state:', error);
            }
        };
        checkAuthState();
    }, []);

    useEffect(() => {
        const saveAuthState = async () => {
            try {
                if (isAuthenticated) {
                    await AsyncStorage.setItem('userToken', 'loggedIn');
                } else {
                    await AsyncStorage.removeItem('userToken');
                }
            } catch (error) {
                console.error('Error saving auth state:', error);
            }
        };
        saveAuthState();
    }, [isAuthenticated]);

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
            <View
                style={[
                    styles.statusBar,
                    { height: insets.top || 44, backgroundColor: '#1E2A5E' },
                ]}
            >
                <StatusBar style="light" />
            </View>
            <Stack screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    <Stack.Screen name="(root)" options={{ headerShown: false }} />
                ) : (
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                )}
            </Stack>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    statusBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1E2A5E',
    },
});