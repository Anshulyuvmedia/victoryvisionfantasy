// app/(auth)/login.jsx
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import images from '@/constants/images';
import axios from 'axios';
import { GlobalContextReport } from '../GlobalContextReport';
import { Feather } from '@expo/vector-icons';

const LoginScreen = () => {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { refreshGlobalData } = useContext(GlobalContextReport);

    // Modal State
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const showError = (message) => {
        setErrorMessage(message);
        setModalVisible(true);
        // Auto hide after 3.5 seconds
        setTimeout(() => {
            setModalVisible(false);
        }, 3500);
    };

    const generateOtp = async () => {
        if (!phoneNumber || phoneNumber.length !== 10) {
            showError('Please enter a valid 10-digit phone number');
            return;
        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            showError('Phone number must contain only digits');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`https://api.victoryvision.live/api/generateOtp`, { phoneNumber });
            setGeneratedOtp(response.data.otp || '123456');
            setIsOtpSent(true);
        } catch (error) {
            const msg = error.response?.data?.message || 'Invalid Phone Number. Try again.';
            showError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async () => {
        if (!otp || otp.length !== 6) {
            showError('Please enter a valid 6-digit OTP');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`https://api.victoryvision.live/api/verifyOtp`, {
                phoneNumber,
                otp,
            });

            if (response.data.status === true) {
                const userData = {
                    userid: response.data.userdata._id,
                    name: response.data.userdata.name || '',
                    email: response.data.userdata.email || '',
                    mobilenumber: response.data.userdata.mobilenumber,
                };

                await AsyncStorage.setItem('userToken', response.data.userdata._id);
                await AsyncStorage.setItem('userData', JSON.stringify(userData));
                await refreshGlobalData();
                router.replace('/(root)/(tabs)/');
            } else {
                showError(response.data.message || 'Invalid OTP. Please try again.');
            }
        } catch (error) {
            const msg = error.response?.data?.message || 'Verification failed. Try again.';
            showError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const checkAuthState = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                router.replace('/(root)/(tabs)/');
            }
        };
        checkAuthState();
    }, []);

    return (
        <>
            <View style={styles.container}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Image source={images.applogo} style={styles.logo} resizeMode="contain" />
                </View>

                <Text style={styles.title}>Welcome To Victory Vision</Text>

                {/* Phone Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Enter Phone Number"
                    placeholderTextColor="#888"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    maxLength={10}
                    editable={!isLoading}
                />

                {!isOtpSent ? (
                    <TouchableOpacity
                        style={[styles.button, isLoading && styles.buttonDisabled]}
                        onPress={generateOtp}
                        disabled={isLoading}
                    >
                        <Text style={styles.buttonText}>
                            {isLoading ? 'Sending OTP...' : 'Send OTP'}
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        <Text style={styles.label}>Enter 6-digit OTP</Text>
                        {/* Remove in production */}
                        <Text style={styles.debugOtp}>OTP: {generatedOtp}</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Enter OTP"
                            value={otp}
                            onChangeText={setOtp}
                            keyboardType="numeric"
                            maxLength={6}
                            editable={!isLoading}
                        />

                        <TouchableOpacity
                            style={[styles.button, isLoading && styles.buttonDisabled]}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            <Text style={styles.buttonText}>
                                {isLoading ? 'Verifying...' : 'Verify & Login'}
                            </Text>
                        </TouchableOpacity>
                    </>
                )}

                <TouchableOpacity onPress={() => router.push('/register')}>
                    <Text style={styles.registerLink}>
                        Don't have an account? Register here
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Beautiful Error Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.errorIcon}>
                            <Feather name="alert-circle" size={42} color="#dc2626" />
                        </View>
                        <Text style={styles.modalTitle}>Oops!</Text>
                        <Text style={styles.modalMessage}>{errorMessage}</Text>
                        <Pressable
                            style={styles.modalButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Got it</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: scale(20),
        backgroundColor: '#F5F5F5',
    },
    logoContainer: {
        alignItems: 'center',
        // marginBottom: verticalScale(30),
    },
    logo: {
        width: moderateScale(140),
        height: moderateScale(75),
    },
    title: {
        fontSize: moderateScale(20),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: verticalScale(20),
        color: '#111F54',
    },
    label: {
        fontSize: moderateScale(16),
        color: '#444',
        marginBottom: verticalScale(8),
        textAlign: 'center',
    },
    debugOtp: {
        fontSize: moderateScale(14),
        color: '#dc2626',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: verticalScale(10),
        backgroundColor: '#fee2e2',
        padding: 8,
        borderRadius: 8,
    },
    input: {
        height: verticalScale(48),
        borderColor: '#111F54',
        borderWidth: 1.5,
        borderRadius: moderateScale(12),
        marginBottom: verticalScale(16),
        paddingHorizontal: scale(16),
        fontSize: moderateScale(16),
        backgroundColor: '#fff',
        elevation: 3,
    },
    button: {
        backgroundColor: '#111F54',
        paddingVertical: verticalScale(14),
        borderRadius: moderateScale(12),
        alignItems: 'center',
        marginBottom: verticalScale(16),
        elevation: 4,
    },
    buttonDisabled: {
        backgroundColor: '#666',
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        fontSize: moderateScale(17),
        fontWeight: '600',
    },
    registerLink: {
        fontSize: moderateScale(15),
        color: '#111F54',
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop: verticalScale(10),
        fontWeight: '500',
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 20,
    },
    errorIcon: {
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: moderateScale(22),
        fontWeight: 'bold',
        color: '#dc2626',
        marginBottom: 12,
    },
    modalMessage: {
        fontSize: moderateScale(16),
        color: '#444',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 24,
    },
    modalButton: {
        backgroundColor: '#dc2626',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 30,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: moderateScale(16),
        fontWeight: '600',
    },
});