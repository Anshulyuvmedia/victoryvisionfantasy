import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

const LoginScreen = () => {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const generateOtp = () => {
        // setIsLoading(true);

        const otpValue = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(otpValue);
        setIsOtpSent(true);
        // setTimeout(() => {
        //     Alert.alert('OTP Sent', `Your OTP is: ${otpValue} (Demo only)`);
        //     setIsLoading(false);
        // }, 1000); // Simulate network delay
    };

    const handleLogin = async () => {
        if (!isOtpSent) {
            Alert.alert('Error', 'Please send OTP first');
            return;
        }

        // setIsLoading(true);
        const dummyPhoneNumber = '9876543210';
        if (phoneNumber === dummyPhoneNumber && otp === generatedOtp) {
            try {
                await AsyncStorage.setItem('userToken', 'loggedIn');
                router.push('./(root)/(tabs)/');
            } catch (error) {
                Alert.alert('Error', 'Failed to save session. Please try again.');
                console.error(error);
            }
        } else {
            Alert.alert('Error', 'Invalid phone number or OTP. Please check and try again.');
        }
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login with Phone</Text>
            <Text style={styles.label}>Dummy Phone Number: 9876543210</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Phone Number (e.g. 9876543210)"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={13}
            />
            {!isOtpSent && (
                <Button
                    title={isLoading ? 'Sending...' : 'Send OTP'}
                    onPress={generateOtp}
                    color="#4CAF50"
                    disabled={isLoading}
                />
            )}
            {isOtpSent && (
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
                    <Button
                        title={isLoading ? 'Verifying...' : 'Verify OTP & Login'}
                        onPress={handleLogin}
                        disabled={isLoading}
                    />
                </>
            )}
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
        color: '#666',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});