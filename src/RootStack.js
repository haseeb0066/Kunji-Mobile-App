import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import useAuth from './Auth/useAuth';
import AuthNavigation from './navigation/AuthNavigation';

import AppStackNavigations from './navigation/AppStackNavigations';

const Stack = createNativeStackNavigator();
function RootStack() {
  const {user} = useAuth();
  return <>{user ? <AppStackNavigations /> : <AuthNavigation />}</>;
}
export default RootStack;
