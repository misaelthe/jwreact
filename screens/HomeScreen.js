import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import IconFeather from "react-native-vector-icons/Feather";
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

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

  const [wrapUpInform, setWrapUpInform] = useState([
    { horas: 0, minutos: 0, videos: 0, revisitas: 0, estudios: 0 },
  ]);
  const [currentDate, setCurrentDate] = useState(-1);
  const [currentDay, setCurrentDay] = useState(-1);
  const [currentMonth, setCurrentMonth] = useState(-1);
  const [currentYear, setCurrentYear] = useState(-1);
  const [buttonSelected, setButtonSelected] = useState(2);
  const refVariable = useRef(0);

  useFocusEffect(
    React.useCallback(() => {
      setMonthBar();
      loadWrapUpInform();
      return () => (refVariable.current = 0);
    })
  );
  /* Inicializes date params */
  const setMonthBar = () => {
    if (new Date().getDate() !== currentDate) {
      setCurrentDate(new Date().getDate());
    }
    if (new Date().getDay() !== currentDay) {
      setCurrentDay(new Date().getDay());
    }
    if (new Date().getMonth() !== currentMonth) {
      setCurrentMonth(new Date().getMonth());
    }
    if (new Date().getFullYear() !== currentYear) {
      setCurrentYear(new Date().getFullYear());
    }
  };

  const loadWrapUpInform = async () => {
    if (refVariable.current == 0) {
      /* new Date(2021, 0, 0).getDate() */
      let keyFmtdYearMonth =
        new Date().getFullYear() + "." + new Date().getMonth() + ".";
      let tHoras = 0;
      let tVideos = 0;
      let tRevisitas = 0;
      let tEstudios = 0;
      let tMinutos = 0;
      let booInform = -1;
      for (let i = 1; i <= new Date().getDate(); i++) {
        let keyFmtdYearMonthDay = keyFmtdYearMonth + i + ".";
        for (let j = 1; j < 20; j++) {
          console.log(keyFmtdYearMonthDay + j);
          let val = await AsyncStorage.getItem(keyFmtdYearMonthDay + j);
          if (val == null) {
            break;
          } else {
            tHoras += Number.parseInt(JSON.parse(val).horas, 10);
            tMinutos += Number.parseInt(JSON.parse(val).minutos, 10);
            tVideos += Number.parseInt(JSON.parse(val).videos, 10);
            tRevisitas += Number.parseInt(JSON.parse(val).revisitas, 10);
            tEstudios += Number.parseInt(JSON.parse(val).estudios, 10);
          }
        }
      }
      tHoras += Number.parseInt(tMinutos / 60);
      tMinutos = tMinutos % 60;
      booInform = wrapUpInform.map((el) => {
        console.log(el.horas + " " + tHoras);
        if (
          el.horas != tHoras ||
          el.minutos != tMinutos ||
          el.videos != tVideos ||
          el.revisitas != tRevisitas ||
          el.estudios != tEstudios
        )
          return -1;
        else {
          return 0;
        }
      });
      if (booInform == -1) {
        console.log("essssssto");
        setWrapUpInform([
          {
            horas: tHoras,
            minutos: tMinutos,
            videos: tVideos,
            revisitas: tRevisitas,
            estudios: tEstudios,
          },
        ]);
      }
      refVariable.current = -1;
    }
  };

  return (
    <SafeAreaView style={mainStyle.container}>
      <View style={mainStyle.wrapperHeader}>
        <View style={mainStyle.header}>
          <Text style={headerStyle.txtDay}>
            {daysOfWeek[currentDay]} {currentDate}
          </Text>
          <Text style={headerStyle.txtMonth}>
            de {monthsOfYear[currentMonth]} del {currentYear}
          </Text>
        </View>
      </View>
      <View style={mainStyle.main}>
        {/* begins month buttons */}
        <View style={mainStyle.row}>
          <View>
            <TouchableOpacity
              onPress={() => {
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
                style={{ color: buttonSelected === 0 ? "#ffffff" : "#7540EE" }}
              >
                {currentMonth == -1 ? null : monthsOfYear[currentMonth - 2]}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setButtonSelected(1);
              }}
              style={bodyStyle.btnMonth}
              style={[
                bodyStyle.btnMonth,
                {
                  backgroundColor: buttonSelected === 1 ? "#7540EE" : "#F0F0F6",
                },
              ]}
            >
              <Text
                style={{ color: buttonSelected === 1 ? "#ffffff" : "#7540EE" }}
              >
                {currentMonth == -1 ? null : monthsOfYear[currentMonth - 1]}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setButtonSelected(2);
              }}
              style={bodyStyle.btnMonth}
              style={[
                bodyStyle.btnMonth,
                {
                  backgroundColor: buttonSelected === 2 ? "#7540EE" : "#F0F0F6",
                },
              ]}
            >
              <Text
                style={{ color: buttonSelected === 2 ? "#ffffff" : "#7540EE" }}
              >
                {currentMonth == -1 ? null : monthsOfYear[currentMonth]}
              </Text>
            </TouchableOpacity>
          </View>
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
                  {wrapUpInform.map((el) => {
                    return el.horas;
                  })}
                  :
                  {wrapUpInform.map((el) => {
                    return el.minutos;
                  })}
                </Text>
              </View>
            </View>
            <View style={bodyStyle.elInform}>
              <View>
                <Entypo name="folder-video" size={40} />
              </View>
              <View>
                <Text style={bodyStyle.txtDescription}>
                  {wrapUpInform.map((el) => {
                    return el.videos;
                  })}
                </Text>
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
                    {wrapUpInform.map((el) => {
                      return el.revisitas;
                    })}
                  </Text>
                </View>
              </View>
              <View style={bodyStyle.elInform}>
                <View>
                  <IconSimpleLineIcons name="people" size={40} />
                </View>
                <View>
                  <Text style={bodyStyle.txtDescription}>
                    {wrapUpInform.map((el) => {
                      return el.estudios;
                    })}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* ends second row wrap-up inform */}
        {/* ends wrap-up inform */}
      </View>
    </SafeAreaView>
  );
};

const mainStyle = StyleSheet.create({
  container: { backgroundColor: "#7540EE", flex: 1 },
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
  row: { flexDirection: "row", justifyContent: "space-between",width:"100%" },
  rowHorizontal: {
    flexDirection: "colum",
    justifyContent: "space-between",
    alignItems: "center",
    width:"100%" 
  },
});
const headerStyle = StyleSheet.create({
  txtDay: { fontSize: 40, fontWeight: "bold", textAlign: "center" },
  txtMonth: { fontSize: 30, textAlign: "center" },
});
const bodyStyle = StyleSheet.create({
  btnMonth: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
  },
  viewWrapUp: { flex: 3, backgroundColor: "white", padding: 7 },
  elInform: {
    height: 150,
    width: "45%",
    borderColor: "#7540EE",
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
