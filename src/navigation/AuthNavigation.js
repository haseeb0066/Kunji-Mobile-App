import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Routes from './Routes';
import Login from '../screens/authentication/Login/Login';
import ResetPassword from '../screens/authentication/ResetPassword/ResetPassword';
import CheckEmail from '../screens/authentication/CheckYourEmail/CheckEmail';
import CreateNewPass from '../screens/authentication/CreateNewPass/CreateNewPass';
import OtpVerification from '../screens/authentication/OtpVerification/OtpVerification';
import SignUp from '../screens/authentication/SignUp/SignUp';
import Splash from '../screens/authentication/Splash/Splash';
import TermsAndConditions from '../screens/TermsAndConditions/TermsAndConditions';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

const Stack = createNativeStackNavigator();
function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Routes.SPLASH} component={Splash} />
      <Stack.Screen name={Routes.LOGIN} component={Login} />
      <Stack.Screen name={Routes.RESET_PASSWORD} component={ResetPassword} />
      <Stack.Screen name={Routes.CHECK_EMAIL} component={CheckEmail} />
      <Stack.Screen name={Routes.CREATE_PASSWORD} component={CreateNewPass} />
      <Stack.Screen
        options={{
          gestureEnabled: false,
        }}
        name={Routes.OTP_VERIFICATION}
        component={OtpVerification}
      />
      <Stack.Screen
        name={Routes.TERMS_AND_CONDITIONS}
        component={TermsAndConditions}
      />
      <Stack.Screen name={Routes.SIGN_UP} component={SignUp} />
      <Stack.Screen name={Routes.EDIT_PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
}
export default AuthNavigation;
