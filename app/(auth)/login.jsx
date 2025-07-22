import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import images from '@/constants/images';

const LoginScreen = () => {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const generateOtp = () => {
        if (!phoneNumber || phoneNumber.length !== 10) {
            Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
            return;
        }
        // if (!name.trim()) {
        //     Alert.alert('Error', 'Please enter your name.');
        //     return;
        // }

        setIsLoading(true);
        const otpValue = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(otpValue);
        setIsOtpSent(true);
        setIsLoading(false);
        // setTimeout(() => {
        //     Alert.alert('OTP Sent', `Your OTP is: ${otpValue} (Demo only)`);
        // }, 1000); // Simulate network delay
    };

    const handleLogin = async () => {
        if (!isOtpSent) {
            Alert.alert('Error', 'Please send OTP first.');
            return;
        }
        if (!otp || otp.length !== 4) {
            Alert.alert('Error', 'Please enter a valid 4-digit OTP.');
            return;
        }

        setIsLoading(true);
        const dummyPhoneNumber = '9876543210';
        if (phoneNumber === dummyPhoneNumber && otp === generatedOtp) {
            try {
                // Store user session
                await AsyncStorage.setItem('userToken', 'loggedIn');
                // Store user data for profile
                const userData = {
                    name: name.trim(),
                    email: `${phoneNumber}@example.com`,
                    profileImage: null,
                };
                await AsyncStorage.setItem('userData', JSON.stringify(userData));
                router.replace('/(root)/(tabs)/');
            } catch (error) {
                Alert.alert('Error', 'Failed to save session. Please try again.');
                console.error('Login error:', error);
            }
        } else {
            Alert.alert('Error', 'Invalid phone number or OTP. Please check and try again.');
        }
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            {/* Centered Logo */}
            <View style={styles.logoContainer}>
                <Image
                    source={images.applogo}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.title}>Login with Phone</Text>
            <Text style={styles.label}>Dummy Phone Number: 9876543210</Text>

            {/* Phone Number Input */}
            <TextInput
                style={styles.input}
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={10}
            />

            {/* OTP Input or Send OTP Button */}
            {!isOtpSent ? (
                <TouchableOpacity
                    style={[styles.button, isLoading && styles.buttonDisabled]}
                    onPress={generateOtp}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>
                        {isLoading ? 'Sending...' : 'Send OTP'}
                    </Text>
                </TouchableOpacity>
            ) : (
                <>
                    <Text style={styles.label}>OTP: {generatedOtp}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter OTP"
                        value={otp}
                        onChangeText={setOtp}
                        keyboardType="numeric"
                        maxLength={4}
                    />
                    <TouchableOpacity
                        style={[styles.button, isLoading && styles.buttonDisabled]}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        <Text style={styles.buttonText}>
                            {isLoading ? 'Verifying...' : 'Verify OTP & Login'}
                        </Text>
                    </TouchableOpacity>
                </>
            )}

            {/* Registration Link */}
            <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.registerLink}>
                    Don't have an account? Register here
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: scale(16),
        backgroundColor: '#F5F5F5',
    },
    logoContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: verticalScale(20),
    },
    logo: {
        width: moderateScale(140),
        height: moderateScale(150),
    },
    title: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: verticalScale(20),
        color: '#111F54',
    },
    label: {
        fontSize: moderateScale(16),
        textAlign: 'center',
        marginBottom: verticalScale(10),
        color: '#666',
    },
    input: {
        height: verticalScale(40),
        borderColor: '#111F54',
        borderWidth: 1,
        borderRadius: moderateScale(8),
        marginBottom: verticalScale(12),
        paddingHorizontal: scale(10),
        fontSize: moderateScale(16),
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#111F54',
        paddingVertical: verticalScale(12),
        borderRadius: moderateScale(8),
        alignItems: 'center',
        marginBottom: verticalScale(12),
    },
    buttonDisabled: {
        backgroundColor: '#666',
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontSize: moderateScale(16),
        fontWeight: '600',
    },
    registerLink: {
        fontSize: moderateScale(14),
        color: '#111F54',
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop: verticalScale(10),
    },
});