import React, { Component, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = () => {
    const daysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    const monthsOfYear = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Sabado", "Domingo"];
    const currentDate = new Date().getDate();
    const currentDay = new Date().getDay();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const [horas, setHoras] = useState(0);
    const [videos, setVideos] = useState(0);
    const [revisitas, setRevisitas] = useState(0);
    const [estudios, setEstudios] = useState(0);

    const isFocused = useIsFocused();

    const loadWrapUpInform = async () => {
        const arInforms = [];
        const keyFormatted = currentYear + "." + currentMonth + "." + currentDay + ".";
        let totalHoras = 0;
        let totalVideos = 0;
        let totalRevisitas = 0;
        let totalEstudios = 0;
        for (let i = 1; i >0; i++) {
            let val = await AsyncStorage.getItem(keyFormatted + i);
            console.log("abc");
            if (val == null) { break; }
            arInforms.push(JSON.parse(val));
        }
        arInforms.map(el => {
            totalHoras += Number.parseInt(el.horas,10);
            totalVideos += Number.parseInt(el.videos);
            totalRevisitas += Number.parseInt(el.revisitas);
            totalEstudios += Number.parseInt(el.estudios);
        });
        console.log("se ha e");
        setHoras(totalHoras);
        setVideos(totalVideos);
        setRevisitas(totalRevisitas);
        setEstudios(totalEstudios);
    }

    useEffect(() => {
        loadWrapUpInform();
    })

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
                        <Text style={bodyStyle.txtDescription}>{isFocused && horas}</Text>
                    </View>
                </View>
                <View style={bodyStyle.cards}>
                    <View style={bodyStyle.viewTitle}>
                        <IconFeather name="phone-call" size={40} />
                        <Text style={bodyStyle.txtTitle}>Videos</Text>
                    </View>
                    <View>
                        <Text style={bodyStyle.txtDescription}>{isFocused && videos}</Text>
                    </View>
                </View>
                <View style={bodyStyle.cards}>
                    <View style={bodyStyle.viewTitle}>
                        <IconSimpleLineIcons name="user" size={40} />
                        <Text style={bodyStyle.txtTitle}>Revisitas</Text>
                    </View>
                    <View>
                        <Text style={bodyStyle.txtDescription}>{isFocused && revisitas}</Text>
                    </View>
                </View>
                <View style={bodyStyle.cards}>
                    <View style={bodyStyle.viewTitle}>
                        <IconSimpleLineIcons name="people" size={40} />
                        <Text style={bodyStyle.txtTitle}>Estudios</Text>
                    </View>
                    <View>
                        <Text style={bodyStyle.txtDescription}>{isFocused && estudios}</Text>
                    </View>
                </View>
            </View>
        </View>

    );
}

const mainStyle = StyleSheet.create({
    viewMain: { flexDirection: 'column', flex: 2 },
});
const headerStyle = StyleSheet.create({
    viewDate: { flex: 1, justifyContent: "center", padding: 10, backgroundColor: '#4874A8', borderRadius: 25 },
    btnCurrentDate: { height: 50, flexDirection: "column", flex: 1, height: 150, justifyContent: 'center', backgroundColor: '#4D9CD0', borderRadius: 25 },
    txtDay: { fontSize: 40, fontWeight: 'bold', textAlign: 'center' },
    txtMonth: { fontSize: 30, textAlign: 'center' }
});
const bodyStyle = StyleSheet.create({
    viewWrapUp: { flex: 3, backgroundColor: 'white', padding: 7 },
    cards: { borderWidth: 1, borderRadius: 25, flexDirection: 'row', padding: 3, flex: 1, margin: 7, justifyContent: 'space-between', alignItems: 'center' },
    viewTitle: { flexDirection: 'row', alignItems: 'center' },
    txtTitle: { fontSize: 30, marginLeft: 7 },
    txtDescription: { fontSize: 25 },
});

export default HomeScreen;