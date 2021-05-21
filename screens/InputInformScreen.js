import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useForm } from "react-hook-form";
import FomrInform from './FormInform';

const InputInformScreen = ({ navigation }) => {
    return (
        <View>
            <FomrInform navigation={navigation} />
        </View>
    );

}
export default InputInformScreen;