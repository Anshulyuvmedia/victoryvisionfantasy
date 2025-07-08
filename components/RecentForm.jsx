import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const RecentForm = () => {
    return (
        <View style={styles.outerContainer}>
            <LinearGradient
                colors={['#fadebf', '#fff7ed']}
                style={styles.gradientBorder}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Recent Form</Text>
                        <View style={styles.teamContainer}>
                            <Text style={styles.team}>MI</Text>
                            <View style={styles.form}>
                                <View style={styles.win}>
                                    <Text style={styles.indicatorText}>W</Text>
                                </View>
                                <View style={styles.loss}>
                                    <Text style={styles.indicatorText}>L</Text>
                                </View>
                                <View style={styles.win}>
                                    <Text style={styles.indicatorText}>W</Text>
                                </View>
                                <View style={styles.win}>
                                    <Text style={styles.indicatorText}>W</Text>
                                </View>
                                <View style={styles.loss}>
                                    <Text style={styles.indicatorText}>L</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.teamContainer}>
                            <Text style={styles.team}>CSK</Text>
                            <View style={styles.form}>
                                <View style={styles.win}>
                                    <Text style={styles.indicatorText}>W</Text>
                                </View>
                                <View style={styles.win}>
                                    <Text style={styles.indicatorText}>W</Text>
                                </View>
                                <View style={styles.loss}>
                                    <Text style={styles.indicatorText}>L</Text>
                                </View>
                                <View style={styles.win}>
                                    <Text style={styles.indicatorText}>W</Text>
                                </View>
                                <View style={styles.win}>
                                    <Text style={styles.indicatorText}>W</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

export default RecentForm;

const styles = StyleSheet.create({
    outerContainer: {
        marginTop: 15,
    },
    gradientBorder: {
        flex: 1,
        padding: 1,
        borderRadius: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff4e6',
        borderRadius: 20,
        overflow: 'hidden',
    },
    content: {
        paddingStart: 15,
        paddingTop: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    teamContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    team: {
        fontSize: 16,
        marginRight: 10,
        fontWeight: 'bold',
    },
    form: {
        flexDirection: 'row',
    },
    win: {
        paddingBlock: 5,
        paddingInline: 8,
        borderRadius: 100,
        backgroundColor: 'green',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loss: {
        paddingBlock: 5,
        paddingInline: 11,
        borderRadius: 100,
        backgroundColor: 'red',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicatorText: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});