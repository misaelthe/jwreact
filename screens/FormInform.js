import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from "react-hook-form";
import { Formik } from 'formik';
import styles from '../styles/global.js';

/* FUNCTION */
import recorrerFunction from './recorrerFunction';

const FormInform = () => {
    const save = async(vals) => {
        const keyFormatted= new Date().getFullYear()+"."+new Date().getMonth()+"."+new Date().getDay()+".";
        let counter=1;
        
        for(;;counter++){
            let val = await AsyncStorage.getItem(keyFormatted+counter);
            if(val==null){break;}
        } 
        console.log("esta es mi va "+counter.toString());
        await AsyncStorage.setItem(keyFormatted+counter,JSON.stringify(vals));
    }

return (
    <Formik
        initialValues={{ horas: '', videos: '', revisitas: '', estudios: '' }}
        onSubmit={values => {
            console.log(values);
            save(values);
        }}>
        {(props) => (
            <View>
                <Text>Horas</Text>
                <TextInput
                    onChangeText={props.handleChange('horas')}
                    value={props.values.horas}
                    style={styles.input}
                    keyboardType='numeric'
                />
                <Text>Videos</Text>
                <TextInput
                    onChangeText={props.handleChange('videos')}
                    value={props.values.videos}
                    style={styles.input}
                    keyboardType='numeric'
                />
                <Text>Revisitas</Text>
                <TextInput
                    onChangeText={props.handleChange('revisitas')}
                    value={props.values.revisitas}
                    style={styles.input}
                    keyboardType='numeric'
                />
                <Text>Estudios</Text>
                <TextInput
                    onChangeText={props.handleChange('estudios')}
                    value={props.values.estudios}
                    style={styles.input}
                    keyboardType='numeric'
                />

                <Button onPress={props.handleSubmit} title="Submit" />
            </View>
        )}
    </Formik>
);

}
/* <Text style={formStyles.textHeader}>Hi, There</Text>
                <Text style={formStyles.textDescription}>Aqui puedes registrar tu informe (se acumulara cada vez que registres, so dont worry :)</Text>
            */
const formStyles = StyleSheet.create({
    textHeader: { textAlign: 'center', marginHorizontal: 15, fontSize: 27 },
    textDescription: { textAlign: 'center', marginHorizontal: 5, height: 30, fontSize: 15 },
    input: { borderWidth: 1, margin: 32, height: 64, borderRadius: 5, fontSize: 21 }
});
export default FormInform;