import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Routes from './Routes';

import UtilityBillPaymentSubDashBoard from '../screens/UtilityBillPaymentManagement/UtilityBillPaymentSubDashBoard';
import ElectricityServiceProviderListScreen from '../screens/UtilityBillPaymentManagement/ElectricityServiceProviderListScreen/ElectricityServiceProviderListScreen';
import EnterBillReferenceNoScreen from '../screens/UtilityBillPaymentManagement/EnterBillReferenceNoScreen/EnterBillReferenceNoScreen';
import ReviewBillDetailsScreen from '../screens/UtilityBillPaymentManagement/ReviewBillDetailsScreen/ReviewBillDetailsScreen';

const Stack = createNativeStackNavigator();
function UtilityBillPaymentNavigations() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="UtilityBill Payment"
        component={UtilityBillPaymentSubDashBoard}
      />
      <Stack.Screen
        name={Routes.ELECTRICITY_SERVICE_PROVIDER}
        component={ElectricityServiceProviderListScreen}
      />
      <Stack.Screen
        name={Routes.BILL_REFERNCE_N0}
        component={EnterBillReferenceNoScreen}
      />
      <Stack.Screen
        name={Routes.REVIEW_BILL_PAYMENT}
        component={ReviewBillDetailsScreen}
      />
    </Stack.Navigator>
  );
}
export default UtilityBillPaymentNavigations;
