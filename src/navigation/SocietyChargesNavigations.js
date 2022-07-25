import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SocietyPaymentScreen from '../screens/SocietyChargesManagement/SocietyPaymentScreen/SocietyPaymentScreen';
import SocietyCreditDebitCardScreen from '../screens/SocietyChargesManagement/SocietyPaymentMethodsScreen/CreditDebitCardScreen/SocietyCreditDebitCardScreen';
import SocietyJazzCashPaymentScreen from '../screens/SocietyChargesManagement/SocietyPaymentMethodsScreen/JazzCashPaymentMEthod/SocietyJazzCashPaymentScreen';
import SocietyWallet from '../screens/SocietyChargesManagement/SocietyPaymentMethodsScreen/Wallet/SocietyWallet';
const Stack = createNativeStackNavigator();
function SocietyChargesNavigations() {
  return (
    <Stack.Navigator
      // screenOptions={TransitionScreenOptions}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SocietyPaymentScreen" component={SocietyPaymentScreen} />
      <Stack.Screen name='SocietyCreditDebitCardScreen' component={SocietyCreditDebitCardScreen} />
      <Stack.Screen name='SocietyJazzCashPaymentScreen' component={SocietyJazzCashPaymentScreen} />
      <Stack.Screen name='SocietyWallet' component={SocietyWallet} />
    </Stack.Navigator>
  );
}
export default SocietyChargesNavigations;
