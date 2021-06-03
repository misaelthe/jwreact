import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "./navigation/BottomTabs";
import EditInformScreen from "./screens/EditInformScreen";

const RootStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={BottomTabs} />
        <RootStack.Screen name="EditInformScreen" component={EditInformScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
