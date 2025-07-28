import { StyleSheet, Text, View, Image, FlatList, ScrollView } from 'react-native';

import React from 'react'
import MatchCard from '../MatchCard';

const matches = [
  {
    id: '1',
    teamA: 'Australia',
    teamB: 'India',
    matchDate: '2025-07-30T19:30:00.000Z',
  }
];
const TestMatches = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MatchCard match={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

export default TestMatches

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