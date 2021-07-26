import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { addInform, getterInform, setterInform } from "../util/UtilInform";

const FormInform = ({ navigation, addInformBoolean }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [videos, setVideos] = useState("0");
  const [returnVisits, setReturnVisits] = useState("0");
  const [studies, setStudies] = useState("0");
  const [messageError, setMessageError] = useState("");

  const numberRegex = new RegExp(/^[0-9]*$/i);
  const daysSoFar = new Date().getDate();

  useFocusEffect(
    React.useCallback(() => {
      addInformBoolean == true ? null : loadValues();
    }, [])
  );

  const loadValues = async () => {
    const inform = await getterInform(currentMonth, currentYear);
    setHours(inform.hours);
    setMinutes(inform.minutes);
    setVideos(inform.videos);
    setReturnVisits(inform.returnVisits);
    setStudies(inform.studies);
    setMessageError("");
  };

  const setInform = async () => {
    const inform = {
      hours: hours,
      minutes: minutes,
      videos: videos,
      returnVisits: returnVisits,
      studies: studies,
    };
    addInformBoolean == true
      ? await addInform(inform, currentMonth, currentYear)
      : await setterInform(inform, currentMonth, currentYear);
    clearForm();
    navigation.navigate("Home");
  };

  const validateInform = async () => {
    if (
      !numberRegex.test(hours) ||
      !numberRegex.test(minutes) ||
      !numberRegex.test(videos) ||
      !numberRegex.test(returnVisits) ||
      !numberRegex.test(studies)
    ) {
      setMessageError("You have entered an invalid character");
    } else {
      const inform = await getterInform(currentMonth, currentYear);
      const hoursConsolidated =
        addInformBoolean == true
          ? Number.parseInt(inform.hours) + Number.parseInt(hours)
          : Number.parseInt(hours);
      if (
        (hoursConsolidated == daysSoFar * 24 &&
          Number.parseInt(minutes) != 0) ||
        hoursConsolidated > daysSoFar * 24
      ) {
        setMessageError("You cannot inform more hours than in a month");
      } else if (Number.parseInt(minutes) > 59) {
        setMessageError("You cannot inform that amount of minutes");
      } else if (
        (Number.parseInt(returnVisits) > 0 || Number.parseInt(studies) > 0) &&
        Number.parseInt(hours) == 0 &&
        Number.parseInt(minutes) == 0
      ) {
        setMessageError(
          "You cannot inform return visits or studies if you don't inform any hour"
        );
      } else if (
        Number.parseInt(hours) == 0 &&
        Number.parseInt(minutes) == 0 &&
        Number.parseInt(videos) == 0 &&
        Number.parseInt(returnVisits) == 0 &&
        Number.parseInt(studies) == 0
      ) {
        setMessageError("You cannot send a blank inform");
      } else {
        setInform();
      }
    }
  };

  const clearForm = () => {
    setHours("0");
    setMinutes("0");
    setVideos("0");
    setReturnVisits("0");
    setStudies("0");
    setMessageError("");
  };

  return (
    <View style={formStyles.container}>
      <View style={formStyles.row}>
        <View style={formStyles.containerInputTime}>
          <Text style={formStyles.textInput}>Horas</Text>
          <TextInput
            style={formStyles.input}
            keyboardType="numeric"
            value={hours == "0" && addInformBoolean == true ? "" : hours}
            onChangeText={(val) =>
              setHours(val.trim() == "" ? "0" : val.trim())
            }
          />
        </View>
        <View style={formStyles.containerInputTime}>
          <Text style={formStyles.textInput}>Minutos</Text>
          <TextInput
            style={formStyles.input}
            keyboardType="numeric"
            value={minutes == "0" && addInformBoolean == true ? "" : minutes}
            onChangeText={(val) =>
              setMinutes(val.trim() == "" ? "0" : val.trim())
            }
          />
        </View>
      </View>

      <View>
        <Text style={formStyles.textInput}>Videos</Text>
        <TextInput
          style={formStyles.input}
          keyboardType="numeric"
          value={videos == "0" && addInformBoolean == true ? "" : videos}
          onChangeText={(val) => setVideos(val.trim() == "" ? "0" : val.trim())}
        />
      </View>

      <View>
        <Text style={formStyles.textInput}>Revisitas</Text>
        <TextInput
          style={formStyles.input}
          keyboardType="numeric"
          value={
            returnVisits == "0" && addInformBoolean == true ? "" : returnVisits
          }
          onChangeText={(val) =>
            setReturnVisits(val.trim() == "" ? "0" : val.trim())
          }
        />
      </View>
      <View>
        <Text style={formStyles.textInput}>Estudios</Text>
        <TextInput
          style={formStyles.input}
          keyboardType="numeric"
          value={studies == "0" && addInformBoolean == true ? "" : studies}
          onChangeText={(val) =>
            setStudies(val.trim() == "" ? "0" : val.trim())
          }
        />
      </View>
      <View>
        <Text style={formStyles.messageError}>
          {messageError == "" ? null : messageError}
        </Text>
      </View>
      <View style={[formStyles.row, { marginVertical: 15 }]}>
        <TouchableOpacity
          style={[{ flex: 5 }, formStyles.btnClasic]}
          onPress={() => {
            validateInform();
          }}
        >
          <Text style={formStyles.textSubmit}>Enviar</Text>
        </TouchableOpacity>
        {addInformBoolean == true ? (
          <TouchableOpacity
            style={[{ flex: 1 }, formStyles.btnClasic]}
            onPress={() => {
              clearForm();
            }}
          >
            <Entypo name="trash" size={35} color="#ffffff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[{ flex: 1 }, formStyles.btnClasic]}
            onPress={() => {
              loadValues();
            }}
          >
            <FontAwesome name="undo" size={35} color="#ffffff" />
          </TouchableOpacity>
        )}
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
    fontSize: 22,
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
  messageError: {
    fontSize: 18,
    color: "#FF0000",
    marginVertical: 10,
  },
});
export default FormInform;
