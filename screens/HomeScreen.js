import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default class HomeScreen extends Component {
    render() {
        const currentDate = new Date().getDate();
        const currentDay = new Date().getDay();
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const daysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
        const monthsOfYear = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Sabado", "Domingo"];
        return (
            <View style={mainStyle.viewMain}>
                <View style={headerStyle.viewDate}>
                    <TouchableOpacity style={headerStyle.btnCurrentDate}>
                        <Text style={headerStyle.txtDay}>{daysOfWeek[currentDay]} {currentDate}</Text>
                        <Text style={headerStyle.txtMonth}>de {monthsOfYear[currentMonth]} del {currentYear}</Text>
                    </TouchableOpacity>
                </View>
                <View style={bodyStyle.viewWrapUp}>
                    <View style={bodyStyle.cards}>
                        <View style={bodyStyle.viewTitle}>
                            <IconFeather name="clock" size={40} />
                            <Text style={bodyStyle.txtTitle}>Horas</Text>
                        </View>
                        <View>
                            <Text style={bodyStyle.txtDescription}>20 hora</Text>
                        </View>
                    </View>
                    <View style={bodyStyle.cards}>
                        <View style={bodyStyle.viewTitle}>
                            <IconFeather name="phone-call" size={40} />
                            <Text style={bodyStyle.txtTitle}>Videos</Text>
                        </View>
                        <View>
                            <Text style={bodyStyle.txtDescription}>20 hora</Text>
                        </View>
                    </View>
                    <View style={bodyStyle.cards}>
                        <View style={bodyStyle.viewTitle}>
                            <IconSimpleLineIcons name="user" size={40} />
                            <Text style={bodyStyle.txtTitle}>Revisitas</Text>
                        </View>
                        <View>
                            <Text style={bodyStyle.txtDescription}>20 hora</Text>
                        </View>
                    </View>
                    <View style={bodyStyle.cards}>
                        <View style={bodyStyle.viewTitle}>
                            <IconSimpleLineIcons name="people" size={40} />

                            <Text style={bodyStyle.txtTitle}>Estudios</Text>
                        </View>
                        <View>
                            <Text style={bodyStyle.txtDescription}>20 hora</Text>
                        </View>
                    </View>
                </View>
            </View>
           
        );
    }
}
const mainStyle = StyleSheet.create({
    viewMain: { flexDirection: 'column', flex: 2 },
});
const headerStyle = StyleSheet.create({
    viewDate: { flex: 1, justifyContent: "center", padding: 10,backgroundColor: '#4874A8', borderRadius: 25  },
    btnCurrentDate: { height: 50, flexDirection: "column", flex: 1, height: 150, justifyContent: 'center', backgroundColor: '#4D9CD0', borderRadius: 25 },
    txtDay: { fontSize: 40, fontWeight: 'bold', textAlign: 'center' },
    txtMonth: { fontSize: 30, textAlign: 'center' }
});
const bodyStyle = StyleSheet.create({
    viewWrapUp: { flex: 3, backgroundColor: 'white', padding: 7 },
    cards: { borderWidth: 1, borderRadius: 25, flexDirection: 'row', padding: 3, flex: 1, margin: 7, justifyContent: 'space-between', alignItems: 'center' },
    viewTitle: { flexDirection:'row',alignItems:'center' },
    txtTitle: { fontSize: 30,marginLeft:7 },
    txtDescription: { fontSize: 25 },
});
