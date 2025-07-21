import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';

const Aiteamconfig = () => {
    const [autoPickCaptain, setAutoPickCaptain] = useState(false)
    const [autoPickViceCaptain, setAutoPickViceCaptain] = useState(false)
    const [lockStarPlayers, setLockStarPlayers] = useState(false)
    const [avoidInjuryProne, setAvoidInjuryProne] = useState(false)
    const [numTeams, setNumTeams] = useState('3 Teams')
    const [contestType, setContestType] = useState('Grand League')
    const [riskLevel, setRiskLevel] = useState('Balanced')

    const teamOptions = ['1 Team', '3 Teams', '5 Teams', '10 Teams']
    const contestOptions = ['Grand League', 'Head-to-Head', '50-50', 'Multi-Entry']
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

            <View style={styles.row}>
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
            </View>

            <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={styles.optiontitle}>Number of Teams</Text>
                    <View style={styles.dropdown}>
                        <Picker
                            selectedValue={numTeams}
                            onValueChange={(itemValue) => setNumTeams(itemValue)}
                            style={styles.picker}
                        >
                            {teamOptions.map((option) => (
                                <Picker.Item key={option} label={option} value={option} />
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
                        <Text style={styles.safeButtonText}>Safe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.balanceButton, riskLevel === 'Balanced' && styles.balanceButtonSelected]}
                        onPress={() => setRiskLevel('Balanced')}
                    >
                        <Text style={styles.balanceButtonText}>Balanced</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.riskButton, riskLevel === 'Risky' && styles.riskButtonSelected]}
                        onPress={() => setRiskLevel('Risky')}
                    >
                        <Text style={styles.riskButtonText}>Risky</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.generateButton}>
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
        backgroundColor: '#fff7ed',
    },
    safeButtonSelected: {
        backgroundColor: '#f0fdf4',
    },
    balanceButtonSelected: {
        backgroundColor: '#f2f5ff',
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