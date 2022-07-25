import {create} from 'apisauce';
import {Platform} from 'react-native';
import Storage from '../Auth/Storage';

import {BASE_URL} from '../server/URL';

const apiClient = create({
  baseURL: BASE_URL,
});

apiClient.addAsyncRequestTransform(async request => {
  const authUser = await Storage.getToken();
  console.log('local user', authUser);
  // if (!authUser) return;
  request.headers['Authorization'] = `Bearer ${authUser}`;
  request.headers['User-Agent'] = `kunji_ios`;
});

export default apiClient;
