import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';

const RegisterScreen = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const checkPhoneExists = async (phone) => {
        try {
            const registeredPhones = await AsyncStorage.getItem('registeredPhones');
            const phoneList = registeredPhones ? JSON.parse(registeredPhones) : [];
            return phoneList.includes(phone);
        } catch (error) {
            console.error('Error checking phone number:', error);
            Alert.alert('Error', 'Failed to check phone number. Please try again.');
            return false;
        }
    };

    const addPhoneToStorage = async (phone) => {
        try {
            const registeredPhones = await AsyncStorage.getItem('registeredPhones');
            const phoneList = registeredPhones ? JSON.parse(registeredPhones) : [];
            phoneList.push(phone);
            await AsyncStorage.setItem('registeredPhones', JSON.stringify(phoneList));
        } catch (error) {
            console.error('Error saving phone number:', error);
            Alert.alert('Error', 'Failed to save phone number. Please try again.');
        }
    };

    const generateOtp = async () => {
        if (!name.trim()) {
            Alert.alert('Error', 'Please enter your name.');
            return;
        }
        if (!phoneNumber || phoneNumber.length !== 10) {
            Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
            return;
        }
        if (!email || !validateEmail(email)) {
            Alert.alert('Error', 'Please enter a valid email address.');
            return;
        }

        setIsLoading(true);
        const phoneExists = await checkPhoneExists(phoneNumber);
        if (phoneExists) {
            setIsLoading(false);
            Alert.alert(
                'Error',
                'This phone number is already registered. Please log in.',
                [
                    {
                        text: 'Go to Login',
                        onPress: () => router.push('/login'),
                    },
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                ]
            );
            return;
        }

        const otpValue = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(otpValue);
        setIsOtpSent(true);
        setTimeout(() => {
            Alert.alert('OTP Sent', `Your OTP is: ${otpValue} (Demo only)`);
            setIsLoading(false);
        }, 1000); // Simulate network delay
    };

    const handleRegister = async () => {
        if (!isOtpSent) {
            Alert.alert('Error', 'Please send OTP first.');
            return;
        }
        if (!otp || otp.length !== 4) {
            Alert.alert('Error', 'Please enter a valid 4-digit OTP.');
            return;
        }

        setIsLoading(true);
        
        if ( otp === generatedOtp) {
            try {
                // Store user session
                await AsyncStorage.setItem('userToken', 'loggedIn');
                // Store user data for profile
                const userData = {
                    name: name.trim(),
                    email: email.trim(),
                    profileImage: null,
                };
                await AsyncStorage.setItem('userData', JSON.stringify(userData));
                // Add phone number to registered phones
                await addPhoneToStorage(phoneNumber);
                router.replace('/(root)/(tabs)/');
            } catch (error) {
                Alert.alert('Error', 'Failed to register. Please try again.');
                console.error('Registration error:', error);
            }
        } else {
            Alert.alert('Error', 'Invalid phone number or OTP. Please check and try again.');
        }
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <Text style={styles.label}>Dummy Phone Number: 9876543210</Text>

            {/* Name Input */}
            <TextInput
                style={styles.input}
                placeholder="Enter Your Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                maxLength={50}
            />

            {/* Phone Number Input */}
            <TextInput
                style={styles.input}
                placeholder="Enter Phone Number (e.g., 9876543210)"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={10}
            />

            {/* Email Input */}
            <TextInput
                style={styles.input}
                placeholder="Enter Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                maxLength={100}
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
                        onPress={handleRegister}
                        disabled={isLoading}
                    >
                        <Text style={styles.buttonText}>
                            {isLoading ? 'Registering...' : 'Verify OTP & Register'}
                        </Text>
                    </TouchableOpacity>
                </>
            )}

            {/* Login Link */}
            <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.loginLink}>
                    Already have an account? Login here
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: scale(16),
        backgroundColor: '#F5F5F5',
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
    loginLink: {
        fontSize: moderateScale(14),
        color: '#111F54',
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop: verticalScale(10),
    },
});