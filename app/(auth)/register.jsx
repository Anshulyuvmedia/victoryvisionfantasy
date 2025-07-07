import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const RegisterScreen = () => {
    const router = useRouter();

    return (
        <View>
            <Text>Register</Text>
            <TextInput placeholder="Email" />
            <TextInput placeholder="Password" secureTextEntry />
            <Button title="Register" onPress={() => {/* Add auth logic */ }} />
            <Button title="Back to Login" onPress={() => router.push('/(auth)/login')} />
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})