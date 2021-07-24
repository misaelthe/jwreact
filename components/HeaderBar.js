import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { COLORS, FONTS, SIZES, STRUCTURE } from "../constants/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
const HeaderBar = ({ navigation }) => {
  return (
    <View
      style={[
        {
          backgroundColor: COLORS.primary,
          flexDirection: "row",
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Settings")}
        style={{ alignSelf: "stretch" }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign
            name="arrowleft"
            size={30}
            color={COLORS.white}
            style={{
              margin: 15,
            }}
          />

          <Text
            style={[
              {
                color: COLORS.white,
                fontSize: SIZES.mn6,
                fontWeight: "bold",
                margin: 15,
              },
            ]}
          >
            Back
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBar;
