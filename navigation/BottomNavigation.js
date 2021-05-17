import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import SettingsScreen from '../screens/SettingsScreen';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

function Tabs() {
    return ( <
        Tab.Navigator activeColor = "#e91e63"
        style = {
            { backgroundColor: "tomato", height: 50, borderRadius: 25 }
        }
        screenOptions = {
            ({ route }) => ({

                tabBarIcon: ({ focused, color, size, padding }) => {
                    let iconName, iconColor;
                    if (focused == true) {
                        iconColor = focused ? "white" : "black";
                    }
                    if (route.name === "Home") {
                        iconName = "home";
                    } else if (route.name === "Calendar") {
                        iconName = "calendar";
                    } else {
                        iconName = "setting";
                    }
                    return ( <
                        View style = {
                            { width: 30 }
                        } > < IconAntDesign name = { iconName }
                        size = { 30 }
                        color = { iconColor }
                        /></View >
                    )
                }
            })
        }
        tab >
        <
        Tab.Screen name = "Home"
        component = { HomeScreen }
        options = {
            { title: "" }
        }
        /> <
        Tab.Screen name = "Calendar"
        component = { CalendarScreen }
        options = {
            { title: "" }
        }
        /> <
        Tab.Screen name = "Settings"
        component = { SettingsScreen }
        options = {
            { title: "" }
        }
        /> < /
        Tab.Navigator >
    );
}
const navigatorStyle = StyleSheet.create({

})
export default Tabs