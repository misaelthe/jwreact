import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { COLORS, FONTS, SIZES, STRUCTURE } from "../constants/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
const HeaderBar = ({ navigation }) => {
  /* const navigation=useNavigation(); */

  return (
    <View style={{ padding: SIZES.min, backgroundColor: COLORS.primary }}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          flex: 1,
        }}
        onPress={() => navigation.navigate("Settings")}
      >
        <View style={[STRUCTURE.contentCenteredVH,{paddingHorizontal:SIZES.min}]}>
          <AntDesign name="arrowleft" size={25} color={COLORS.white}/>
        </View>
        <View style={{paddingHorizontal:0}}>
          <Text style={[FONTS.subHeading2,STRUCTURE.contentCenteredVH, { color: COLORS.white }]}>Back</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBar;
