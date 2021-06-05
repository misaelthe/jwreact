import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#7540EE",
  secondary: "",
  background: "#F0F0F6",
};
export const SIZES = {
  radius: 15,
  radius_max: 50,
  width,
  height,
};
export const FONTS = {};
export const STRUCTURE={
    rowHorizontal:{
        flexDirection: "row", justifyContent: "space-between", width: "100%" 
    }
};
const appTheme = { COLORS, SIZES, FONTS,STRUCTURE };

export default appTheme;
