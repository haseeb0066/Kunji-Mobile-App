import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Routes from './Routes';
import Login from '../screens/authentication/Login/Login';
import VistorSubDashBoard from '../screens/VisitorManagementScreens/VistorSubDashBoard/VistorSubDashBoard';

import AddVisitor from '../screens/Visitor/AddVisitor/AddVisitor';
import AddGatePass from '../screens/GatePass/AddGatePass/AddGatePass';


const Stack = createNativeStackNavigator();
function VisitorManagementNavigations() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={Routes.Visitor_Management}
        component={VistorSubDashBoard}
      />
      <Stack.Screen name={'AddVisitor'} component={AddVisitor} />
      <Stack.Screen name={'AddGatePass'} component={AddGatePass}/>
    </Stack.Navigator>
  );
}
export default VisitorManagementNavigations;
