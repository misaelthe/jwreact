import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#7540EE",
  secondary: "",
  tertiary: "#F0F0F6",
  white: "#FFFFFF",
  red: "#FF0000",
  gray:"#B5B4BC"
};
export const SIZES = {
  radius_max: 50,
  min: 10,
  width:width,
  height:height,
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
    borderRadius: 25,
    padding: SIZES.min,
  },
  contentCenteredVH: {
    justifyContent: "center",
    alignItems: "center",
  },
  contentCenteredH: {
    alignItems: "center",
  },
  contentCenteredV: {
    justifyContent: "center",
  },
  contentFlexStart:{justifyContent:"flex-start"},
  input: {
    height: 50,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: SIZES.min,
    padding: SIZES.min,
    fontSize: 21,
  },
};
const appTheme = { COLORS, SIZES, FONTS, STRUCTURE };

export default appTheme;
