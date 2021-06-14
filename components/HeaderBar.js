import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { COLORS, FONTS, SIZES, STRUCTURE } from "../constants/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
const HeaderBar = ({ navigation }) => {

  return (
    <View style={[STRUCTURE.contentCenteredV, { paddingHorizontal: 0, backgroundColor: COLORS.primary, height: SIZES.height / 12 }]}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Settings")}
      ><View>
          <View style={{flexDirection:"row",paddingHorizontal:10}}>
            <View style={[{ paddingHorizontal: 0 }]}>
              <AntDesign name="arrowleft" size={25} color={COLORS.white} />
            </View>
            <View style={[{ paddingHorizontal: 10 }]}>
              <Text style={[FONTS.subHeading2, { color: COLORS.white }]}>Back</Text>
            </View>
          </View></View>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBar;
