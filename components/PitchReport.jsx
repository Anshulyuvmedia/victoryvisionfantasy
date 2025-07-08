import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PitchReport = () => {
    return (
        <View style={styles.box}>
            <View style={styles.titleBox}>
                <MaterialCommunityIcons name="file-chart" size={24} color="#16a34a" />
                <Text style={styles.title}>Pitch Report</Text>
            </View>
            <Text style={styles.button}>Batting Friendly</Text>
        </View>
    )
}

export default PitchReport

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'white',
        paddingBlock: 10,
        paddingInline: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 100,
    },
    titleBox: {
        flexDirection: 'row',
    },
    title: {
        marginStart: 5,
        fontWeight: 600,
    },
    button: {
        fontWeight: 600,
        paddingInline: 15,
        paddingBlock: 7,
        borderRadius: 100,
        backgroundColor: '#f0f1f3',

    }
})