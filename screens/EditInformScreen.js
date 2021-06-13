import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import HeaderBar from "../components/HeaderBar";
import EditFormInform from "../components/EditFormInform";
import { SIZES } from "../constants/theme.js";

const EditInformScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <HeaderBar navigation={navigation} />
      </View>
      <ScrollView style={{ padding: SIZES.min }}>
        <EditFormInform navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default EditInformScreen;
