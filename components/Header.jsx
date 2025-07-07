import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import images from '@/constants/images';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            {/* Profile Icon */}
            <View style={styles.iconContainer}>
                <Ionicons name="person-circle-outline" size={moderateScale(24)} color="#fff" style={styles.icon} />
            </View>

            {/* Centered Logo and Text */}
            <View style={styles.logoContainer}>
                <Image
                    source={images.applogo} // Replace with your logo asset (crown, eye, cricket ball)
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            {/* Bell and Wallet Icons */}
            <View style={styles.iconContainer}>
                <Ionicons name="notifications-outline" size={moderateScale(20)} color="#fff" style={styles.icon} />
                <Ionicons name="wallet-outline" size={moderateScale(20)} color="#fff" style={styles.icon} />
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
        backgroundColor: '#1E2A5E', // Dark blue from the image
        height: verticalScale(60), // Scaled height
        borderBottomLeftRadius: moderateScale(20), // Scaled radius
        borderBottomRightRadius: moderateScale(20), // Scaled radius
        paddingHorizontal: moderateScale(15), // Scaled padding
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        // width: moderateScale(25), // Scaled width
        // height: moderateScale(25), // Scaled height
        marginHorizontal: moderateScale(8), // Scaled margin
    },
    logoContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        width: moderateScale(140), // Scaled width
        height: moderateScale(150), // Scaled height
        // tintColor: '#FFD700', // Gold color for the logo (approximate)
    },
    title: {
        fontSize: moderateScale(16), // Scaled font size
        fontWeight: 'bold',
        color: '#FFD700', // Gold color for "VICTORY VISION"
        textAlign: 'center',
    },
    subtitle: {
        fontSize: moderateScale(10), // Scaled font size
        color: '#fff', // White color for "FANTASY CRICKET"
        textAlign: 'center',
    },
});