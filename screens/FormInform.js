import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormInform = ({ navigation }) => {
    const [validated, setValidated] = useState(0);
    const [horas, setHoras] = useState('');
    const [minutos, setMinutos] = useState('');
    const [videos, setVideos] = useState('');
    const [revisitas, setRevisitas] = useState('');
    const [estudios, setEstudios] = useState('');
    const [errorForm, setErrorForm] = useState('');
    const nameRegex = new RegExp(/^[1-9]+$/i);

    const registerInform = async (obj) => {
        const keyFormatted = new Date().getFullYear() + "." + new Date().getMonth() + "." + new Date().getDate() + ".";
        let counter = 1;
        for (; ; counter++) {
            let val = await AsyncStorage.getItem(keyFormatted + counter);
            if (val == null) { break; }
        }
        await AsyncStorage.setItem(keyFormatted + counter, JSON.stringify(obj));
    }
    const validate = async () => {
        let daysSoFar = new Date().getDate();
        let temHoras = Number.parseInt(horas === '' ? 0 : horas);
        let temMinutos = Number.parseInt(minutos === '' ? 0 : minutos);
        let temVideos = Number.parseInt(videos === '' ? 0 : videos);
        let temRevisitas = Number.parseInt(revisitas === '' ? 0 : revisitas);
        let temEstudios = Number.parseInt(estudios === '' ? 0 : estudios);
        console.log(temHoras + " y las oras " + daysSoFar + "revi " + temRevisitas);
        if (temHoras > daysSoFar * 24) { setValidated(-1); setErrorForm("Las horas no pueden ser mayores a " + daysSoFar); }
        else if (temMinutos > 59) { setValidated(-1); setErrorForm("Los minutos no pueden ser mayores a 59"); }
        else if ((temHoras == 0 && temMinutos == 0) && (temRevisitas != 0 || temEstudios != 0)) {
            let littleText = '';
            if (temRevisitas !== '' && temEstudios !== '') littleText = "revisitas y estudios";
            else if (temRevisitas !== '') littleText = "revisitas";
            else littleText = "estudios";
            setValidated(-1);
            setErrorForm("No puedes informar " + littleText + " si no informas tiempo");
        }
        else if (temHoras == 0 && temMinutos == 0 && temVideos == 0 && temRevisitas == 0 && temEstudios == 0) { setValidated(-1); setErrorForm("No puedes enviar un informe vacio"); }
        else {
            const myObj = {
                horas: temHoras,
                minutos: temMinutos,
                videos: temVideos,
                revisitas: temRevisitas,
                estudios: temEstudios
            };
            registerInform(myObj);
            setValidated(0);
            setHoras('');
            setMinutos('');
            setVideos('');
            setRevisitas('');
            setEstudios('');
            navigation.navigate('Home');
        }
    }

    return (
        <View style={formStyles.container}>

            <View style={formStyles.rowTime}>
                <View style={formStyles.containerInputTime}>
                    <Text style={formStyles.textInput}>Horas</Text>
                    <TextInput style={formStyles.input} keyboardType='numeric' defaultValue={horas} onChangeText={txt => {
                        if (nameRegex.test(txt)) {
                            setValidated(0);
                            setHoras(txt.trim());
                        }
                        else {
                            setValidated(-1); setErrorForm("Solo caracteres numericos (no . ni ,)");
                        }
                    }} />
                </View>
                <View style={formStyles.containerInputTime}>
                    <Text style={formStyles.textInput}>Minutos</Text>
                    <TextInput style={formStyles.input} keyboardType='numeric' defaultValue={minutos} onChangeText={txt => setMinutos(txt)} />
                </View>
            </View>
            <View>
                <Text style={formStyles.textInput}>Videos</Text>
                <TextInput style={formStyles.input} keyboardType='numeric' defaultValue={videos} onChangeText={txt => setVideos(txt)} />
            </View>
            <View>
                <Text style={formStyles.textInput}>Revisitas</Text>
                <TextInput style={formStyles.input} keyboardType='numeric' defaultValue={revisitas} onChangeText={txt => setRevisitas(txt)} />
            </View>
            <View>
                <Text style={formStyles.textInput}>Estudios</Text>
                <TextInput style={formStyles.input} keyboardType='numeric' defaultValue={estudios} onChangeText={txt => setEstudios(txt)} />
            </View>
            <View>
                {validated == -1 ? (<Text style={formStyles.textError}>{errorForm}</Text>) : null}
            </View>
            <View style={formStyles.containerBtnSubmit}>
                <Pressable onPressIn={() => { validate() }}>
                    <View style={formStyles.btnSubmit}><Text style={formStyles.textSubmit}>Enviar</Text></View>
                </Pressable>
            </View>
        </View>
    );

}
const formStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    rowTime: { flexDirection: 'row', justifyContent: 'space-between' },
    containerInputTime: {
        width: '45%'
    },
    textInput: {
        fontSize: 18,
        marginVertical: 10,
    },
    input: {
        height: 50,
        borderColor: '#B5B4BC',
        borderWidth: 1,
        borderRadius: 15,
        padding: 8,
        fontSize: 21,
    },
    containerBtnSubmit: {
        marginVertical: 30
    },
    textError: {
        fontSize: 17,
        color: 'red',
        textAlign: 'center',
    },
    btnSubmit: {
        height: 65,
        backgroundColor: '#3F5EFB',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textSubmit: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold'
    }
});
export default FormInform;