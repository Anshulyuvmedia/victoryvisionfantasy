import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import axios from 'axios';

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


    const handleRegister = async () => {
        try {
            const response = await axios.post('http://13.203.214.179:3000/api/createUser', {
                name,
                email,
                phoneNumber
            });
            if (response.status === 200) {
                Alert.alert('Success', 'User registered successfully!');
                setIsLoading(false);
            } else {
                Alert.alert('Error', 'Registration failed');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong');
        }
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
            <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>
                    {isLoading ? 'Registering...' : 'Register Now'}
                </Text>
            </TouchableOpacity>

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