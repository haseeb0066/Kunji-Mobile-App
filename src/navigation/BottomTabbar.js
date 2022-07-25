import React from 'react';
import {
  Alert,
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import images from '../assets/images/images';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import HomePage from '../screens/HomePage/HomePage';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import FamilyMember from '../screens/FamilyMember/FamilyMember';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Wallet from '../screens/Wallet/Wallet';
import Messages from '../screens/Messages/Messages';
import Building from '../screens/Building/Building';
import VisitorManagement from '../screens/VisitorManagement/VisitorManagement';
import {userIcon,messageIcon,heartIcon,walletIcon} from '../assets/images/svg/SvgImages'
import SvgComponent from '../components/common/SvgCustomComponents/SvgCustomComponents';

const Stack = createNativeStackNavigator();

export const BottomTabbar = () => {
  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';
    switch (routeName) {
      case 'title1':
        icon = walletIcon;
        break;
      case 'title2':
        icon = heartIcon;
        break;
      case 'title3':
        icon = messageIcon;
        break;
      case 'title4':
        icon = userIcon;
        break;
        case 'title5':
          icon = userIcon;
          break;
    }

    return (
      <SvgComponent
        svgMarkup={icon(selectedTab===routeName ? '#FFFF' : '#00ABAB')}
      />
    );
  };
  const renderTabBar = ({routeName, selectedTab, navigate}) => {

    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };


  return (
    <View style={{flex: 1}}>
      <CurvedBottomBar.Navigator
        style={styles.bottomBar}
        strokeWidth={0.5}
        height={65}
        circleWidth={55}
        bgColor="#2F5351"
        initialRouteName="title5"s
        // borderTopLeftRight
        swipeEnabled
        renderCircle={({selectedTab, navigate}) => (
          <TouchableOpacity
            style={styles.btnCircle}
            onPress={() => {
              navigate('title5');
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Image
                style={{width: 20, height: 20, resizeMode: 'contain'}}
                source={images.tab_home}
              />
            </View>
          </TouchableOpacity>
        )}
        tabBar={renderTabBar}>
        <CurvedBottomBar.Screen
          name="title1"
          position="left"
          component={({navigate}) => (
            <View style={{flex: 1}}>
              <Wallet />
            </View>
          )}
        />
        <CurvedBottomBar.Screen
          name="title2"
          position="left"
          component={({navigate}) => (
            <View style={{flex: 1}}>
              <Building/>
            </View>
          )}
        />
        <CurvedBottomBar.Screen
          name="title3"
          position="right"
          component={({navigate}) => (
            <View style={{flex: 1}}>
              <Messages/>
            </View>
          )}
        />
        <CurvedBottomBar.Screen
          name="title5"
          component={({navigate}) => (
            <View style={{flex: 1}}>
              <HomePage />
            </View>
          )}
          //  component={myStack}
        />

        <CurvedBottomBar.Screen
          name="title4"
          position="right"
          component={({navigate}) => (
            <View style={{flex: 1}}>
              <FamilyMember />
            </View>
          )}
        />

        {/* <CurvedBottomBar.Screen
        
         component = {({navigate}) => (
            <View style={{flex: 1}}>
              <HomePage />
            </View>
          )}
          // component={myStack}
      /> */}
      </CurvedBottomBar.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginVertical: 5,
  },
  bottomBar: {},
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2F5351',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    bottom: 30,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  img: {
    width: 30,
    height: 30,
  },
});
