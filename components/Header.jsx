import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import images from '@/constants/images';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useRouter } from 'expo-router';

const Header = () => {
    const router = useRouter(); // Initialize Expo Router's useRouter hook

    return (
        <View style={styles.headerContainer}>
            {/* Profile Icon */}
            <TouchableOpacity
                onPress={() => router.push('/userprofile')} // Navigate to userprofile
            >
                <View style={styles.iconContainer}>
                    <Ionicons name="person-circle-outline" size={moderateScale(24)} color="#fff" style={styles.icon} />
                </View>
            </TouchableOpacity>

            {/* Centered Logo */}
            <View style={styles.logoContainer}>
                <Image
                    source={images.applogo} // Ensure images.applogo is correctly defined
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            {/* Bell and Wallet Icons */}
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => router.push('/notifications')}>
                    <Ionicons name="notifications-outline" size={moderateScale(20)} color="#fff" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/wallet')}>
                    <Ionicons name="wallet-outline" size={moderateScale(20)} color="#fff" style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#111F54',
        height: verticalScale(60),
        borderBottomLeftRadius: moderateScale(20),
        borderBottomRightRadius: moderateScale(20),
        paddingHorizontal: moderateScale(10),
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginHorizontal: moderateScale(8),
    },
    logoContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        width: moderateScale(140),
        height: moderateScale(150),
    },
});