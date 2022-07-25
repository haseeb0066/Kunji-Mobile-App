import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {BASE_URL} from './URL';

export const post = async (endpoint, body, useToken) => {
  let token = await AsyncStorage.getItem('token', null);
  let myHeader = new Headers();
  myHeader.append('Accept', 'application/json');
  console.log('myHeader');
  if (useToken) {
    console.log('token =', token);
    myHeader.append('Authorization', 'Bearer ' + token);
  }
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + endpoint, {
      method: 'POST',
      headers: myHeader,
      body: body,
    })
      .then(async res => {
        let json = await res.json();
        console.log('POST Req:', json);
        resolve({status: true, data: json});
      })
      .catch(err => {
        console.log('POST Error:', err);
        reject({status: false, error: err});
      });
  });
};

export const get = async (endpoint, body, userToken) => {
  let myHeader = new Headers();
  myHeader.append({Accept: 'application/json'});
  if (userToken) {
    console.log('token =', token);
    myHeader.append({Authorization: 'Bearer ' + token});
  }
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + endpoint, {
      method: 'GET',
      headers: myHeader,
    })
      .then(async res => {
        let json = await res.json();
        console.log('POST Req:', json);
        resolve({status: true, data: json});
      })
      .catch(err => {
        console.log('POST Error:', err);
        reject({status: false, error: err});
      });
  });
};
