import AsyncStorage from "@react-native-async-storage/async-storage";

export const getterInform = async (cMonth, cYear) => {
  const object = await AsyncStorage.getItem(cMonth + "." + cYear);
  let hoursVar = 0;
  let minutesVar = 0;
  let videosVar = 0;
  let studiesVar = 0;
  let returnVisitsVar = 0;
  if (object != null) {
    hoursVar = JSON.parse(object).hours;
    minutesVar = JSON.parse(object).minutes;
    videosVar = JSON.parse(object).videos;
    studiesVar = JSON.parse(object).studies;
    returnVisitsVar = JSON.parse(object).streturnVisitsudies;
  }

  const data = {
    hours: hoursVar,
    minutes: minutesVar,
    videos: videosVar,
    studies: studiesVar,
    returnVisits: returnVisitsVar,
  };
  return data;
};
export const setterInform = async (inform, month, year) => {
  const object = {
    hours: inform.hours,
    minutes: inform.minutes,
    videos: inform.videos,
    returnVisits: inform.returnVisits,
    studies: inform.studies,
  };
  await AsyncStorage.setItem(month + "." + year, JSON.stringify(object));
};
export const addInform = async (inform, month, year) => {
  const result = await AsyncStorage.getItem(
    month + "." + year,
    JSON.stringify(object)
  );
  if (result != null) {
    let minutesTemp = Number.parseInt(JSON.parse(result).minutes);
    let hoursTemp = Number.parseInt(JSON.parse(result).hours);
    hoursTemp = inform.hours + hoursTemp + minutesTemp / 60;
    minutesTemp = inform.minutes + (minutesTemp % 60);
    const object = {
      hours: hoursTemp,
      minutes: minutesTemp,
      videos: inform.videos + Number.parseInt(JSON.parse(result).videos),
      returnVisits:
        inform.returnVisits + Number.parseInt(JSON.parse(result).returnVisits),
      studies: inform.studies + Number.parseInt(JSON.parse(result).studies),
    };
    await AsyncStorage.setItem(month + "." + year, JSON.stringify(object));
  } else {
    setterInform(inform, month, year);
  }
};
