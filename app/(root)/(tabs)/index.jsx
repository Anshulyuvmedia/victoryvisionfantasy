import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import MatchBanner from '@/components/MatchBanner';
import WinProbability from '@/components/WinProbability';
import PitchReport from '@/components/PitchReport';
import RecentForm from '@/components/RecentForm';
import HeadToHead from '@/components/HeadToHead';
import HomeTabNav from '@/components/hometabs/HomeTabNav';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Header />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <MatchBanner />
                </View>
                <View style={styles.section}>
                    <WinProbability />
                </View>
                <View style={styles.section}>
                    <PitchReport />
                </View>
                <View style={styles.section}>
                    <RecentForm />
                </View>
                <View style={styles.section}>
                    <HeadToHead />
                </View>
                <View style={styles.tabContainer}>
                    <HomeTabNav />
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f1f3',
    },
    scrollView: {
        padding: 15,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    section: {
        marginBottom: 15,
    },
    tabContainer: {
        // flex: 1, // Allow HomeTabNav to take remaining height
        minHeight: 600, // Minimum height to ensure visibility
    },
});