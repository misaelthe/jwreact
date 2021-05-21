import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from "react-hook-form";
import { Formik } from 'formik';
import styles from '../styles/global.js';

const FormInform = ({ navigation }) => {
    const save = async (vals) => {
        const keyFormatted = new Date().getFullYear() + "." + new Date().getMonth() + "." + new Date().getDate() + ".";
        let counter = 1;
        for (; ; counter++) {
            let val = await AsyncStorage.getItem(keyFormatted + counter);
            if (val == null) { break; }
        }
        if (vals.horas == 0) vals.horas = 0;
        if (vals.videos == 0) vals.videos = 0;
        if (vals.revisitas == 0) vals.revisitas = 0;
        if (vals.estudios == 0) vals.estudios = 0;
        await AsyncStorage.setItem(keyFormatted + counter, JSON.stringify(vals));
        navigation.navigate('Home');
    }

    return (
        <Formik
            initialValues={{ horas: "", videos: "", revisitas: "", estudios: "" }}
            onSubmit={async (values,{resetForm}) => {
                await save(values);
                resetForm();
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
                        style={styles.inputContainer}
                        keyboardType='numeric'
                    />
                    <Text>Estudios</Text>
                    <TextInput
                        onChangeText={props.handleChange('estudios')}
                        value={props.values.estudios}
                        style={styles.inputContainer}
                        keyboardType='numeric'
                    />

                    <Button  type="submit" onPress={props.handleSubmit} title="Submit" />
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
    input: {
        height: 40,
        width: 300,
        paddingHorizontal: 5,
        backgroundColor: 'white',
        marginBottom: 5,
    },
    inputContainer: {
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
});
export default FormInform;