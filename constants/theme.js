import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#7540EE",
  secondary: "",
  tertiary: "#F0F0F6",
  white: "#FFFFFF",
  red: "#FF0000",
};
export const SIZES = {
  radius: 15,
  radius_max: 50,
  min: 15,
  width,
  height,
};
export const FONTS = {
  subHeading: {
    fontSize: 25,
    fontWeight: "bold",
  },
  subHeading2: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 17,
    color: "black",
  },
};
export const STRUCTURE = {
  rowVertical: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex:1
  },
  rowHorizontal: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex:1
  },
  viewRounded: {
    borderRadius: SIZES.radius,
    padding: SIZES.min,
  },
  contentCenteredVH: {
    justifyContent: "center",
    alignItems: "center",
  },
};
const appTheme = { COLORS, SIZES, FONTS, STRUCTURE };

export default appTheme;
