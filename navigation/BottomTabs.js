import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native';
import * as React from 'react';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import SettingsScreen from '../screens/SettingsScreen';
import InputInformScreen from '../screens/InputInformScreen';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
    return ( <Tab.Navigator tabBarOptions={{showLabel:false,
    style:{
        elevation:0,
        backgroundColor:'#ffffff',
        borderRadius:15,
        height:45
    }}}>
        <Tab.Screen name = "Home" component = { HomeScreen } options={{
            tabBarIcon:({focused})=>(
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../assets/icons/home.png')} resizeMode='contain' style={{width:25,height:25,tintColor:focused? '#e32f54':'#e32f45'}}></Image>
                    <Text style={{tintColor:focused? '#e32f54':'#e32f45'}}>Home</Text>
                </View>
            )
        }}/>
        <Tab.Screen name = "Fill"
        component = { InputInformScreen } options={{
            tabBarIcon:({focused})=>(
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../assets/icons/pencil.png')} resizeMode='contain' style={{width:25,height:25,tintColor:focused? '#e32f54':'#e32f45'}}></Image>
                    <Text style={{tintColor:focused? '#e32f54':'#e32f45'}}>Fill</Text>
                </View>
            )}}/> 
         <Tab.Screen name = "Calendar"
        component = { CalendarScreen } options={{
            tabBarIcon:({focused})=>(
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../assets/icons/schedule.png')} resizeMode='contain' style={{width:25,height:25,tintColor:focused? '#e32f54':'#e32f45'}}></Image>
                    <Text style={{tintColor:focused? '#e32f54':'#e32f45'}}>Calendar</Text>
                </View>
            )}}/>
         <Tab.Screen name = "Settings"
        component = { SettingsScreen } options={{
            tabBarIcon:({focused})=>(
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../assets/icons/settings.png')} resizeMode='contain' style={{width:25,height:25,tintColor:focused? '#e32f54':'#e32f45'}}></Image>
                    <Text style={{tintColor:focused? '#e32f54':'#e32f45'}}>Settings</Text>
                </View>
            )}}/> 

        </Tab.Navigator>
    )
};

export default MyTabs;