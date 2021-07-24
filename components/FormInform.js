import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "react-native-vector-icons/Entypo";

const FormInform = ({ navigation }) => {
  const [validated, setValidated] = useState(0);
  const [horas, setHoras] = useState("");
  const [minutos, setMinutos] = useState("");
  const [videos, setVideos] = useState("");
  const [revisitas, setRevisitas] = useState("");
  const [estudios, setEstudios] = useState("");
  const [errorForm, setErrorForm] = useState("");
  const nameRegex = new RegExp(/^[1-9]+$/i);

  const registerInform = async (obj) => {
    const keyFormatted = new Date().getFullYear() + "." + new Date().getMonth();
    const val = await AsyncStorage.getItem(keyFormatted);
    if (val == null) {
      const newObj = {
        tiempo: obj.horas + " : " + obj.minutos,
        videos: obj.videos,
        revisitas: obj.revisitas,
        estudios: obj.estudios,
      };
      await AsyncStorage.setItem(keyFormatted, JSON.stringify(newObj));
    } else {
      const tTiempo = JSON.parse(val).tiempo.split(":");
      const tHoras = Number.parseInt(tTiempo[0], 10);
      const tMinutos = Number.parseInt(tTiempo[1], 10);
      const tVideos = Number.parseInt(JSON.parse(val).videos, 10);
      const tRevisitas = Number.parseInt(JSON.parse(val).revisitas, 10);
      const tEstudios = Number.parseInt(JSON.parse(val).estudios, 10);

      const newObj = {
        hours: tHoras + obj.horas,
        minutes: tMinutos + obj.minutos,
        videos: tVideos + obj.videos,
        returnVisits: tRevisitas + obj.revisitas,
        studies: tEstudios + obj.estudios,
      };
      await AsyncStorage.setItem(keyFormatted, JSON.stringify(newObj));
    }
  };
  const validate = async () => {
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
    <View style={formStyles.container}>
      <View style={formStyles.row}>
        <View style={formStyles.containerInputTime}>
          <Text style={formStyles.textInput}>Horas</Text>
          <TextInput
            style={formStyles.input}
            keyboardType="numeric"
            value={horas}
            onChangeText={(txt) => {
              if (nameRegex.test(txt)) {
                setValidated(0);
                setHoras(txt.trim());
              } else {
                setValidated(-1);
                setErrorForm("Solo caracteres numericos (no . ni ,)");
              }
            }}
          />
        </View>
        <View style={formStyles.containerInputTime}>
          <Text style={formStyles.textInput}>Minutos</Text>
          <TextInput
            style={formStyles.input}
            keyboardType="numeric"
            value={minutos}
            onChangeText={(txt) => setMinutos(txt)}
          />
        </View>
      </View>

      <View>
        <Text style={formStyles.textInput}>Videos</Text>
        <TextInput
          style={formStyles.input}
          keyboardType="numeric"
          value={videos}
          onChangeText={(txt) => setVideos(txt)}
        />
      </View>

      <View>
        <Text style={formStyles.textInput}>Revisitas</Text>
        <TextInput
          style={formStyles.input}
          keyboardType="numeric"
          value={revisitas}
          onChangeText={(txt) => setRevisitas(txt)}
        />
      </View>
      <View>
        <Text style={formStyles.textInput}>Estudios</Text>
        <TextInput
          style={formStyles.input}
          keyboardType="numeric"
          value={estudios}
          onChangeText={(txt) => setEstudios(txt)}
        />
      </View>
      <View>
        {validated == -1 ? (
          <Text style={formStyles.textError}>{errorForm}</Text>
        ) : null}
      </View>
      <View style={[formStyles.row, { marginVertical: 15 }]}>
        <TouchableOpacity
          style={[{ flex: 5 }, formStyles.btnClasic]}
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
          <Entypo name="trash" size={35} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
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
  containerInputTime: {
    width: "45%",
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
export default FormInform;
