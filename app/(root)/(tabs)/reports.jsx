import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '@/components/Header';

const Reports = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#f0f1f3' }}>
            <Header />
            <Text>Reports</Text>
        </View>
    )
}

export default Reports

const styles = StyleSheet.create({})