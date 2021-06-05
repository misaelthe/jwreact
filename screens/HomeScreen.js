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
    { tiempo: "0 : 0", videos: 0, revisitas: 0, estudios: 0 },
  ]);
  const [currentTiempo, setCurrentTiempo] = useState("0 : 0");
  const [currentVideos, setCurrentVideos] = useState(0);
  const [currentRevisitas, setCurrentRevisitas] = useState(0);
  const [currentEstudios, setCurrentEstudios] = useState(0);
  const [currentDate, setCurrentDate] = useState(-1);
  const [currentDay, setCurrentDay] = useState(-1);
  const [currentMonth, setCurrentMonth] = useState(-1);
  const [currentYear, setCurrentYear] = useState(-1);
  const [buttonSelected, setButtonSelected] = useState(2);
  const refVariable = useRef(0);

  useFocusEffect(
    React.useCallback(() => {
      console.log("en le use focus");
      setMonthBar();
      loadWrapUpInform(currentYear, currentMonth);
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
  const loadWrapUpInformByMonth = async (year, month) => {
    let keyFormatted = year + "." + month;
    let val = await AsyncStorage.getItem(keyFormatted);
    if (val != null) {console.log("esto en el bymonth"+month);
      let tTiempo = JSON.parse(val).tiempo;
      let tVideos = Number.parseInt(JSON.parse(val).videos, 10);
      let tRevisitas = Number.parseInt(JSON.parse(val).revisitas, 10);
      let tEstudios = Number.parseInt(JSON.parse(val).estudios, 10);

      setCurrentTiempo(tTiempo);
          setCurrentVideos(tVideos);
          setCurrentRevisitas(tRevisitas);
          setCurrentEstudios(tEstudios);
    }
    else{
      setCurrentTiempo("0 : 0");
        setCurrentVideos(0);
        setCurrentRevisitas(0);
        setCurrentEstudios(0);
    }
  };
  const loadWrapUpInform = async (year, month) => {console.log(" antes del en el primer if " + month+" refvar"+refVariable.current );
    if (refVariable.current == 0) {
      refVariable.current = -1;
      console.log(" entra en el primer if " + month+" refvar"+refVariable.current );
      let keyFormatted = year + "." + month;
      let val = await AsyncStorage.getItem(keyFormatted);
      if (val != null) {
        let tTiempo = JSON.parse(val).tiempo;
        let tVideos = Number.parseInt(JSON.parse(val).videos, 10);
        let tRevisitas = Number.parseInt(JSON.parse(val).revisitas, 10);
        let tEstudios = Number.parseInt(JSON.parse(val).estudios, 10);
        console.log(
          "antes del boo " +
            tTiempo +
            " " +
            tVideos +
            " " +
            tRevisitas +
            " " +
            tEstudios
        );
        if (
          currentTiempo !== tTiempo ||
          currentVideos != tVideos ||
          currentRevisitas != tRevisitas ||
          currentEstudios != tEstudios
        ) {
          setCurrentTiempo(tTiempo);
          setCurrentVideos(tVideos);
          setCurrentRevisitas(tRevisitas);
          setCurrentEstudios(tEstudios);
        }
      } else {
        setCurrentTiempo("0 : 0");
        setCurrentVideos(0);
        setCurrentRevisitas(0);
        setCurrentEstudios(0);
      }
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
                const xmonth = currentMonth - 2;
                if (xmonth === -1) {
                  loadWrapUpInformByMonth(currentYear - 1, 11);
                } else if (xmonth === -2) {
                  loadWrapUpInformByMonth(currentYear - 1, 10);
                } else {
                  loadWrapUpInformByMonth(currentYear, currentMonth - 2);
                }
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
                {monthsOfYear[currentMonth - 2]}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                console.log("entor a la consola del segbd buton");
                const xmonth = currentMonth - 1;
                if (xmonth == -1) {
                  loadWrapUpInformByMonth(currentYear - 1, 11);
                } else {
                  loadWrapUpInformByMonth(currentYear, currentMonth - 1);
                  console.log("me imriem sta cosa f"+currentMonth);
                }
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
                {monthsOfYear[currentMonth - 1]}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                console.log("entor a la consola del buton");
                loadWrapUpInformByMonth(currentYear, currentMonth);
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
                {monthsOfYear[currentMonth]}
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
                <Text style={bodyStyle.txtDescription}>{currentTiempo}</Text>
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
                    {currentRevisitas}
                  </Text>
                </View>
              </View>
              <View style={bodyStyle.elInform}>
                <View>
                  <IconSimpleLineIcons name="people" size={40} />
                </View>
                <View>
                  <Text style={bodyStyle.txtDescription}>
                    {currentEstudios}
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
  row: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  rowHorizontal: {
    flexDirection: "colum",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
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
