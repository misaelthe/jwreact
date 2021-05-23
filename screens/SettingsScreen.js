import React from 'react';
import { View, Text, Pressable, StyleSheet,Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = ({ navigation }) => {
    return (
        <SafeAreaView >
            <View style={styleSettings.container}>

                <View style={styleSettings.child}>
                    <View style={styleSettings.block}>
                        <Text style={styleSettings.heading}>Danger Zone</Text>
                    </View>
                    <View style={styleSettings.danger}>
                        <View style={styleSettings.block}>
                            <Text style={styleSettings.subHeading}>Estas seguro que quieres eliminar toda la data ? There's no turning back</Text>
                        </View>
                        <View style={styleSettings.block}>
                            <Pressable onPressIn={() => {
                                async () => {
                                    AsyncStorage.clear();
                                }
                            }} >
                                <View style={styleSettings.btnSubmit}><Text style={styleSettings.txtSubmit}>Wipe Data</Text></View>
                            </Pressable>
                        </View>
                    </View>

                </View>
                <View style={styleSettings.child}>
                    <Pressable onPressIn={() => {
                        async () => {
                            await AsyncStorage.clear();
                        }
                    }} >
                        <View style={styleSettings.btnSubmit}><Text style={styleSettings.txtSubmit}>Wipe Data</Text></View>
                    </Pressable>
                    <Button
                        onPress={() => {
                            async () => {
                                AsyncStorage.clear();
                            }
                        }} title="gfg"></Button>
                </View>


            </View>


        </SafeAreaView>
    );
}
const styleSettings = StyleSheet.create({
    container: { padding: 20 },

    child: {},
    block: { paddingVertical: 10 },

    heading: { fontSize: 21 },
    danger: {
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 15,
        padding: 15
    },
    subHeading: { fontSize: 17, textAlign: 'center' },
    btnSubmit: {
        padding: 15,
        borderRadius: 15,
        backgroundColor: '#FE0000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtSubmit: {
        fontSize: 19,
        color: '#FFFFFF'
    }
});
export default SettingsScreen;