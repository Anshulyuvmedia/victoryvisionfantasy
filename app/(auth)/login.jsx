import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import images from '@/constants/images';
import axios from 'axios';

const LoginScreen = () => {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userdata, setuserdata] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const generateOtp = async () => {
        // console.log(phoneNumber);
        if (!phoneNumber || phoneNumber.length !== 10) {
            Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post(`http://api.victoryvision.live:3000/api/generateOtp`, { phoneNumber });
            const otpValue = response.data.otp;
            setGeneratedOtp(otpValue); // You can hide this in prod
            setIsOtpSent(true);

        } catch (error) {
            console.error('Generate OTP error:', error.message);
            Alert.alert('Error', 'Failed to generate OTP.',error.message);
        }
        setIsLoading(false);
    };

    const handleLogin = async () => {
        if (!isOtpSent) {
            Alert.alert('Error', 'Please send OTP first.');
            return;
        }
        if (!otp || otp.length !== 6) {
            Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`http://api.victoryvision.live:3000/api/verifyOtp`, {
                phoneNumber,
                otp,
            });

            if (response.data.status == true) {
                // console.log("USER DATA : ",response.data.userdata);
                setuserdata(response.data.userdata);
                // Save session/token (dummy in this case)
                await AsyncStorage.setItem('userToken', response.data.userdata._id);

                const userData = {
                    userid: response.data.userdata._id,
                    name: response.data.userdata.name,
                    email: response.data.userdata.email,
                    mobilenumber: response.data.userdata.mobilenumber,
                };
                // console.log("USER DATA : ",userData);
                await AsyncStorage.setItem('userData', JSON.stringify(userData));

                router.replace('/(root)/(tabs)/');
            } else {
                Alert.alert('Error', 'Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('Verify OTP error:', error.message);
            Alert.alert('Error', 'OTP verification failed.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const checkAuthState = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                // console.log("userToken : ", token);
                if (token) {
                    router.push('/(root)/');
                }
            } catch (error) {
                console.error('Error checking auth state:', error);
            }
        };
        checkAuthState();
    }, []);

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

            {/* /* Phone Number Input */}
            <TextInput
                style={styles.input}
                placeholder="Enter Phone Number"
                placeholderTextColor="#666"
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
                        maxLength={6}
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