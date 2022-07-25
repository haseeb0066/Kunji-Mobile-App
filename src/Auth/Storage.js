import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'authToken';
const key2 = 'Token';
const Fcmkey = 'FcmToken';
const storeToken = async authToken => {
  try {
    await AsyncStorage.setItem(key2, authToken);
  } catch (error) {
    console.log('Error Storing  the Fcm Token ', error);
  }
};

const storeFcmToken = async fcmToken => {
  try {
    await AsyncStorage.setItem(Fcmkey, fcmToken);
  } catch (error) {
    console.log('Error Storing  the auth Token ', error);
  }
};
const getStoreFcmToken = async () => {
  try {
    const data = await AsyncStorage.getItem(Fcmkey);
    if (data !== null) {
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log('Error getting the auth Token ', error);
  }
};
const storeUser = async user => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(user));
  } catch (error) {
    console.log('Error Storing  the auth Token ', error);
  }
};

const getToken = async () => {
  try {
    const data = await AsyncStorage.getItem(key2);
    if (data !== null) {
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log('Error getting the auth Token ', error);
  }
};

const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem(key);
    return JSON.parse(user);
  } catch (error) {
    console.log('Error getting the auth Token ', error);
  }
};

const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem(key2);
  } catch (error) {
    console.log('Error removing the auth Token ', error);
  }
};

const deleteUser = async () => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Error removing the auth Token ', error);
  }
};

export default {
  storeToken,
  storeUser,
  getToken,
  getUser,
  deleteToken,
  deleteUser,
  storeFcmToken,
  getStoreFcmToken,
};
