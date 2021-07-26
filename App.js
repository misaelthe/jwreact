import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "./navigation/BottomTabs";
import EditInformScreen from "./screens/EditInformScreen";

import { deleteInforms } from "./util/UtilInform";
const RootStack = createStackNavigator();

const App = () => {
  useEffect(() => {
    const callDeleteInforms = async () => {
      await deleteInforms();
    };
    callDeleteInforms();
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={BottomTabs} />
        <RootStack.Screen
          name="EditInformScreen"
          component={EditInformScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
