import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { COLORS, SIZES, FONTS, STRUCTURE } from "../constants/theme.js";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { getterInform, setterInform } from "../util/SenderInform.js";

const EditFormInform = ({ navigation }) => {
  const [validated, setValidated] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [videos, setVideos] = useState("");
  const [returnVisits, setReturnVisits] = useState("");
  const [studies, setStudies] = useState("");
  const [messageError, setMessageError] = useState("");

  const numberRegex = new RegExp(/^[0-9]+$/i);
  const daysSoFar = new Date().getDate();

  useFocusEffect(
    React.useCallback(() => {
      loadValues();
    }, [])
  );

  const loadValues = () => {
    const inform = getterInform(currentMonth, currentYear);
    setHours(inform.hours);
    setMinutes(inform.minutes);
    setVideos(inform.videos);
    setReturnVisits(inform.returnVisits);
    setStudies(inform.studies);
  };

  const editInform = () => {
    const inform = {
      hours: hours,
      minutes: minutes,
      videos: videos,
      returnVisits: returnVisits,
      studies: studies,
    };
    setterInform(inform, currentMonth, currentYear);
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
    }
    const inform = getterInform(currentMonth, currentYear);
    const hoursConsolidated =
      Number.parseInt(inform.hours) + Number.parseInt(hours);
    if (hoursConsolidated > daysSoFar * 24 && Number.parseInt(minutes) != 0) {
      setMessageError("You cannot inform that amount of hours");
    }
    if (Number.parseInt(minutes) > 59) {
      setMessageError("You cannot inform that amount of minutes");
    }
    if (
      (Number.parseInt(returnVisits) > 0 || Number.parseInt(studies) > 0) &&
      Number.parseInt(hours) == 0 &&
      Number.parseInt(minutes) == 0
    ) {
      setMessageError(
        "You cannot inform return visits or studies if you don't inform any hour"
      );
    }
    if (
      Number.parseInt(hours) == 0 &&
      Number.parseInt(minutes) == 0 &&
      Number.parseInt(videos) == 0 &&
      Number.parseInt(returnVisits) == 0 &&
      Number.parseInt(studies) == 0
    ) {
      setMessageError("You cannot send a blank inform");
    } else {
      editInform();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[STRUCTURE.rowHorizontal, { marginVertical: 10 }]}>
        <View style={STRUCTURE.rowVertical}>
          <View style={[STRUCTURE.rowHorizontal, { marginHorizontal: 10 }]}>
            <Text style={[FONTS.headingInput]}>Horas</Text>
            <TextInput
              style={STRUCTURE.input}
              keyboardType="numeric"
              value={hours}
              onChangeText={(val) => {
                setHoras(Number.parseInt(val.trim()));
              }}
            />
          </View>
          <View style={[STRUCTURE.rowHorizontal, { marginHorizontal: 10 }]}>
            <Text style={FONTS.headingInput}>Minutos</Text>
            <TextInput
              style={formStyles.input}
              keyboardType="numeric"
              value={minutos}
              onChangeText={(val) => setMinutes(Number.parseInt(val.trim()))}
            />
          </View>
        </View>
      </View>

      <View style={(STRUCTURE.rowHorizontal, { margin: 10 })}>
        <Text style={FONTS.headingInput}>Videos</Text>
        <TextInput
          style={formStyles.input}
          keyboardType="numeric"
          value={videos}
          onChangeText={(val) => setVideos(val.trim())}
        />
      </View>

      <View style={(STRUCTURE.rowHorizontal, { margin: 10 })}>
        <Text style={FONTS.headingInput}>Revisitas</Text>
        <TextInput
          style={formStyles.input}
          keyboardType="numeric"
          value={revisitas}
          onChangeText={(val) => setReturnVisits(Number.parseInt(val.trim()))}
        />
      </View>

      <View style={(STRUCTURE.rowHorizontal, { margin: 10 })}>
        <Text style={FONTS.headingInput}>Estudios</Text>
        <TextInput
          style={formStyles.input}
          keyboardType="numeric"
          value={estudios}
          onChangeText={(val) => setStudies(Number.parseInt(val.trim()))}
        />
      </View>
      <View style={STRUCTURE.rowHorizontal}>
        {validated == -1 ? (
          <Text style={formStyles.textError}>{messageError}</Text>
        ) : null}
      </View>
      <View style={[STRUCTURE.rowHorizontal, { margin: 10 }]}>
        <View style={[STRUCTURE.rowVertical]}>
          <TouchableOpacity
            style={[
              { flex: 5 },
              formStyles.btnClasic,
              { backgroundColor: COLORS.red },
            ]}
            onPress={() => {
              validateInform();
            }}
          >
            <Text style={formStyles.textSubmit}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[{ flex: 1 }, formStyles.btnClasic]}
            onPress={() => {
              loadValues();
            }}
          >
            <FontAwesome name="undo" size={35} color="#ffffff" />
          </TouchableOpacity>
        </View>
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
