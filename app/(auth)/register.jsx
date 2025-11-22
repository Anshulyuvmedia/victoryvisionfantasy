// app/(auth)/register.jsx
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import axios from 'axios';
import images from '@/constants/images';
import { Feather } from '@expo/vector-icons';

const RegisterScreen = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Modal State
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('Error');
    const [modalMessage, setModalMessage] = useState('');

    const showModal = (title = 'Error', message = 'Something went wrong') => {
        setModalTitle(title);
        setModalMessage(message);
        setModalVisible(true);
        setTimeout(() => setModalVisible(false), 3800);
    };

    const validateInputs = () => {
        if (!name.trim()) return 'Please enter your name';
        if (!phoneNumber || phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber))
            return 'Please enter a valid 10-digit phone number';
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return 'Please enter a valid email address';
        return null;
    };

    const handleRegister = async () => {
        const validationError = validateInputs();
        if (validationError) {
            showModal('Invalid Input', validationError);
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post('https://api.victoryvision.live/api/createUser', {
                name: name.trim(),
                email: email.toLowerCase().trim(),
                phoneNumber,
            });

            if (response.status === 201) {
                showModal('Success!', 'Account created successfully! You can now login.');
                setTimeout(() => {
                    router.replace('/login');
                }, 2000);
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;

                if (status === 409) {
                    showModal('Already Registered', data.msg || 'This phone number or email is already in use.');
                } else if (status === 400) {
                    showModal('Missing Information', data.msg || 'Please fill all fields correctly.');
                } else if (status === 500) {
                    showModal('Server Error', 'Something went wrong on our side. Please try again later.');
                } else {
                    showModal('Registration Failed', data.msg || 'Please try again.');
                }
            } else {
                showModal('No Internet', 'Cannot reach server. Check your connection and try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <View style={styles.container}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Image source={images.applogo} style={styles.logo} resizeMode="contain" />
                </View>

                <Text style={styles.title}>Create Account</Text>

                {/* Name */}
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#888"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    editable={!isLoading}
                />

                {/* Phone */}
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="#888"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    maxLength={10}
                    editable={!isLoading}
                />

                {/* Email */}
                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor="#888"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!isLoading}
                />

                <TouchableOpacity
                    style={[styles.button, isLoading && styles.buttonDisabled]}
                    onPress={handleRegister}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>
                        {isLoading ? 'Creating Account...' : 'Register Now'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text style={styles.loginLink}>
                        Already have an account? Login here
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Beautiful Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {modalTitle === 'Success!' ? (
                            <Feather name="check-circle" size={48} color="#16a34a" style={styles.modalIcon} />
                        ) : (
                            <Feather name="alert-circle" size={48} color="#dc2626" style={styles.modalIcon} />
                        )}

                        <Text style={[styles.modalTitle, modalTitle === 'Success!' ? styles.successTitle : styles.errorTitle]}>
                            {modalTitle}
                        </Text>

                        <Text style={styles.modalMessage}>{modalMessage}</Text>

                        <Pressable
                            style={[styles.modalButton, modalTitle === 'Success!' ? styles.successButton : styles.errorButton]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>
                                {modalTitle === 'Success!' ? 'Great!' : 'Got it'}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default RegisterScreen;

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
        fontSize: moderateScale(28),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: verticalScale(30),
        color: '#111F54',
    },
    input: {
        height: verticalScale(50),
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
        paddingVertical: verticalScale(15),
        borderRadius: moderateScale(12),
        alignItems: 'center',
        marginBottom: verticalScale(20),
        elevation: 5,
    },
    buttonDisabled: {
        opacity: 0.7,
        backgroundColor: '#666',
    },
    buttonText: {
        color: '#fff',
        fontSize: moderateScale(17),
        fontWeight: '600',
    },
    loginLink: {
        fontSize: moderateScale(15),
        color: '#111F54',
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontWeight: '500',
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.65)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '88%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 28,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 24,
    },
    modalIcon: {
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        marginBottom: 12,
    },
    successTitle: {
        color: '#16a34a',
    },
    errorTitle: {
        color: '#dc2626',
    },
    modalMessage: {
        fontSize: moderateScale(16),
        color: '#444',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 24,
    },
    modalButton: {
        paddingHorizontal: 36,
        paddingVertical: 12,
        borderRadius: 30,
        minWidth: 120,
    },
    successButton: {
        backgroundColor: '#16a34a',
    },
    errorButton: {
        backgroundColor: '#dc2626',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: moderateScale(16),
        fontWeight: '600',
        textAlign: 'center',
    },
});