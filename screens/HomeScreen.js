import React, { useState,useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {  SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
    const daysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    const monthsOfYear = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Sabado", "Domingo"];
    const currentDate = new Date().getDate();
    const currentDay = new Date().getDay();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const [wrapUpInform, setWrapUpInform] = useState([{ horas: 0,minutos:0, videos: 0, revisitas: 0, estudios: 0 }]);
    const refVariable = useRef(0);

    useFocusEffect(
        React.useCallback(() => {
            loadWrapUpInform();
            return ()=>refVariable.current=0;
        })
    );

    const loadWrapUpInform = async () => {
        if (refVariable.current == 0) {
            /* new Date(2021, 0, 0).getDate() */
            let keyFmtdYearMonth = new Date().getFullYear() + "." + new Date().getMonth() + ".";
            let tHoras = 0; let tVideos = 0; let tRevisitas = 0; let tEstudios = 0;let tMinutos=0;
            let booInform = -1;
            for (let i = 1; i <= new Date().getDate(); i++) {
                let keyFmtdYearMonthDay = keyFmtdYearMonth + i + ".";
                for (let j = 1; j < 20; j++) {
                    console.log(keyFmtdYearMonthDay + j);
                    let val = await AsyncStorage.getItem(keyFmtdYearMonthDay + j);
                    if (val == null) { break; }
                    else {
                        tHoras += Number.parseInt((JSON.parse(val)).horas, 10);
                        tMinutos+=Number.parseInt((JSON.parse(val)).minutos, 10);
                        tVideos += Number.parseInt((JSON.parse(val)).videos, 10);
                        tRevisitas += Number.parseInt((JSON.parse(val)).revisitas, 10);
                        tEstudios += Number.parseInt((JSON.parse(val)).estudios, 10);
                    }
                }
            }
            tHoras +=Number.parseInt(tMinutos/60);
            tMinutos=tMinutos%60;
            booInform = wrapUpInform.map(el => {
                console.log(el.horas + " " + tHoras);
                if (el.horas != tHoras || el.minutos != tMinutos ||el.videos != tVideos || el.revisitas != tRevisitas || el.estudios != tEstudios) return -1;
                else {
                    return 0;
                }
            });
            if (booInform == -1) {
                console.log("essssssto");
                setWrapUpInform([{ horas: tHoras,minutos:tMinutos, videos: tVideos, revisitas: tRevisitas, estudios: tEstudios }]);
            }
            refVariable.current=-1;
        }
    }

    return (
        <SafeAreaView style={mainStyle.viewMain}>
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
                        <Text style={bodyStyle.txtDescription}>{wrapUpInform.map(el => { return el.horas })}:{wrapUpInform.map(el => { return el.minutos })}</Text>
                    </View>
                </View>
                <View style={bodyStyle.cards}>
                    <View style={bodyStyle.viewTitle}>
                        <IconFeather name="phone-call" size={40} />
                        <Text style={bodyStyle.txtTitle}>Videos</Text>
                    </View>
                    <View>
                        <Text style={bodyStyle.txtDescription}>{wrapUpInform.map(el => { return el.videos })}</Text>
                    </View>
                </View>
                <View style={bodyStyle.cards}>
                    <View style={bodyStyle.viewTitle}>
                        <IconSimpleLineIcons name="user" size={40} />
                        <Text style={bodyStyle.txtTitle}>Revisitas</Text>
                    </View>
                    <View>
                        <Text style={bodyStyle.txtDescription}>{wrapUpInform.map(el => { return el.revisitas })}</Text>
                    </View>
                </View>
                <View style={bodyStyle.cards}>
                    <View style={bodyStyle.viewTitle}>
                        <IconSimpleLineIcons name="people" size={40} />
                        <Text style={bodyStyle.txtTitle}>Estudios</Text>
                    </View>
                    <View>
                        <Text style={bodyStyle.txtDescription}>{wrapUpInform.map(el => { return el.estudios })}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>

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