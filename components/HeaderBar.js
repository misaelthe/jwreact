import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { COLORS, FONTS, SIZES, STRUCTURE } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import IconFeather from "react-native-vector-icons/Feather";
const HeaderBar = ({navigation}) => {
  /* const navigation=useNavigation(); */

  return (
    <View style={{ padding: SIZES.min, backgroundColor: COLORS.primary }}>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <View>
          <IconFeather name="clock" size={40} />
        </View>
        <View>
          <Text>Back</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBar;
