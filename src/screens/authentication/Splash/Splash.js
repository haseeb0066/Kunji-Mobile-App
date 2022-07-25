import React, {Component, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import BackgroundVideo from '../../../assets/video/splashBGVideo.mp4';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {setUser, setToken} from '../../../redux/Actions/Actions';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import {SplashSkipIcon, SplashLogo} from '../../../assets/images/svg/SvgImages';
import useAuth from '../../../Auth/useAuth';
import Storage from '../../../Auth/Storage';
import Routes from '../../../navigation/Routes';
import messaging from '@react-native-firebase/messaging';
import {useIsFocused} from '@react-navigation/native';
import Firebase from '@react-native-firebase/app';
// import PushNotification from 'react-native-push-notification';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const [device, setDevice] = useState('');

  const isFocused = useIsFocused();
  const {user, setUser} = useAuth();
  useEffect(() => {
    setTimeout(function () {
      checkLogin();
      // navigation.navigate('Login');
    }, 1000);
  }, []);
  const checkLogin = async () => {
    const loaclStoredUser = await Storage.getUser();
    console.log(loaclStoredUser);
    if (loaclStoredUser) setUser(loaclStoredUser);
    else navigation.navigate('Login');
    // await AsyncStorage.clear();

    // let token = await AsyncStorage.getItem('token', null);
    // let user = await AsyncStorage.getItem('user', null);
    // if (user !== null) {
    //   console.log({
    //     token: token,
    //     user: JSON.parse(user),
    //   });
    //   dispatch(setToken(token));
    //   dispatch(setUser(JSON.parse(user)));
    //   navigation.navigate('BottomTabbar');
    // } else {
    //   navigation.navigate('Login');
    // }
  };
  //===================== for ios ============//

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  useEffect(() => {
    requestUserPermission();
  }, []);
  //======================  push Notifications ===================
  // useEffect(() => {
  //   console.log('Notification useEffect');
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Notification foreground', remoteMessage.notification);
  //   });

  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //     console.log('Notification background', remoteMessage.notification);
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log('Notification foreground', remoteMessage.notification); // e.g. "Settings"
  //       }
  //       //setLoading(false);
  //     });
  // }, [isFocused]);

  // //============= Loacal noti ==============
  // useEffect(() => {
  //   console.log('..........firebase token.os .......');
  //   Firebase.initializeApp;
  //   console.log('.........initilized Firebase.......');

  //   PushNotification.configure({
  //     //console.log('.......... token.os .......');
  //     // (optional) Called when Token is generated (iOS and Android)
  //     onRegister: function (token) {
  //       if (Platform.OS === 'android') {
  //         setToken(token.token);
  //       }

  //       setDevice(token.os);
  //       //console.log(tokken);
  //       console.log('TOKEN:', token.token);
  //       console.log('.......... token.os .......', token.os);
  //     },
  //     // (required) Called when a remote is received or opened, or local notification is opened

  //     onNotification: function (notification) {
  //       console.log('NOTIFICATION:', notification);
  //       // process the notification
  //       // (required) Called when a remote is received or opened, or local notification is opened
  //       notification.finish(PushNotificationIOS.FetchResult.NoData);
  //     },
  //     // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  //     onAction: function (notification) {
  //       console.log('ACTION:', notification.action);
  //       console.log('NOTIFICATION:', notification);
  //       // process the action
  //     },
  //     // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  //     onRegistrationError: function (err) {
  //       console.error(err.message, err);
  //     },
  //     // IOS ONLY (optional): default: all - Permissions to register.
  //     permissions: {
  //       alert: true,
  //       badge: true,
  //       sound: true,
  //     },

  //     popInitialNotification: true,

  //     requestPermissions: true,
  //   });
  //   //console.log("Tooookon", tokken);
  // }, []);

  return (
    <View style={styles.container}>
      <Video
        source={BackgroundVideo}
        style={styles.bgVideo}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
      />
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={() => navigation.navigate(Routes.LOGIN)}>
          <Text style={styles.skipText}>SKIP</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <SvgComponent svgMarkup={SplashLogo} />
      </View>
    </View>
  );
};
export default Splash;
