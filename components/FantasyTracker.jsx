import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Feather, FontAwesome } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker'; // Import document picker
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Ensure this is installed
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OverallAnalysis from './OverallAnalysis';

const FantasyTracker = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileData, setfileData] = useState(null);
    const [authUser, setauthUser] = useState({});
    const [isLoading, setisLoading] = useState(false);
    const [analysisData, setAnalysisData] = useState(null);
    const [showAnalysis, setshowAnalysis] = useState(null);


    useEffect(() => {
        const fetchUserData = async () => {
            const storedData = await AsyncStorage.getItem('userData');
            // console.log("USER DATA : ", storedData);
            setauthUser(storedData);
        };
        fetchUserData();
    }, []);

    const pickDocument = async () => {
        // Launch document picker
        let result = await DocumentPicker.getDocumentAsync({
            type: ['image/png', 'image/jpeg', 'image/jpg'], // Allowed file types
            copyToCacheDirectory: true,
            multiple: false, // Single file selection
        });

        if (result.assets) {
            setfileData(result.assets[0]);
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

    const uploadFile = async () => {
        const storedData = await AsyncStorage.getItem('userData');
        const parsedData = storedData ? JSON.parse(storedData) : {};
        setisLoading(true);
        if (!fileData) return;

        const file = fileData;
        const formData = new FormData();
        formData.append('file', {
            uri: file.uri,
            name: file.name,
            type: file.mimeType || 'image/jpeg',
        });
        formData.append('userId', parsedData.userid);

        try {
            const response = await axios.post(
                'http://api.victoryvision.live:3000/api/insert-fantasy-points',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            console.log("Upload success:", response.data);
            setisLoading(false);
            setAnalysisData(response.data);
        } catch (error) {
            console.error("Upload failed:", error);
            setisLoading(false);
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
                <>
                    <Text style={styles.selectedFileText}>Selected File: {selectedFile}</Text>
                    <TouchableOpacity
                        style={styles.chatButton}
                        onPress={uploadFile}
                    >
                        <View style={styles.buttonContent}>
                            <MaterialCommunityIcons name="robot-excited-outline" size={20} color="#ea580c" />
                            <Text style={styles.buttonText}>
                                Analyze With AI
                                {isLoading == true && <ActivityIndicator color="#ea580c" />}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </>
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
            {analysisData && (
                <View style={{ marginVertical: 20 }}>
                    <TouchableOpacity
                        style={styles.chatButton}
                        onPress={() => setshowAnalysis(true)}
                    >
                        <View style={styles.buttonContent}>
                            <MaterialCommunityIcons name="eye-outline" size={20} color="#ea580c" />
                            <Text style={styles.buttonText}>View Analysis</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
            {analysisData && showAnalysis && (
                <OverallAnalysis analysisId={analysisData} />
            )}
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
    chatButton: {
        height: 50,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#ea580c',
        backgroundColor: '#fff7ed',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginBottom: 10,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ea580c',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8, // Space between icon and text
    },
});