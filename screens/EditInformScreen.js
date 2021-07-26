import React from "react";
import { View, Text, ScrollView } from "react-native";
import HeaderBar from "../components/HeaderBar";
import FormInform from "../components/FormInform";
import { SIZES } from "../constants/theme.js";
import { SafeAreaView } from "react-native-safe-area-context";

const EditInformScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <HeaderBar navigation={navigation} />
      <ScrollView style={{ padding: SIZES.min }}>
        <FormInform navigation={navigation} addInformBoolean={false} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default EditInformScreen;
