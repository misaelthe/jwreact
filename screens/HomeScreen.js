import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import IconFeather from "react-native-vector-icons/Feather";
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, FONTS, STRUCTURE } from "../constants/theme.js";

import { getterInform } from "../util/UtilInform";
const HomeScreen = ({ navigation }) => {
  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];
  const monthsOfYear = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
  ];

  const [currentHours, setCurrentHours] = useState("0");
  const [currentMinutes, setCurrentMinutes] = useState("0");
  const [currentVideos, setCurrentVideos] = useState("0");
  const [currentReturnVisits, setCurrentReturnVisits] = useState("0");
  const [currentStudies, setCurrentStudies] = useState("0");
  const [currentDate, setCurrentDate] = useState(new Date().getDate());
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [buttonSelected, setButtonSelected] = useState(2);

  useFocusEffect(
    React.useCallback(() => {
      loadWrapUpInform();
    })
  );
  const loadWrapUpInform = async () => {
    console.log("messss" + currentMonth);
    const result = await getterInform(currentMonth, currentYear);
    if (
      currentHours != result.hours ||
      currentMinutes != result.minutes ||
      currentVideos != result.videos ||
      currentReturnVisits != result.returnVisits ||
      currentStudies != result.studies
    ) {
      setCurrentHours(result.hours);
      setCurrentMinutes(result.minutes);
      setCurrentVideos(result.videos);
      setCurrentReturnVisits(result.returnVisits);
      setCurrentStudies(result.studies);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <View style={{ flex: 1 }}>
        <View style={mainStyle.wrapperHeader}>
          <View style={mainStyle.header}>
            <Text style={headerStyle.txtDay}>
              {monthsOfYear[currentMonth]} del {currentYear}
            </Text>
            <Text style={headerStyle.txtMonth}>
              {buttonSelected != 2
                ? null
                : daysOfWeek[currentDay] + " " + currentDate}
            </Text>
          </View>
        </View>
        <View style={mainStyle.main}>
          {/* begins month buttons */}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                const xmonth = currentMonth - 2;
                if (xmonth === -1) {
                  setCurrentYear(new Date().getFullYear() - 1);
                  setCurrentMonth(11);
                } else if (xmonth === -2) {
                  setCurrentYear(new Date().getFullYear() - 1);
                  setCurrentMonth(10);
                } else {
                  setCurrentYear(new Date().getFullYear());
                  setCurrentMonth(new Date().getMonth() - 2);
                }
                loadWrapUpInform();
                setButtonSelected(0);
              }}
              style={[
                bodyStyle.btnMonth,
                {
                  backgroundColor: buttonSelected === 0 ? "#7540EE" : "#F0F0F6",
                },
              ]}
            >
              <Text
                style={{
                  color: buttonSelected === 0 ? "#ffffff" : "#7540EE",
                  fontSize: 19,
                }}
              >
                {monthsOfYear[new Date().getMonth() - 2]}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                const xmonth = currentMonth - 1;
                if (xmonth == -1) {
                  setCurrentYear(new Date().getFullYear() - 1);
                } else {
                  setCurrentYear(new Date().getFullYear());
                }
                setCurrentMonth(new Date().getMonth() - 1);
                loadWrapUpInform();
                setButtonSelected(1);
              }}
              style={[
                bodyStyle.btnMonth,
                {
                  backgroundColor: buttonSelected === 1 ? "#7540EE" : "#F0F0F6",
                },
              ]}
            >
              <Text
                style={{
                  color: buttonSelected === 1 ? "#ffffff" : "#7540EE",
                  fontSize: 19,
                }}
              >
                {monthsOfYear[new Date().getMonth() - 1]}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setCurrentYear(new Date().getFullYear());
                setCurrentMonth(new Date().getMonth());
                loadWrapUpInform();
                setButtonSelected(2);
              }}
              style={[
                bodyStyle.btnMonth,
                {
                  backgroundColor: buttonSelected === 2 ? "#7540EE" : "#F0F0F6",
                },
              ]}
            >
              <Text
                style={{
                  color: buttonSelected === 2 ? "#ffffff" : "#7540EE",
                  fontSize: 19,
                }}
              >
                {monthsOfYear[new Date().getMonth()]}
              </Text>
            </TouchableOpacity>
          </View>
          {/* begins wrap-up inform */}
          <View style={mainStyle.rowHorizontal}>
            {/* begins first row wrap-up inform */}
            <View style={mainStyle.row}>
              <View style={bodyStyle.elInform}>
                <View style={{ justifyContent: "center" }}>
                  <IconFeather name="clock" size={40} />
                </View>
                <View>
                  <Text style={bodyStyle.txtDescription}>
                    {currentHours + " : " + currentMinutes}
                  </Text>
                </View>
              </View>
              <View style={bodyStyle.elInform}>
                <View>
                  <Entypo name="folder-video" size={40} />
                </View>
                <View>
                  <Text style={bodyStyle.txtDescription}>{currentVideos}</Text>
                </View>
              </View>
            </View>
            {/* ends first row wrap-up inform */}
            {/* begins second row wrap-up inform */}
            <View style={mainStyle.row}>
              <View style={mainStyle.row}>
                <View style={bodyStyle.elInform}>
                  <View>
                    <IconSimpleLineIcons name="user" size={40} />
                  </View>
                  <View>
                    <Text style={bodyStyle.txtDescription}>
                      {currentReturnVisits}
                    </Text>
                  </View>
                </View>
                <View style={bodyStyle.elInform}>
                  <View>
                    <IconSimpleLineIcons name="people" size={40} />
                  </View>
                  <View>
                    <Text style={bodyStyle.txtDescription}>
                      {currentStudies}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* ends second row wrap-up inform */}
          {/* ends wrap-up inform */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const mainStyle = StyleSheet.create({
  wrapperHeader: { flex: 2, backgroundColor: "#F0F0F6" },
  header: {
    borderBottomRightRadius: 50,
    flex: 1,
    backgroundColor: "#7540EE",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    backgroundColor: "#F0F0F6",
    flex: 5,
    borderTopLeftRadius: 50,
    padding: 15,
    flexDirection: "column",
  },
  row: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  rowHorizontal: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
const headerStyle = StyleSheet.create({
  txtDay: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  txtMonth: { fontSize: 30, textAlign: "center", color: "white" },
});
const bodyStyle = StyleSheet.create({
  btnMonth: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 20,
    marginVertical: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 20,
  },
  viewWrapUp: { flex: 3, backgroundColor: "white", padding: 7 },
  elInform: {
    height: 150,
    width: "45%",
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  viewTitle: { flexDirection: "row", alignItems: "center" },
  txtTitle: { fontSize: 30, marginLeft: 7 },
  txtDescription: { fontSize: 25 },
});

export default HomeScreen;
