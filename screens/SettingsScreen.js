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
             <View>
            <TouchableOpacity
              style={[{ flex: 1 }, styleSettings.btnDelete]}
              onPress={() => {
                navigation.navigate('EditInformScreen')
              }}
            >
              <Text style={styleSettings.textSubmit}>Editar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
    );
}
const styleSettings = StyleSheet.create({
    container: { flex: 1, color: 'red' },
    btnDelete:{
        height: 65,
        backgroundColor: "#F7102C",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
      },
      textSubmit: {
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: "bold",
      },
});
export default SettingsScreen;