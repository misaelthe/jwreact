import AsyncStorage from "@react-native-async-storage/async-storage";

export const getterInform = async (month, year) => {
  const result = await AsyncStorage.getItem(month + "." + year);
  let hoursVar = "0";
  let minutesVar = "0";
  let videosVar = "0";
  let studiesVar = "0";
  let returnVisitsVar = "0";
  if (result != null) {
    hoursVar = JSON.parse(result).hours;
    minutesVar = JSON.parse(result).minutes;
    videosVar = JSON.parse(result).videos;
    studiesVar = JSON.parse(result).studies;
    returnVisitsVar = JSON.parse(result).returnVisits;
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
  const result = await AsyncStorage.getItem(month + "." + year);
  if (result != null) {
    let minutesTemp = Number.parseInt(JSON.parse(result).minutes);
    let hoursTemp = Number.parseInt(JSON.parse(result).hours);
    hoursTemp += Number.parseInt(inform.hours) + minutesTemp / 60;
    minutesTemp = Number.parseInt(inform.minutes) + (minutesTemp % 60);
    const object = {
      hours: hoursTemp,
      minutes: minutesTemp,
      videos:
        Number.parseInt(inform.videos) +
        Number.parseInt(JSON.parse(result).videos),
      returnVisits:
        Number.parseInt(inform.returnVisits) +
        Number.parseInt(JSON.parse(result).returnVisits),
      studies:
        Number.parseInt(inform.studies) +
        Number.parseInt(JSON.parse(result).studies),
    };
    await AsyncStorage.setItem(month + "." + year, JSON.stringify(object));
  } else {
    setterInform(inform, month, year);
  }
};
export const deleteInforms = async () => {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  console.log("fecha " + month + " " + year);
  const objectOne = await getterInform(month, year);
  const objectTwo = await getterInform(checkMonth(month, 1), year);
  const objectThree = await getterInform(checkMonth(month, 2), year);

  await AsyncStorage.clear();
  if (objectOne != null) await addInform(objectOne, month, year);
  if (objectTwo != null) await addInform(objectTwo, checkMonth(month, 1), year);
  if (objectThree != null)
    await addInform(objectThree, checkMonth(month, 2), year);
  console.log(
    "obj1 " +
      objectOne.hours +
      " " +
      objectTwo.hours +
      " " +
      objectThree.hours +
      " "
  );
};
const checkMonth = (month, substract) => {
  if (month == 0 && (substract == 1 || substract == 2)) {
    if (substract == 1) return 11;
    if (substract == 2) return 10;
  } else if (month == 1 && substract == 2) {
    return 10;
  } else {
    return month;
  }
};
