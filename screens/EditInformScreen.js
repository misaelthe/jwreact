import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import HeaderBar from "../components/HeaderBar";
import EditFormInform from "../components/EditFormInform";
const EditInformScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <HeaderBar navigation={navigation}/>
      </View>
      <View>
        <EditFormInform navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
};
export default EditInformScreen;
