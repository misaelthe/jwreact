import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './navigation/BottomTabs';

const App = () => {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>

  );
}
const mystyles = StyleSheet.create({
  bNavigation: { width: 50 }
});
export default App;