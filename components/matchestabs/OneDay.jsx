import { StyleSheet, Text, View, Image, FlatList, ScrollView } from 'react-native';

import React from 'react'
import MatchCard from '../MatchCard';

const OneDay = ({data}) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <MatchCard match={item} />}
                contentContainerStyle={styles.list}
            />
        </View>
    )
}

export default OneDay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        padding: 10,
    },
    list: {
        paddingBottom: 20,
    }
});