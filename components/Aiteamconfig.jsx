import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { GlobalContextReport } from '../app/GlobalContextReport';


const Aiteamconfig = () => {
    const { todaymatches } = useContext(GlobalContextReport);
    const [autoPickCaptain, setAutoPickCaptain] = useState(false)
    const [autoPickViceCaptain, setAutoPickViceCaptain] = useState(false)
    // const [lockStarPlayers, setLockStarPlayers] = useState(false)
    // const [avoidInjuryProne, setAvoidInjuryProne] = useState(false)
    const [selectedMatchId, setSelectedMatchId] = useState(null)
    const [contestType, setContestType] = useState('Grand League')
    const [riskLevel, setRiskLevel] = useState('Balanced')
    const contestOptions = ['T20I', 'ODI', 'Test Matches']
    const [authUser, setauthUser] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            const storedData = await AsyncStorage.getItem('userData');
            // console.log("USER DATA : ", storedData);
            setauthUser(storedData);
        };
        fetchUserData();
        //It will set Id of already selected Match
        if (todaymatches && todaymatches.length > 0) {
            setSelectedMatchId(todaymatches[0].matchId);
        }
    }, [todaymatches]);


    const generateAiTeams = async () => {
        const storedData = await AsyncStorage.getItem('userData');
        const parsedData = storedData ? JSON.parse(storedData) : {};
        const formData = new FormData();
        formData.append('userId', parsedData.userid);
        formData.append('autoPickCaptain', autoPickCaptain);
        formData.append('autoPickViceCaptain', autoPickViceCaptain);
        // formData.append('lockStarPlayers', lockStarPlayers);
        // formData.append('avoidInjuryProne', avoidInjuryProne);
        formData.append('selectedMatchId', selectedMatchId);
        formData.append('contestType', contestType);
        formData.append('riskLevel', riskLevel);
        // console.log('Form Data:', formData);

        try {
            const response = await axios.post(
                'http://192.168.1.159:3000/api/insert-aiteam',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('Upload success');
        } catch (error) {
            console.error('Upload failed:', error);
        } c
    };
    return (
        <View style={styles.container}>
            <View style={styles.titlebox}>
                <MaterialCommunityIcons name="robot" size={24} color="black" />
                <Text style={styles.title}>AI Team Configuration</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.optiontitle}>Auto-pick Captain</Text>
                <Switch
                    onValueChange={setAutoPickCaptain}
                    value={autoPickCaptain}
                />
            </View>

            <View style={styles.row}>
                <Text style={styles.optiontitle}>Auto-pick Vice-Captain</Text>
                <Switch
                    onValueChange={setAutoPickViceCaptain}
                    value={autoPickViceCaptain}
                />
            </View>

            {/* <View style={styles.row}>
                <Text style={styles.optiontitle}>Lock Star Players</Text>
                <Switch
                    onValueChange={setLockStarPlayers}
                    value={lockStarPlayers}
                />
            </View>

            <View style={styles.row}>
                <Text style={styles.optiontitle}>Avoid Injury Prone</Text>
                <Switch
                    onValueChange={setAvoidInjuryProne}
                    value={avoidInjuryProne}
                />
            </View> */}

            <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={styles.optiontitle}>Select Match</Text>
                    <View style={styles.dropdown}>
                        <Picker
                            selectedValue={selectedMatchId}
                            onValueChange={(itemValue) => setSelectedMatchId(itemValue)}
                            style={styles.picker}
                        >
                            {todaymatches.map((option) => (
                                <Picker.Item
                                    key={option.matchId}
                                    label={option.title}
                                    value={option.matchId}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>


                <View style={styles.col}>
                    <Text style={styles.optiontitle}>Contest Type</Text>
                    <View style={styles.dropdownType}>
                        <Picker
                            selectedValue={contestType}
                            onValueChange={(itemValue) => setContestType(itemValue)}
                            style={styles.picker}
                        >
                            {contestOptions.map((option) => (
                                <Picker.Item key={option} label={option} value={option} />
                            ))}
                        </Picker>
                    </View>
                </View>
            </View>

            <View style={styles.riskContainer}>
                <Text style={styles.optiontitle}>Risk Level</Text>
                <View style={styles.riskButtons}>
                    <TouchableOpacity
                        style={[styles.safeButton, riskLevel === 'Safe' && styles.safeButtonSelected]}
                        onPress={() => setRiskLevel('Safe')}
                    >
                        <Text style={[styles.safeButtonText, riskLevel === 'Safe' && styles.safeButtonSelected]}>Safe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.balanceButton, riskLevel === 'Balanced' && styles.balanceButtonSelected]}
                        onPress={() => setRiskLevel('Balanced')}
                    >
                        <Text style={[styles.balanceButtonText, riskLevel === 'Balanced' && styles.balanceButtonSelected]}>Balanced</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.riskButton, riskLevel === 'Risky' && styles.riskButtonSelected]}
                        onPress={() => setRiskLevel('Risky')}
                    >
                        <Text style={[styles.riskButtonText, riskLevel === 'Risky' && styles.riskButtonSelected]}>Risky</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.generateButton} onPress={generateAiTeams}>
                <Text style={styles.generateButtonText}>Generate AI Teams</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Aiteamconfig

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 18,
        marginTop: 10,
    },
    titlebox: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        marginStart: 7,
    },
    optiontitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        marginTop: 6,
    },
    col: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'start',
        marginBottom: 12,
        width: '49%',
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#f4a77c',
        borderRadius: 40,
        paddingInline: 10,
        paddingBlock: 0,
        backgroundColor: '#fef7ef',
        minWidth: 100,
        marginTop: 5,

    },
    dropdownType: {
        borderWidth: 1,
        borderColor: '#d1eaf7',
        borderRadius: 40,
        paddingInline: 10,
        paddingBlock: 0,
        backgroundColor: '#e6f1f7',
        minWidth: 100,
        marginTop: 5,
    },
    picker: {
        // height: 50,
        width: '100%',
        color: '#ergba(0, 0, 0, 1)'
    },
    riskContainer: {
        marginBottom: 16,
        backgroundColor: '#f0f1f3',
        padding: 16,
        borderRadius: 20,
    },
    riskButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,

    },
    riskButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ea580c',
        backgroundColor: '#fff7ed',
    },
    riskButtonText: {
        color: '#ea580c',
    },
    safeButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'green',
        backgroundColor: '#f0fdf4',
    },
    safeButtonText: {
        color: 'green',
    },
    balanceButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#5f83f1',
        backgroundColor: '#f2f5ff',

    },
    balanceButtonText: {
        color: '#5f83f1',
    },
    riskButtonSelected: {
        backgroundColor: '#ea580c',
        color: '#ffffffff',
    },
    safeButtonSelected: {
        backgroundColor: 'green',
        color: '#ffffffff',

    },
    balanceButtonSelected: {
        backgroundColor: '#5f83f1',
        color: '#ffffffff',
    },
    generateButton: {
        backgroundColor: '#5f83f1',
        padding: 12,
        borderRadius: 24,
        alignItems: 'center',
    },
    generateButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})