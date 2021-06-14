import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "react-native-vector-icons/Entypo";
import Foundation from "react-native-vector-icons/Foundation";
import { COLORS, SIZES, FONTS, STRUCTURE } from "../constants/theme.js";

const SettingsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.tertiary, flex: 1 }}>
        {/* BEGINS RULES SECTION */}
        <View style={{ padding: 15 }}>
          <View style={{ paddingVertical: 10 }}>
            <Text style={FONTS.subHeading}>Reglas del Aplicativo</Text>
          </View>
          <View
            style={[
              STRUCTURE.viewRounded,
              {
                backgroundColor: COLORS.white, paddingVertical: 10
              }]}
          >
            <View
              style={[
                {
                  paddingHorizontal: SIZES.min,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.tertiary,
                },
              ]}
            >
              <Text style={FONTS.subHeading2}>Almacenamiento de Informes</Text>
              <Text style={FONTS.text}>
                Informes de 3 meses atras seran eliminados de forma permanente,
                keep that in mind.
                </Text>
            </View>
          </View>
        </View>
        {/*BEGINS DANGER ZONE SECTION*/}
        <View style={{ padding: 15 }}>
          <View style={{ paddingVertical: 10 }}>
            <Text style={[FONTS.subHeading, { color: COLORS.red }]}>
              Danger Zone
            </Text>
          </View>
          <View
            style={[
              STRUCTURE.viewRounded,
              {
                backgroundColor: COLORS.white,
                paddingVertical: 10,
                borderColor: COLORS.red,
                borderWidth: 1,
              },
            ]}
          >
            <View
              style={
                [{
                  padding: SIZES.min,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.red,
                  flexDirection: "row",
                  flex: 0,
                }]
              }
            >
              <Text style={[FONTS.text, { color: COLORS.red, flex: 4, textAlignVertical: "center" }]}>
                Wipe Data? There's no turning back
                </Text>
              <TouchableOpacity
                style={[styleSettings.btnDelete, STRUCTURE.contentCenteredVH, { flex: 1 }]}
                onPress={async () => {
                  AsyncStorage.clear();
                }}
              ><Entypo name="trash" size={33} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <View style={
              {
                padding: SIZES.min,
                flexDirection: "row",
                flex: 0,
              }
            }>
              <Text style={[FONTS.text, { color: COLORS.red, flex: 4, textAlign: "center", textAlignVertical: "center" }]}>
                Edit your inform
              </Text>
              <TouchableOpacity
                style={[styleSettings.btnDelete, STRUCTURE.contentCenteredVH, { flex: 1 }]}
                onPress={async () => {
                  navigation.navigate("EditInformScreen", { navigation: navigation });
                }}
              >
                <Foundation name="clipboard-pencil" size={33} color="#ffffff" />
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styleSettings = StyleSheet.create({
  btnDelete: {
    height: 55,
    backgroundColor: "#F7102C",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

});
export default SettingsScreen;
