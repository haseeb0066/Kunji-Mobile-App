import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Messages from '../screens/Messages/Messages';
import Building from '../screens/Building/Building';
import HomePage from '../screens/HomePage/HomePage';
import TabBar from '../components/application/customBottomTabBar/TabBar';
import TabBarButton from '../components/application/customBottomTabBar/TabBarButton';
import Wallet from '../screens/Wallet/Wallet';
import AppProfile from '../screens/AppProfile/AppProfile';
import HomeDashBoardNavigations from './HomeDashBoardNavigations';

const Tab = createBottomTabNavigator();

function AppBottomNavigations() {
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: 'red'},
      }}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={Wallet} />
      <Tab.Screen name="Building" component={Building} />
      <Tab.Screen
        name="HomePage"
        component={HomeDashBoardNavigations}
        options={{tabBarButton: props => <TabBarButton props={props} />}}
      />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="AppProfile" component={AppProfile} />
    </Tab.Navigator>
  );
}
export default AppBottomNavigations;
