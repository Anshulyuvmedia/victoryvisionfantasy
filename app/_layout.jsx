import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { GlobalProviderReport } from './GlobalContextReport';

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const router = useRouter();
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

  if (!loaded) return null;

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // 👈 Added
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log('userToken : ', token);
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Error checking auth state:', error);
      } finally {
        setLoading(false); // 👈 Ensures render waits for AsyncStorage
      }
    };
    checkAuthState();
  }, []);

  if (loading) {
    // 👇 Optional placeholder while loading
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
      <View
        style={[
          styles.statusBar,
          { height: insets.top || 44, backgroundColor: '#111F54' },
        ]}
      >
        <StatusBar style="light" />
      </View>

      <GlobalProviderReport>
        <Stack screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <Stack.Screen name="(root)" options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          )}
        </Stack>
      </GlobalProviderReport>
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
