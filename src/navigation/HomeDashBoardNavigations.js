import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Routes from './Routes';
import VisitorManagementNavigations from './VisitorManagementNavigations';
import HomePage from '../screens/HomePage/HomePage';

const Stack = createNativeStackNavigator();
function HomeDashBoardNavigations() {
  return (
    <Stack.Navigator
      // screenOptions={TransitionScreenOptions}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeDashBoard" component={HomePage} />
    </Stack.Navigator>
  );
}
export default HomeDashBoardNavigations;
