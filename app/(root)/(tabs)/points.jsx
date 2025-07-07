import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '@/components/Header';

const Points = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#f0f1f3' }}>
            <Header />
            <Text>Profile</Text>
        </View>
    )
}

export default Points

const styles = StyleSheet.create({})