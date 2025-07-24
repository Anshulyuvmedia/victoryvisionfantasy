import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';

const NotificationsScreen = () => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Sample notifications for demo
    const sampleNotifications = [
        {
            id: '1',
            title: 'Welcome!',
            message: 'Thank you for joining our app.',
            timestamp: new Date().toISOString(),
            isRead: false,
        },
        {
            id: '2',
            title: 'Update Available',
            message: 'A new version of the app is available.',
            timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            isRead: false,
        },
    ];

    // Load notifications from AsyncStorage
    useEffect(() => {
        const loadNotifications = async () => {
            try {
                setIsLoading(true);
                const storedNotifications = await AsyncStorage.getItem('notifications');
                if (storedNotifications) {
                    setNotifications(JSON.parse(storedNotifications));
                } else {
                    // Initialize with sample notifications if none exist
                    await AsyncStorage.setItem('notifications', JSON.stringify(sampleNotifications));
                    setNotifications(sampleNotifications);
                }
            } catch (error) {
                console.error('Error loading notifications:', error);
                Alert.alert('Error', 'Failed to load notifications.');
            } finally {
                setIsLoading(false);
            }
        };

        loadNotifications();
    }, []);

    // Mark a notification as read
    const markAsRead = async (id) => {
        try {
            const updatedNotifications = notifications.map((notif) =>
                notif.id === id ? { ...notif, isRead: true } : notif
            );
            setNotifications(updatedNotifications);
            await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
        } catch (error) {
            console.error('Error marking notification as read:', error);
            Alert.alert('Error', 'Failed to mark notification as read.');
        }
    };

    // Clear all notifications
    const clearAllNotifications = async () => {
        try {
            await AsyncStorage.setItem('notifications', JSON.stringify([]));
            setNotifications([]);
            Alert.alert('Success', 'All notifications cleared.');
        } catch (error) {
            console.error('Error clearing notifications:', error);
            Alert.alert('Error', 'Failed to clear notifications.');
        }
    };

    // Render each notification item
    const renderNotification = ({ item }) => (
        <View style={[styles.notificationCard, item.isRead && styles.readNotification]}>
            <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Text style={styles.notificationTimestamp}>
                    {new Date(item.timestamp).toLocaleString()}
                </Text>
            </View>
            {!item.isRead && (
                <TouchableOpacity
                    style={styles.readButton}
                    onPress={() => markAsRead(item.id)}
                >
                    <Ionicons name="checkmark-circle-outline" size={moderateScale(24)} color="#111F54" />
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={styles.main}>
            <Header />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Notifications</Text>
                    {notifications.length > 0 && (
                        <TouchableOpacity onPress={clearAllNotifications}>
                            <Text style={styles.clearAllText}>Clear All</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {isLoading ? (
                    <Text style={styles.loadingText}>Loading notifications...</Text>
                ) : notifications.length === 0 ? (
                    <Text style={styles.emptyText}>No notifications available.</Text>
                ) : (
                    <FlatList
                        data={notifications}
                        renderItem={renderNotification}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContainer}
                    />
                )}
            </View>
        </View>
    );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: scale(16),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: verticalScale(20),
    },
    title: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        color: '#111F54',
    },
    clearAllText: {
        fontSize: moderateScale(14),
        color: '#111F54',
        textDecorationLine: 'underline',
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: moderateScale(8),
        padding: moderateScale(12),
        marginBottom: verticalScale(10),
        borderWidth: 1,
        borderColor: '#111F54',
        alignItems: 'center',
    },
    readNotification: {
        backgroundColor: '#E6E6E6',
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: moderateScale(16),
        fontWeight: '600',
        color: '#111F54',
        marginBottom: verticalScale(4),
    },
    notificationMessage: {
        fontSize: moderateScale(14),
        color: '#666',
        marginBottom: verticalScale(4),
    },
    notificationTimestamp: {
        fontSize: moderateScale(12),
        color: '#999',
    },
    readButton: {
        padding: moderateScale(8),
    },
    emptyText: {
        fontSize: moderateScale(16),
        color: '#666',
        textAlign: 'center',
        marginTop: verticalScale(20),
    },
    loadingText: {
        fontSize: moderateScale(16),
        color: '#111F54',
        textAlign: 'center',
        marginTop: verticalScale(20),
    },
    listContainer: {
        paddingBottom: verticalScale(20),
    },
});