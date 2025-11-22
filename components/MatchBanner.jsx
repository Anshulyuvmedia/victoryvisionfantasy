// MatchBanner.js – 100% SAME UI + Refresh Support (invisible when not refreshing)
import { StyleSheet, Text, View, Dimensions, Image, ImageBackground, ActivityIndicator } from 'react-native';
import React from 'react';
import images from '@/constants/images';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import moment from 'moment';

const { width } = Dimensions.get('window');

const MatchBanner = ({ matchBannerData, refreshing = false }) => {
    const matchTime = matchBannerData?.matchDate
        ? moment(matchBannerData.matchDate).local().format("h:mm A")
        : "";

    const truncate = (text, max = 50) => {
        if (text === undefined || text === null) return '';
        const s = String(text);
        return s.length > max ? s.slice(0, max) + '...' : s;
    };

    return (
        <View style={styles.outerContainer}>
            <ImageBackground
                style={styles.container}
                source={images.banngerbg}
                resizeMode="contain"
            >
                {/* Invisible refresh overlay – only appears when pulling to refresh */}
                {refreshing && (
                    <View style={styles.refreshOverlay}>
                        <ActivityIndicator size="small" color="#ffffff" />
                    </View>
                )}

                <View style={styles.header}>
                    <Text style={styles.matchNo}>Match No: {matchBannerData?.match_number || '-'}</Text>
                    <Text style={styles.time}>{matchTime}</Text>
                    <Text style={styles.countdown}> {matchBannerData?.formatStr}</Text>
                </View>

                <ImageBackground
                    style={styles.gradientOverlay}
                    source={images.bannergradient}
                    resizeMode="contain"
                >
                    <View style={styles.teams}>
                        <Image
                            source={{ uri: matchBannerData?.teamA?.logo }}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.vs}>VS</Text>
                        <Image
                            source={{ uri: matchBannerData?.teamB?.logo }}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.details}>
                        <Text style={styles.location}>{truncate(matchBannerData?.venue, 32)}</Text>
                        <Text style={styles.weather}>{truncate(matchBannerData?.title, 50)}</Text>
                    </View>
                </ImageBackground>
            </ImageBackground>
        </View>
    );
};

export default React.memo(MatchBanner);

// Only added this tiny overlay – completely invisible when not refreshing
const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'start',
    },
    container: {
        borderRadius: moderateScale(15),
    },
    refreshOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        backgroundColor: 'rgba(0,0,0,0.15)', // Very subtle
        borderRadius: moderateScale(15),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
        top: 25,
    },
    matchNo: {
        color: '#FFFFFF',
        fontSize: scale(10),
        fontWeight: '400',
    },
    time: {
        color: '#FFFFFF',
        fontSize: scale(18),
        fontWeight: '800',
        paddingEnd: moderateScale(23),
    },
    countdown: {
        color: '#FFFFFF',
        fontSize: scale(10),
        fontWeight: '400',
    },
    gradientOverlay: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    teams: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(10),
    },
    logo: {
        width: scale(60),
        height: verticalScale(70),
        marginHorizontal: moderateScale(20),
    },
    vs: {
        color: '#FFFFFF',
        fontSize: scale(30),
        fontWeight: 'bold',
        marginHorizontal: moderateScale(20),
    },
    details: {
        alignItems: 'center',
        marginBottom: verticalScale(15),
    },
    location: {
        color: '#fff',
        fontSize: scale(14),
        fontWeight: '600',
    },
    weather: {
        color: '#D1D5DB',
        fontSize: scale(12),
    },
});