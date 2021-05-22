import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import FormInform from './FormInform';
import { SafeAreaView } from 'react-native-safe-area-context';

const InformScreen = ({ navigation }) => {
    return (
        <SafeAreaView >
            <ScrollView>
                <View style={informStyle.container}>
                    <View style={informStyle.containerTitle}>
                        <Text style={informStyle.title}>
                            Aqui registras
                </Text>
                        <Text style={informStyle.title}>
                            tu informe.
                </Text>
                        <Text style={informStyle.subtitle}>
                            Recuerda que cada minuto cuenta.
                </Text>
                    </View>
                    <FormInform navigation={navigation} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );

}
const informStyle = StyleSheet.create({
    container: { padding: 20 },
    containerTitle: { marginVertical: 20 },
    title: { fontSize: 32, fontWeight: 'bold' },
    subtitle: { fontSize: 17, color: 'gray', marginVertical: 5 }
});
export default InformScreen;