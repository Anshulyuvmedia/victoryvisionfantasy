import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import MatchCard from '../MatchCard';

const TestMatches = ({ data }) => {
  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <Text style={styles.noMatches}>No Test matches today</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <MatchCard match={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default TestMatches;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 10,
  },
  list: {
    paddingBottom: 20,
  },
  noMatches: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});