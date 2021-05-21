import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const SettingsScreen = () => {
    return (
        <View>
            <Button onPress={async() => {
                AsyncStorage.clear();
            }} title="Borrar" />
        </View>
    );
}
export default SettingsScreen;