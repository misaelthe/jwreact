import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styleSettings.container}>
            <Button onPress={async () => {
                AsyncStorage.clear();
            }} title="Borrar" />
            
        </SafeAreaView>
    );
}
const styleSettings = StyleSheet.create({
    container: { flex: 1, color: 'red' }
});
export default SettingsScreen;