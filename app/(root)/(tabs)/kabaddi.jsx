import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';

const Kabaddi = () => {

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={{ uri: 'https://i.pinimg.com/736x/15/6c/ce/156cce6a18eb4c3780f19999b8ade3b2.jpg' }}
                style={styles.background}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    {/* <Text style={styles.title}>Kabaddi Fantasy</Text> */}
                    <Text style={styles.title}>Coming Soon!</Text>
                    <Text style={styles.description}>
                        Get ready for an exciting Kabaddi experience! Stay tuned for the ultimate game launch.
                    </Text>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Kabaddi;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent overlay
        width: '100%',
        padding: 20,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#ffd700',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 24,
        color: '#ffd700',
        textAlign: 'center',
        marginBottom: 20,
    },
    countdownContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    countdownItem: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    countdownNumber: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: 'rgba(255, 215, 0, 0.7)',
        padding: 10,
        borderRadius: 10,
    },
    countdownLabel: {
        fontSize: 16,
        color: '#fff',
        marginTop: 5,
    },
    description: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});