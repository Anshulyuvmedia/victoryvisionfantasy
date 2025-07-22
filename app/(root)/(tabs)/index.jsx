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
        <View style={styles.safeArea}>
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
                    <View style={styles.section}>
                        <HomeTabNav />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f1f3',
    },
    container: {
        flex: 1,
    },
    scrollView: {
        padding: 15,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    section: {
        // marginBottom: 5,
    },
});