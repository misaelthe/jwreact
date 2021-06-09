import React from 'react';
import { View, Text, Pressable, StyleSheet, Button, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, FONTS, STRUCTURE } from "../constants/theme.js";

const SettingsScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.tertiary }}>
            <View style={[STRUCTURE.rowHorizontal, { padding: SIZES.min }]}>
                <Text style={FONTS.subHeading}>Reglas del Aplicativo</Text>
            </View>
            <View style={[STRUCTURE.rowHorizontal, STRUCTURE.viewRounded, { backgroundColor: COLORS.white, marginHorizontal: SIZES.min }]}>
                <View style={[STRUCTURE.rowHorizontal, STRUCTURE.rowSettings]}>
                    <View style={STRUCTURE.rowHorizontal}>
                        <Text style={FONTS.subHeading2}>Almacenamiento de Informes</Text>
                    </View>
                    <View style={STRUCTURE.rowHorizontal}>
                        <Text style={FONTS.text}>Informes de 3 meses atras seran eliminados de forma permanente, keep that in mind.</Text>
                    </View>
                </View>
                <View style={[STRUCTURE.rowHorizontal, STRUCTURE.rowSettings]}>
                    <View style={STRUCTURE.rowHorizontal}>
                        <Text style={FONTS.subHeading2}>Almacenamiento de los informes de los ultimos 3 meses</Text>
                    </View>
                    <View style={STRUCTURE.rowHorizontal}>
                        <Text style={FONTS.text}>Informes de 3 meses atras seran eliminados de forma permanente, keep that in mind.</Text>
                    </View>
                </View>
                <View style={[STRUCTURE.rowHorizontal, STRUCTURE.rowSettings]}>
                    <View style={STRUCTURE.rowHorizontal}>
                        <Text style={FONTS.subHeading2}>Almacenamiento de los informes de los ultimos 3 meses</Text>
                    </View>
                    <View style={STRUCTURE.rowHorizontal}>
                        <Text style={FONTS.text}>Informes de 3 meses atras seran eliminados de forma permanente, keep that in mind.</Text>
                    </View>
                </View>
            </View>
            <View style={[STRUCTURE.rowHorizontal, { padding: SIZES.min }]}>
                <Text style={[FONTS.subHeading, { color: COLORS.red }]}>Danger Zone</Text>
            </View>
            <View style={[STRUCTURE.rowHorizontal, STRUCTURE.viewRounded, { backgroundColor: COLORS.white, marginHorizontal: SIZES.min, borderColor: COLORS.red, borderWidth: 1 }]}>
                <View style={[STRUCTURE.rowVertical, STRUCTURE.rowSettings]}>
                    <View style={{width:"60%"}}>
                        <Text style={FONTS.subHeading2}>Estas seguro que quieres eliminar toda la data ? There's no turning back</Text>
                    </View>
                    <View style={{width:"40%"}}>
                        <TouchableOpacity style={styleSettings.btnDelete} onPress={async () => {
                            AsyncStorage.clear();
                        }} ><Text style={styleSettings.txtSubmit}>Wipe Data</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styleSettings.danger}>
                    <View style={styleSettings.block}>
                        <Text style={styleSettings.subHeading}>Estas a punto de editar tu informe</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={[styleSettings.btnDelete]}
                            onPress={() => {
                                navigation.navigate('EditInformScreen')
                            }}
                        >
                            <Text>Edit Inform</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <View style={STRUCTURE.rowVertical}>

            </View>
        </SafeAreaView>
    );
}
const styleSettings = StyleSheet.create({
    headingDanger: { color: "red", textAlign: 'center', fontSize: 23 },
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
    btnDelete: {
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