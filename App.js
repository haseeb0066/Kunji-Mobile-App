import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import {userReducer} from './src/redux/Reducers/Reducers';
import {createStore} from 'redux';
import AuthContext from './src/Auth/context';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/RootStack';
import {Platform, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/utils/toastMessageConfig';
import messaging from '@react-native-firebase/messaging';
import Firebase from '@react-native-firebase/app';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, {Importance} from 'react-native-push-notification';
import Storage from './src/Auth/Storage';

const store = createStore(userReducer);
const App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const [user, setUser] = useState();
  // async function getAPNSToken() {
  //   while (true) {
  //     const apnsToken = await firebase.messaging().ios.getAPNSToken();
  //     if (apnsToken !== null) return apnsToken;
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //   }
  // }

  PushNotification.createChannel(
    {
      channelId: 'channel-id', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

  useEffect(() => {
    // Get the device token

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    if (Platform.OS == 'ios') {
      messaging()
        .getToken()
        .then(async token => {
          await Storage.storeFcmToken(token);
          console.log('ios token', token);
        });
    } else
      messaging()
        .getToken()
        .then(async token => {
          await Storage.storeFcmToken(token);
          console.log('android token', token);
        });
  }, []);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (Platform.OS === 'ios')
        PushNotificationIOS.addNotificationRequest({
          id: '1',
          title: 'sada',
          subtitle: 'sdsd',
          sound: true,
        });
      console.log('forground', JSON.stringify(remoteMessage));
      alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <NavigationContainer>
      <AuthContext.Provider value={{user, setUser}}>
        <View style={{flex: 1}}>
          <Provider store={store}>
            <RootStack />
          </Provider>
        </View>
        <Toast config={toastConfig} />
      </AuthContext.Provider>
    </NavigationContainer>
  );
};
export default App;
