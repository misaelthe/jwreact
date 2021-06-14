import React from "react";
import { View, Text, ScrollView } from "react-native";
import HeaderBar from "../components/HeaderBar";
import EditFormInform from "../components/EditFormInform";
import { SIZES } from "../constants/theme.js";
import { SafeAreaView } from "react-native-safe-area-context";
const EditInformScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <HeaderBar navigation={navigation} />
      <ScrollView style={{ padding: SIZES.min }}>
        <EditFormInform navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default EditInformScreen;
