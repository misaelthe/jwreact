import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES, FONTS, STRUCTURE } from "../constants/theme.js";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const EditFormInform = ({ navigation }) => {
  const [validated, setValidated] = useState(0);
  const nameRegex = new RegExp(/^[1-9]+$/i);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [horas, setHoras] = useState("");
  const [minutos, setMinutos] = useState("");
  const [videos, setVideos] = useState("");
  const [revisitas, setRevisitas] = useState("");
  const [estudios, setEstudios] = useState("");
  const [errorForm, setErrorForm] = useState("");
  const originalHoras = useRef(null);
  const originalMinutos = useRef(null);
  const originalVideos = useRef(null);
  const originalRevisitas = useRef(null);
  const originalEstudios = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      loadValues();
    }, [])
  );

  const loadValues = async () => {
    let keyFormatted = currentYear + "." + currentMonth;
    let val = await AsyncStorage.getItem(keyFormatted);
    if (val != null) {
      let tTiempo = JSON.parse(val).tiempo.split(":");
      originalHoras.current = tTiempo[0];
      originalMinutos.current = tTiempo[1];
      originalVideos.current = Number.parseInt(JSON.parse(val).videos, 10);
      originalRevisitas.current = Number.parseInt(JSON.parse(val).revisitas, 10);
      originalEstudios.current = Number.parseInt(JSON.parse(val).estudios, 10);
    } else {
      originalHoras.current = 0;
      originalMinutos.current = 0;
      originalVideos.current = 0;
      originalRevisitas.current = 0;
      originalEstudios.current = 0;
    }
    setHoras(originalHoras.current);
    setMinutos(originalMinutos.current);
    setVideos(originalVideos.current);
    setRevisitas(originalRevisitas.current);
    setEstudios(originalEstudios.current);
  }
  const editInform = async () => {
    const keyFormatted = new Date().getFullYear() + "." + new Date().getMonth();
    const newObj = {
      tiempo: horas + " : " + minutos,
      videos: videos,
      revisitas: revisitas,
      estudios: estudios,
    };
    await AsyncStorage.setItem(keyFormatted, JSON.stringify(newObj));
  };
  const validate = async () => {
    console.log(horas + " " + minutos + " " + videos);
    let daysSoFar = new Date().getDate();
    let temHoras = Number.parseInt(horas === "" ? 0 : horas);
    let temMinutos = Number.parseInt(minutos === "" ? 0 : minutos);
    let temVideos = Number.parseInt(videos === "" ? 0 : videos);
    let temRevisitas = Number.parseInt(revisitas === "" ? 0 : revisitas);
    let temEstudios = Number.parseInt(estudios === "" ? 0 : estudios);
    console.log(temHoras + " y las oras " + daysSoFar + "revi " + temRevisitas);
    if (temHoras > daysSoFar * 24) {
      setValidated(-1);
      setErrorForm("Las horas no pueden ser mayores a " + daysSoFar);
    } else if (temMinutos > 59) {
      setValidated(-1);
      setErrorForm("Los minutos no pueden ser mayores a 59");
    } else if (
      temHoras == 0 &&
      temMinutos == 0 &&
      (temRevisitas != 0 || temEstudios != 0)
    ) {
      let littleText = "";
      if (temRevisitas !== "" && temEstudios !== "")
        littleText = "revisitas y estudios";
      else if (temRevisitas !== "") littleText = "revisitas";
      else littleText = "estudios";
      setValidated(-1);
      setErrorForm(
        "No puedes informar " + littleText + " si no informas tiempo"
      );
    } else if (
      temHoras == 0 &&
      temMinutos == 0 &&
      temVideos == 0 &&
      temRevisitas == 0 &&
      temEstudios == 0
    ) {
      setValidated(-1);
      setErrorForm("No puedes enviar un informe vacio");
    } else {
      const myObj = {
        horas: temHoras,
        minutos: temMinutos,
        videos: temVideos,
        revisitas: temRevisitas,
        estudios: temEstudios,
      };
      registerInform(myObj);
      setValidated(0);
      setHoras("");
      setMinutos("");
      setVideos("");
      setRevisitas("");
      setEstudios("");
      navigation.navigate("Home");
    }
  };
  const clearForm = () => {
    setHoras("");
    setMinutos("");
    setVideos("");
    setRevisitas("");
    setEstudios("");
  };
  return (
    <View style={{flex:1}}>
      <View style={[STRUCTURE.rowHorizontal, { marginVertical: 10 }]}>
        <View style={STRUCTURE.rowVertical}>
          <View style={[STRUCTURE.rowHorizontal, { marginHorizontal: 10}]}>
            <Text style={FONTS.subHeading2}>Horas</Text>
            <TextInput
              style={STRUCTURE.input}
              keyboardType="numeric"
              value={horas}
              onChangeText={(txt) => {
                setHoras(txt.trim());
              }}
            />
          </View>
          <View style={[STRUCTURE.rowHorizontal, { marginHorizontal: 10 }]}>
            <Text style={FONTS.subHeading2}>Minutos</Text>
            <TextInput
              style={formStyles.input}
              keyboardType="numeric"
              value={minutos}
              onChangeText={(txt) => setMinutos(txt)}
            />
          </View>
        </View>
      </View>

      <View style={STRUCTURE.rowHorizontal, { margin: 10 }}>
        <Text style={FONTS.subHeading2}>Videos</Text>
        <TextInput
          style={formStyles.input}
          keyboardType="numeric"
          value={videos}
          onChangeText={(txt) => setVideos(txt)}
        />
      </View>

      <View style={STRUCTURE.rowHorizontal, { margin: 10 }}>
        <Text style={FONTS.subHeading2}>Revisitas</Text>
        <TextInput
          style={formStyles.input}
          keyboardType="numeric"
          value={revisitas}
          onChangeText={(txt) => setRevisitas(txt)}
        />
      </View>

      <View style={STRUCTURE.rowHorizontal, { margin: 10 }}>
        <Text style={FONTS.subHeading2}>Estudios</Text>
        <TextInput
          style={formStyles.input}
          keyboardType="numeric"
          value={estudios}
          onChangeText={(txt) => setEstudios(txt)}
        />
      </View>
      <View style={STRUCTURE.rowHorizontal}>
        {validated == -1 ? (
          <Text style={formStyles.textError}>{errorForm}</Text>
        ) : null}
      </View>
      <View style={[STRUCTURE.rowHorizontal,{margin:10}]}>
        <View style={[STRUCTURE.rowVertical]}>
          <TouchableOpacity
            style={[{ flex: 5 }, formStyles.btnClasic,{backgroundColor:COLORS.red}]}
            onPress={() => {
              validate();
            }}
          >
            <Text style={formStyles.textSubmit}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[{ flex: 1 }, formStyles.btnClasic]}
            onPress={() => {
              clearForm();
            }}
          >
            <FontAwesome name="undo" size={35} color="#ffffff" />
          </TouchableOpacity></View>
      </View>
    </View >
  );
};
const formStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  textInput: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    height: 50,
    borderColor: "#B5B4BC",
    borderWidth: 1,
    borderRadius: 15,
    padding: 8,
    fontSize: 21,
  },
  textError: {
    fontSize: 17,
    color: "red",
    textAlign: "center",
  },
  btnClasic: {
    height: 65,
    backgroundColor: "#3F5EFB",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },

  textSubmit: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
export default EditFormInform;
