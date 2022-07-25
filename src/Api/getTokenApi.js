import axios from 'axios';

const GetTokenApi = (url, apiMethod, token) => {
  var options = {
    url,
    method: apiMethod,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    return axios(options)
      .then(response => {
        console.log('Get Token API respones', response);
        return response;
      })

      .catch(error => {
        console.log('trys catch Error is=====> ', error.response);
        return error.response;
      });
  } catch (error) {
    console.log('catch is: ', error);
  }
};

export default GetTokenApi;
