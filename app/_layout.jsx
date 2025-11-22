// app/_layout.jsx
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect, useContext } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { SafeAreaView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import GlobalProviderReport, { GlobalContextReport } from './GlobalContextReport';

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsError) throw fontsError;
  }, [fontsError]);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GlobalProviderReport>
      <RootLayoutNav />
    </GlobalProviderReport>
  );
}

function RootLayoutNav() {
  const { loading } = useContext(GlobalContextReport);
  const [checkingAuth, setCheckingAuth] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log(token);

        if (token) router.replace('/');
        else router.replace('/(auth)/login');
      } catch (err) {
        console.error('Auth check failed', err);
        router.replace('(auth)');
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);
  console.log("Auth state →", { loading, checkingAuth });

  if (loading || checkingAuth) {
    // console.log('loading', loading, 'checkingAuth', checkingAuth);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ffffffff" />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
      <View style={[styles.statusBar, { height: insets.top || 44, backgroundColor: '#111F54' }]} />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#111F54',
  },
});
