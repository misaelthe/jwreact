import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, FONTS, STRUCTURE } from "../constants/theme.js";

const SettingsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.tertiary }}>
      {/* BEGINS RULES SECTION */}
      <View style={[STRUCTURE.rowHorizontal, { padding: SIZES.min }]}>
        <Text style={FONTS.subHeading}>Reglas del Aplicativo</Text>
      </View>
      <View
        style={[
          STRUCTURE.rowHorizontal,
          STRUCTURE.viewRounded,
          {
            backgroundColor: COLORS.white,
            marginHorizontal: SIZES.min,
            margin: SIZES.min,
          },
        ]}
      >
        <View
          style={[
            STRUCTURE.rowHorizontal,
            {
              padding: SIZES.min,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.tertiary,
            },
          ]}
        >
          <View style={STRUCTURE.rowHorizontal}>
            <Text style={FONTS.subHeading2}>Almacenamiento de Informes</Text>
          </View>
          <View style={STRUCTURE.rowHorizontal}>
            <Text style={FONTS.text}>
              Informes de 3 meses atras seran eliminados de forma permanente,
              keep that in mind.
            </Text>
          </View>
        </View>
        <View
          style={[
            STRUCTURE.rowHorizontal,
            {
              padding: SIZES.min,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.tertiary,
            },
          ]}
        >
          <View style={STRUCTURE.rowHorizontal}>
            <Text style={FONTS.subHeading2}>
              Almacenamiento de los informes de los ultimos 3 meses
            </Text>
          </View>
          <View style={STRUCTURE.rowHorizontal}>
            <Text style={FONTS.text}>
              Informes de 3 meses atras seran eliminados de forma permanente,
              keep that in mind.
            </Text>
          </View>
        </View>
        <View style={[STRUCTURE.rowHorizontal, { padding: SIZES.min }]}>
          <View style={STRUCTURE.rowHorizontal}>
            <Text style={FONTS.subHeading2}>
              Almacenamiento de los informes de los ultimos 3 meses
            </Text>
          </View>
          <View style={STRUCTURE.rowHorizontal}>
            <Text style={FONTS.text}>
              Informes de 3 meses atras seran eliminados de forma permanente,
              keep that in mind.
            </Text>
          </View>
        </View>
      </View>
      {/*BEGINS DANGER ZONE SECTION*/}
      <View style={[STRUCTURE.rowHorizontal, { padding: SIZES.min }]}>
        <Text style={[FONTS.subHeading, { color: COLORS.red }]}>
          Danger Zone
        </Text>
      </View>
      <View
        style={[
          STRUCTURE.rowHorizontal,
          STRUCTURE.viewRounded,
          {
            backgroundColor: COLORS.white,
            marginHorizontal: SIZES.min,
            borderColor: COLORS.red,
            borderWidth: 1,
            margin: SIZES.min,
          },
        ]}
      >
        <View
          style={[
            STRUCTURE.rowVertical,
            {
              padding: SIZES.min,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.red,
            },
          ]}
        >
          <View style={[STRUCTURE.contentCenteredVH, { flex: 3 }]}>
            <Text style={[FONTS.subHeading2, { color: COLORS.red }]}>
              Seguro que quieres eliminar every inform? There's no turning back
            </Text>
          </View>
          <View style={{ flex:2 }}>
            <TouchableOpacity
              style={[styleSettings.btnDelete, STRUCTURE.contentCenteredVH]}
              onPress={async () => {
                AsyncStorage.clear();
              }}
            >
              <Text style={[FONTS.subHeading2, { color: COLORS.white }]}>
                Wipe Data
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[STRUCTURE.rowVertical, { padding: SIZES.min }]}>
          <View style={[STRUCTURE.contentCenteredVH, { flex: 3 }]}>
            <Text style={[FONTS.subHeading2, { color: COLORS.red }]}>
              A punto de modificar your inform
            </Text>
          </View>
          <View style={{ flex: 2 }}>
            <TouchableOpacity
              style={[styleSettings.btnDelete, STRUCTURE.contentCenteredVH]}
              onPress={async () => {
                navigation.navigate("EditInformScreen",{navigation:navigation});
              }}
            >
              <Text style={[FONTS.subHeading2, { color: COLORS.white }]}>
                Edit Inform
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={STRUCTURE.rowVertical}></View>
    </SafeAreaView>
  );
};
const styleSettings = StyleSheet.create({
  btnDelete: {
    height: 65,
    backgroundColor: "#F7102C",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },

});
export default SettingsScreen;
