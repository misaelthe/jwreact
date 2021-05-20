import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const SettingsScreen = () => {
    return (
        <View>
            <Button onPress={async() => {
                const keyFormatted = new Date().getFullYear() + "." + new Date().getMonth() + "." + new Date().getDay() + ".";
                let counter = 1;

                for (; ; counter++) {
                    let val = await AsyncStorage.getItem(keyFormatted + counter);
                    if (val == null) { break; }
                    await AsyncStorage.removeItem(keyFormatted + counter);
                }
            }} title="Borrar" />
        </View>
    );
}
export default SettingsScreen;