import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import FormInform from "./FormInform";
import { SafeAreaView } from "react-native-safe-area-context";

const InformScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={informStyle.container}>
          <View style={informStyle.containerTitle}>
            <Text style={informStyle.title}>Aqui registras</Text>
            <Text style={informStyle.title}>tu informe.</Text>
            <Text style={informStyle.subtitle}>
              Recuerda que cada minuto cuenta.
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={[{ flex: 1 }, informStyle.btnDelete]}
              onPress={() => {
                navigation.navigate('EditInformScreen')
              }}
            >
              <Text style={informStyle.textSubmit}>Eliminar</Text>
            </TouchableOpacity>
          </View>
          <FormInform navigation={navigation} />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const informStyle = StyleSheet.create({
  container: { padding: 20 },
  containerTitle: { marginVertical: 20 },
  title: { fontSize: 32, fontWeight: "bold" },
  subtitle: { fontSize: 17, color: "gray", marginVertical: 5 },
  btnDelete:{
    height: 65,
    backgroundColor: "#F7102C",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  textSubmit: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
export default InformScreen;
