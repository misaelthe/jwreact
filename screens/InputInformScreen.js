import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useForm } from "react-hook-form";
import FomrInform from './FormInform';

export default class InputInformScreen extends Component {
    
    render() {
        return (
            <View>
                <FomrInform/>
            </View>
        );
    }
}