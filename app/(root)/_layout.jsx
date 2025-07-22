// app/(root)/_layout.jsx

import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="userprofile" options={{ headerShown: false }} />
            <Stack.Screen name="notifications" options={{ headerShown: false }} />
        </Stack>
    );
}