import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';

const UserProfile = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({
        name: 'Guest User',
        email: 'No email provided',
        profileImage: null,     
    });

    // Fetch user data from AsyncStorage on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('userData');
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    // console.log("Profile User data : ",storedData);
                    setUserData({
                        name: parsedData.name || 'Guest User',
                        email: parsedData.email || 'No email provided',
                        profileImage: parsedData.profileImage || null,
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                Alert.alert('Error', 'Failed to load user data.');
            }
        };

        fetchUserData();
    }, []);

    // Handle logout
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            router.replace('/login'); // Navigate to login screen
        } catch (error) {
            console.error('Error during logout:', error);
            Alert.alert('Error', 'Failed to log out.');
        }
    };

    
    return (
        <View style={styles.main}>
            <Header />
            <View style={styles.container}>
                {/* Profile Image */}
                <View style={styles.imageContainer}>
                    {userData.profileImage ? (
                        <Image
                            source={{ uri: userData.profileImage }}
                            style={styles.profileImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <Ionicons
                            name="person-circle-outline"
                            size={moderateScale(100)}
                            color="#111F54"
                        />
                    )}
                </View>

                {/* User Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.nameText}>{userData.name}</Text>
                    <Text style={styles.emailText}>{userData.email}</Text>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default UserProfile;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    container: {
        alignItems: 'center',
        paddingTop: verticalScale(40),
    },
    imageContainer: {
        marginBottom: verticalScale(20),
    },
    profileImage: {
        width: moderateScale(100),
        height: moderateScale(100),
        borderRadius: moderateScale(50),
        borderWidth: 2,
        borderColor: '#111F54',
    },
    infoContainer: {
        alignItems: 'center',
        marginBottom: verticalScale(30),
    },
    nameText: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        color: '#111F54',
        marginBottom: verticalScale(5),
    },
    emailText: {
        fontSize: moderateScale(16),
        color: '#666',
    },
    logoutButton: {
        backgroundColor: '#111F54',
        paddingVertical: verticalScale(12),
        paddingHorizontal: scale(30),
        borderRadius: moderateScale(25),
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: moderateScale(16),
        fontWeight: '600',
    },
});