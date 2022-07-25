import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Routes from './Routes';
import AppProfile from '../screens/AppProfile/AppProfile';
import AddFamilyMember from '../screens/FamilyMembersScreen/AddFamilyMember/AddFamilyMember';
import PaymentScreen from '../screens/PaymentScreen/PaymentScreen';

import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import DetailsFamilyMember from '../screens/FamilyMembersScreen/DetailsFamilyMember/DetailsFamilyMember';
import TanantHome from '../screens/Tanants/tanantHome/TanantHome';
import ShowTanantDetails from '../screens/Tanants/ShowTanantDetails/ShowTanantDetails';
import ManageMyVehicle from '../screens/Vehicle/ManageMyVehicles/ManageMyVehicle';
import AppBottomNavigations from './AppBottomNavigations';
import ShowNewVehicleDetails from '../screens/Vehicle/ShowNewVehicleDetails/ShowNewVehicleDetails';

import AddGatePass from '../screens/GatePass/AddGatePass/AddGatePass';
import PropertiesMainDetails from '../screens/PropertiesModule/propertiesMainDetails/PropertiesMainDetails';
import PanicAlaramSubDashBoard from '../screens/PanicAlaramManagementScreens/PanicAlaramSubDashBoard/PanicAlaramSubDashBoard';
import VisitorDetails from '../screens/Visitor/VisitorDetail/VisitorDetails';
import VisitorManagementNavigations from './VisitorManagementNavigations';
import DetailsGatePass from '../screens/GatePass/DetailsGatePass/DetailsGarePass';

import AddExitControl from '../screens/ExitControl/AddExitControl/AddExitControl';
import NotificationScreen from '../screens/NoticeBoard/NotificationScreen/NotificationScreen';
import Poll from '../screens/NoticeBoard/Poll/Poll';

import OpenCase from '../screens/Complaints/OpenCase/OpenCase';

import AddDeliveryBooking from '../screens/DeliveryBooking/AddDeliveryBooking/AddDeliveryBooking';
import DeliveryBookingDetails from '../screens/DeliveryBooking/DeliveryBookingDetails/DeliveryBookingDetails';
import VisitorCarParking from '../screens/Visitor/VisitorCarParking/VisitorCarParking';
import CarParkingDetails from '../screens/Visitor/CarParkingDetails/CarParkingDetails';
import ServantMangement from '../screens/Servant/ServantMangement/ServantMangement';
import RentPaymentScreen from '../screens/RentPaymentManagement/RentPAymentScreen/RentPaymentScreen';
import ServantRegistration from '../screens/Servant/ServantRegistration/ServantRegistration';
import ServantDetails from '../screens/Servant/ServantDetails/ServantDetails';
import UtilityBillPaymentNavigations from './UtilityBillPaymentNavigations';
import CreditDebitCardScreen from '../screens/RentPaymentManagement/PaymentMethodsScreen/CreditDebitCardScreen/CreditDebitCardScreen';
import JazzCashPaymentScreen from '../screens/RentPaymentManagement/PaymentMethodsScreen/JazzCashPaymentMEthod/JazzCashPaymentScreen';
import Wallet from '../screens/RentPaymentManagement/PaymentMethodsScreen/Wallet/Wallet';
import AddNewCase from '../screens/Complaints/AddNewCase/AddNewCase';
import SocietyChargesNavigations from './SocietyChargesNavigations';
import ViewPropertiesDetails from '../screens/PropertiesModule/ViewPropertiesDetails/ViewPropertiesDetails';
import DigitalWalletDetails from '../screens/DigitalWallet/DigitalWalletDetails/DigitalWalletDetails';
import AddDigitalWallet from '../screens/DigitalWallet/AddDigitalWallet/AddDigitalWallet';
import PaymentHistory from '../screens/PaymentHistory/PaymentHistory';
import ViewBills from '../screens/ViewBills/ViewBills';
import ChangePassword from '../screens/authentication/ChangePassword/ChangePassword';
import ViewProfile from '../screens/ViewProfile/ViewProfile';
import EditProfile from '../screens/ViewProfile/EditProfile/EditProfile';
import AddUserPoll from '../screens/NoticeBoard/AddUserPoll/AddUserPoll';
import VotePoll from '../screens/NoticeBoard/VotePoll/VotePoll';
import ViewPollResult from '../screens/NoticeBoard/ViewPollResult/ViewPollResult';
import ViewPanicAlertsHistory from '../screens/ViewPanicAlertsHistory/ViewPanicAlertsHistory';

const Stack = createNativeStackNavigator();
function AppStackNavigations() {
  return (
    <Stack.Navigator
      // screenOptions={TransitionScreenOptions}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={Routes.BUTTOM_TAB_BAR}
        component={AppBottomNavigations}
      />

      <Stack.Screen
        name={Routes.VISITOR_MANAGEMENT}
        component={VisitorManagementNavigations}
      />

      <Stack.Screen
        name={Routes.UTILITY_BILL_PAYMENT}
        component={UtilityBillPaymentNavigations}
      />
      <Stack.Screen name={'AddFamilyMember'} component={AddFamilyMember} />
      <Stack.Screen name={'PaymentScreen'} component={PaymentScreen} />

      <Stack.Screen name={'ProfileScreen'} component={ProfileScreen} />
      <Stack.Screen
        name={'DetailsFamilyMember'}
        component={DetailsFamilyMember}
      />
      <Stack.Screen name={'TanantHome'} component={TanantHome} />
      <Stack.Screen name={'ShowTanantDetails'} component={ShowTanantDetails} />
      <Stack.Screen name={'ManageMyVehicle'} component={ManageMyVehicle} />

      <Stack.Screen name={'AddGatePass'} component={AddGatePass} />
      <Stack.Screen name={'DetailsGatePass'} component={DetailsGatePass} />

      <Stack.Screen
        name={'ShowNewVehicleDetails'}
        component={ShowNewVehicleDetails}
      />
      <Stack.Screen
        name={'NotificationScreen'}
        component={NotificationScreen}
      />
      <Stack.Screen name={'Poll'} component={Poll} />
      <Stack.Screen name={'User poll'} component={AddUserPoll} />
      <Stack.Screen name={'Vote poll'} component={VotePoll} />
      <Stack.Screen name={'View Pool Result'} component={ViewPollResult} />
      <Stack.Screen
        name={'PropertiesMainDetails'}
        component={PropertiesMainDetails}
      />
      <Stack.Screen
        name={'PanicAlaramSubDashBoard'}
        component={PanicAlaramSubDashBoard}
      />
      <Stack.Screen name={'VisitorDetails'} component={VisitorDetails} />
      <Stack.Screen name={'AddExitControl'} component={AddExitControl} />
      <Stack.Screen
        name={'AddDeliveryBooking'}
        component={AddDeliveryBooking}
      />
      <Stack.Screen
        name={'DeliveryBookingDetails'}
        component={DeliveryBookingDetails}
      />

      <Stack.Screen name={'VisitorCarParking'} component={VisitorCarParking} />
      <Stack.Screen name={'CarParkingDetails'} component={CarParkingDetails} />
      <Stack.Screen name={'ServantMangement'} component={ServantMangement} />

      <Stack.Screen name={'RentPaymentScreen'} component={RentPaymentScreen} />
      <Stack.Screen
        name={'ServantRegistration'}
        component={ServantRegistration}
      />
      <Stack.Screen name={'ServantDetails'} component={ServantDetails} />

      <Stack.Screen
        name={'CreditDebitCardScreen'}
        component={CreditDebitCardScreen}
      />
      <Stack.Screen
        name={'JazzCashPaymentScreen'}
        component={JazzCashPaymentScreen}
      />
      <Stack.Screen name={'Wallet'} component={Wallet} />
      <Stack.Screen name={'OpenCase'} component={OpenCase} />
      <Stack.Screen name={'AddNewCase'} component={AddNewCase} />

      <Stack.Screen
        name={'SocietyChargesNavigations'}
        component={SocietyChargesNavigations}
      />
      <Stack.Screen
        name={'ViewPropertiesDetails'}
        component={ViewPropertiesDetails}
      />
      <Stack.Screen
        name={'DigitalWalletDetails'}
        component={DigitalWalletDetails}
      />
      <Stack.Screen name={'AddDigitalWallet'} component={AddDigitalWallet} />
      <Stack.Screen name={'PaymentHistory'} component={PaymentHistory} />
      <Stack.Screen name={'ViewBills'} component={ViewBills} />
      <Stack.Screen name={'ChangePassword'} component={ChangePassword} />
      <Stack.Screen name={'ViewProfile'} component={ViewProfile} />
      <Stack.Screen name={'EditProfile'} component={EditProfile}/>
      <Stack.Screen name={'ViewPanicAlertsHistory'} component={ViewPanicAlertsHistory}/>
    </Stack.Navigator>
  );
}
export default AppStackNavigations;
