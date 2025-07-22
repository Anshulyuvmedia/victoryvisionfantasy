import { StyleSheet, Text, View, } from 'react-native';
import React, { useCallback } from 'react';
import ExpertConsensus from '../ExpertConsensus';
import ExpertFeed from '../ExpertFeed';

const ExpertTab = ({ onContentHeightChange }) => {
    const handleLayout = useCallback(
        (event) => {
            if (onContentHeightChange) {
                const { height } = event.nativeEvent.layout;
                onContentHeightChange(height); // Pass the measured height to the parent
            }
        },
        [onContentHeightChange]
    );
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer} onLayout={handleLayout}>
                <View style={styles.section}>
                    <ExpertConsensus />
                </View>
                <View style={styles.section}>
                    <ExpertFeed />
                </View>
            </View>

        </View>
    );
};

export default ExpertTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1, // Allow content to grow vertically
        paddingBottom: 40, // Prevent content from being cut off
    },
    section: {
        marginVertical: 10, // Spacing between sections
        marginHorizontal: 10, // Horizontal spacing for better appearance
    },
});