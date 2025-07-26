import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../../components/Header';
import AiSafeTeam from '../../../components/AiSafeTeam';
import { router, useLocalSearchParams } from 'expo-router';

const playerlist = () => {
    const {id} = useLocalSearchParams();

    return (
        <View style={styles.main}>
            <Header />
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Player List {id}</Text>
                </View>
                <View style={styles.main}>
                    <AiSafeTeam />
                </View>
            </ScrollView>
        </View>
    )
}

export default playerlist

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginBottom: verticalScale(20),

    },
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: scale(16),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: verticalScale(10),
    },
    title: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        color: '#111F54',
    },
})