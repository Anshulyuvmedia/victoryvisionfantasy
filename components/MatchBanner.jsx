import { StyleSheet, Text, View, Dimensions, Image, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import images from '@/constants/images';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import axios from 'axios';
const { width } = Dimensions.get('window');
import moment from 'moment';

const MatchBanner = ({ matchBannerData }) => {
    //console.log('Inside MatchBanner:', matchBannerData);
    const matchTime = matchBannerData?.matchDate ? moment(matchBannerData.matchDate).local().format("h:mm A") : "";
    return (
        <View style={styles.outerContainer}>
            <ImageBackground
                style={styles.container}
                source={images.banngerbg}
                resizeMode="contain"
            >
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
                        <Text style={styles.location}>{matchBannerData?.venue}</Text>
                        <Text style={styles.weather}>{matchBannerData?.title}</Text>
                    </View>
                </ImageBackground>
            </ImageBackground>
        </View>
    );
};

export default MatchBanner;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        // backgroundColor: '#F5F5F5',
        justifyContent: 'start',
        // alignItems: 'center',
    },
    container: {
        borderRadius: moderateScale(15),
        // width: width * 0.95,
        // marginInline: moderateScale(15),
        // alignSelf: 'center',
        // overflow: 'hidden',
        // marginVertical: verticalScale(10),
    },
    gradientOverlay: {
        // padding: moderateScale(15), // Adjusted padding
        // borderRadius: moderateScale(15),
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
        postion: 'abosulte',
        top: 30,
    },
    matchNo: {
        color: '#FFFFFF',
        fontSize: scale(10), // Slightly smaller to match the second image
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
    teams: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(10), // Increased vertical space
    },
    logo: {
        width: scale(60), // Slightly smaller to match the second image
        height: verticalScale(70),
        marginHorizontal: moderateScale(20),
    },
    vs: {
        color: '#FFFFFF',
        fontSize: scale(30), // Slightly smaller
        fontWeight: 'bold',
        marginHorizontal: moderateScale(20),
    },
    details: {
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingBottom: verticalScale(10), // Added padding to match spacing
        marginBottom: verticalScale(15),

    },
    location: {
        color: '#fff',
        fontSize: scale(14), // Slightly smaller
        // marginBottom: verticalScale(3),
        fontWeight: '600',

    },
    weather: {
        color: '#D1D5DB',
        fontSize: scale(12),
    },
});