import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Feather, FontAwesome } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker'; // Import document picker

const FantasyTracker = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const pickDocument = async () => {
        // Launch document picker
        let result = await DocumentPicker.getDocumentAsync({
            type: ['image/png', 'image/jpeg', 'image/jpg'], // Allowed file types
            copyToCacheDirectory: true,
            multiple: false, // Single file selection
        });

        if (result.assets) {
            // Show only first 20 letters of file name, then "..."
            const fileName = result.assets[0].name;
            const shortName = fileName.length > 20 ? fileName.slice(0, 20) + '...' : fileName;
            setSelectedFile(shortName);
            // Here you can add logic to handle the uploaded file (e.g., send to server)
            // console.log('File URI:', result.assets[0].uri);
            // console.log('File Name:', result.assets[0].name);
            // console.log('File Size:', result.assets[0].size);
        } else if (result.canceled) {
            console.log('Document selection canceled');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconCircle}>
                    <FontAwesome name="trophy" size={20} color="#fff" />
                </View>
                <Text style={styles.headerText}>Fantasy Points Tracker</Text>
            </View>
            <View style={styles.uploadSection}>
                <View style={styles.dashedBorder}>
                    <FontAwesome name="upload" size={30} color="#4CAF50" />
                    <Text style={styles.uploadText}>Upload Team Screenshot</Text>
                    <Text style={styles.uploadSubText}>Get instant points calculation and performance analysis</Text>
                    <TouchableOpacity style={styles.chooseButton} onPress={pickDocument}>
                        <Text style={styles.chooseButtonText}>Choose Image</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {selectedFile && (
                <Text style={styles.selectedFileText}>Selected File: {selectedFile}</Text>
            )}
            <View style={styles.whatYouGetSection}>
                <Text style={styles.whatYouGetText}>What you'll get:</Text>
                <View style={styles.benefitsList}>
                    <View style={styles.benefitItem}>
                        <Feather name="check-circle" size={16} color="#4CAF50" />
                        <Text style={styles.benefitText}>Detailed points breakdown</Text>
                    </View>
                    <View style={styles.benefitItem}>
                        <Feather name="check-circle" size={16} color="#4CAF50" />
                        <Text style={styles.benefitText}>Performance analysis</Text>
                    </View>
                    <View style={styles.benefitItem}>
                        <Feather name="check-circle" size={16} color="#4CAF50" />
                        <Text style={styles.benefitText}>AI improvement suggestions</Text>
                    </View>
                    <View style={styles.benefitItem}>
                        <Feather name="check-circle" size={16} color="#4CAF50" />
                        <Text style={styles.benefitText}>Captain choice evaluation</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.recommendationText}>
                Upload more screenshots to improve AI recommendations
            </Text>
            <Text style={styles.recommendationText}>
                AI suggest the best captain and vice-captain based on your screenshot and recent player performance. Use these tips to create a stronger team.
            </Text>
        </View>
    );
};

export default FantasyTracker;

const styles = StyleSheet.create({
    container: {
        // padding: 10,
        // backgroundColor: '#f0f1f3',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconCircle: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#101d4d',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    uploadSection: {
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,

    },
    dashedBorder: {
        width: '100%',
        padding: 20,
        borderWidth: 2,
        borderColor: '#101d4f',
        borderStyle: 'dashed',
        borderRadius: 15,
        alignItems: 'center',
    },
    uploadText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginTop: 10,
    },
    uploadSubText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    chooseButton: {
        backgroundColor: '#ea580c',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    chooseButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    selectedFileText: {
        fontSize: 12,
        color: '#000',
        marginBottom: 20,
    },
    whatYouGetSection: {
        marginBottom: 20,
    },
    whatYouGetText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    benefitsList: {
        marginLeft: 20,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    benefitText: {
        fontSize: 14,
        color: '#000',
        marginLeft: 8,
    },
    recommendationText: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
        lineHeight: 18,
        marginBottom: 10,
    },
});