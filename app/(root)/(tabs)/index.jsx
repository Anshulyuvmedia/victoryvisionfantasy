import { View, Text, ScrollView } from 'react-native';
import Header from '@/components/Header';
import MatchBanner from '@/components/MatchBanner';

const HomeScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#f0f1f3' }}>
            <Header />
            <ScrollView style={{ padding: 15, }}>
                <MatchBanner />
            </ScrollView>
        </View>
    );
};

export default HomeScreen;