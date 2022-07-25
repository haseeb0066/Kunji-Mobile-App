import {END_POINTS, BASE_URL} from './URL';
import {post} from './Server';
import apiClient from '../Api/client';

export const login = async body => {
  return new Promise((resolve, reject) => {
    post(END_POINTS.login, body, false)
      .then(async res => {
        console.log('token  ', res.data?.data?.token);
        if (res.data?.success) {
          resolve({status: true, data: res.data?.data});
        } else {
          resolve({status: false, data: res.data.message});
        }
      })
      .catch(err => {
        console.log('Login Error:', err);
        reject({status: false, error: err});
      });
  });
};

export const register = async body => {
  return new Promise((resolve, reject) => {
    post(END_POINTS.register, body, false)
      .then(async res => {
        console.log('1=>', res);
        if (res.data?.success) {
          resolve({status: true, data: res.data});
        } else {
          resolve({status: false, data: res.data});
        }
      })
      .catch(err => {
        console.log('Register Error:', err);
        reject({status: false, error: err});
      });
  });
};

export const verifyOTP = async (body, token) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + END_POINTS.verfiyOTP, {
      method: 'POST',
      headers: {
        Accept: 'applicaiton/json',
        Authorization: 'Bearer ' + token,
      },
      body: body,
    })
      .then(async res => {
        let json = await res.json();
        console.log('1=>', json);
        if (json.success) {
          resolve({status: true, data: json});
        } else {
          resolve({status: false, data: json});
        }
      })
      .catch(err => {
        console.log('Register Error:', err);
        reject({status: false, error: err});
      });
  });
};
export const verifyOTPForgot = async body => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + END_POINTS.forgotPasswordOTPSubmit, {
      method: 'POST',
      headers: {
        Accept: 'applicaiton/json',
        'Content-Type': 'multipart/form-data',
      },
      body: body,
    })
      .then(async res => {
        let json = await res.json();
        console.log('1=>', json);
        if (json.success) {
          resolve({status: true, data: json});
        } else {
          resolve({status: false, data: json});
        }
      })
      .catch(err => {
        console.log('Register Error:', err);
        reject({status: false, error: err});
      });
  });
};
export const forgotSubmitNewPassword = async body => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + END_POINTS.forgotPasswordSubmit, {
      method: 'POST',
      headers: {
        Accept: 'applicaiton/json',
        'Content-Type': 'multipart/form-data',
      },
      body: body,
    })
      .then(async res => {
        let json = await res.json();
        console.log('1=>', json);
        if (json.success) {
          resolve({status: true, data: json});
        } else {
          resolve({status: false, data: json});
        }
      })
      .catch(err => {
        console.log('Change Password Error:', err);
        reject({status: false, error: err});
      });
  });
};
export const resendOTP = async token => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + END_POINTS.resendOTP, {
      method: 'GET',
      headers: {
        Accept: 'applicaiton/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(async res => {
        let json = await res.json();
        console.log('1=>', json);
        if (json.success) {
          resolve({status: true, data: json});
        } else {
          resolve({status: false, data: json});
        }
      })
      .catch(err => {
        console.log('Register Error:', err);
        reject({status: false, error: err});
      });
  });
};
export const getTermsAndConditions = async token => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + END_POINTS.termsAndConditions, {
      method: 'GET',
      headers: {
        Accept: 'applicaiton/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(async res => {
        let json = await res.json();
        console.log('1=>', json);
        if (json.success) {
          resolve({status: true, data: json});
        } else {
          resolve({status: false, data: json});
        }
      })
      .catch(err => {
        console.log('Register Error:', err);
        reject({status: false, error: err});
      });
  });
};
export const sendForgotPasswordOTP = async (body, token) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + END_POINTS.forgotPasswordRequest, {
      method: 'POST',
      headers: {
        Accept: 'applicaiton/json',
        Authorization: 'Bearer ' + token,
      },
      body: body,
    })
      .then(async res => {
        let json = await res.json();
        console.log('1=>', json);
        if (json.success) {
          resolve({status: true, data: json});
        } else {
          resolve({status: false, data: json});
        }
      })
      .catch(err => {
        console.log('Register Error:', err);
        reject({status: false, error: err});
      });
  });
};

export const changePasswordInProfile = async (body, token) => {
  console.log('tokken in req', body);
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + END_POINTS.changePassword, {
      method: 'POST',
      headers: {
        Accept: 'applicaiton/json',
        Authorization: 'Bearer ' + token,
        'User-Agent': `kunji_ios`,
      },
      body: body,
    })
      .then(async res => {
        let json = await res.json();
        console.log('1=>', json);
        if (json.success) {
          resolve({status: true, data: json});
        } else {
          resolve({status: false, data: json});
        }
      })
      .catch(err => {
        console.log('Change Password Error:', err);
        reject({status: false, error: err});
      });
  });
};
export const getVehicleListApiFetch = async token => {
  // console.log('tokken in req', body);
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + END_POINTS.getVehicleList, {
      method: 'Get',
      headers: {
        Accept: 'applicaiton/json',
        Authorization: 'Bearer ' + token,
        'User-Agent': `kunji_ios`,
      },
      // body: body,
    })
      .then(async res => {
        let json = await res.json();
        console.log('1=>', json);

        resolve({status: true, data: json});
      })
      .catch(err => {
        console.log('Change Password Error:', err);
        reject({status: false, error: err});
      });
  });
};
export const getUserProfile = async token => {
  // console.log('tokken in req', body);
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + END_POINTS.getProfile, {
      method: 'Get',
      headers: {
        Accept: 'applicaiton/json',
        Authorization: 'Bearer ' + token,
        'User-Agent': `kunji_ios`,
      },
      // body: body,
    })
      .then(async res => {
        let json = await res.json();
        console.log('1=>', json);

        resolve({status: true, data: json});
      })
      .catch(err => {
        console.log('Change Password Error:', err);
        reject({status: false, error: err});
      });
  });
};
export const getSocietiesByCity = async (token, city_id) => {
  // console.log('tokken in req', body);
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + END_POINTS.getSocietyByCity + `?city_id=${city_id}`, {
      method: 'Get',
      headers: {
        Accept: 'applicaiton/json',
        Authorization: 'Bearer ' + token,
        'User-Agent': `kunji_ios`,
      },
      // body: body,
    })
      .then(async res => {
        let json = await res.json();
        console.log('1=>', json);

        resolve({status: true, data: json});
      })
      .catch(err => {
        console.log('Change Password Error:', err);
        reject({status: false, error: err});
      });
  });
};
export const getlevelOneMapping = async (token, society_id) => {
  // console.log('tokken in req', body);
  return new Promise((resolve, reject) => {
    fetch(
      BASE_URL + END_POINTS.getSocietyMappingOne + `?society_id=${society_id}`,
      {
        method: 'Get',
        headers: {
          Accept: 'applicaiton/json',
          Authorization: 'Bearer ' + token,
          'User-Agent': `kunji_ios`,
        },
        // body: body,
      },
    )
      .then(async res => {
        let json = await res.json();
        console.log('1=>', json);

        resolve({status: true, data: json});
      })
      .catch(err => {
        console.log('Change Password Error:', err);
        reject({status: false, error: err});
      });
  });
};

export const getlevelTwoMapping = async (token, society_id, mapping_one_id) => {
  // console.log('tokken in req', body);
  return new Promise((resolve, reject) => {
    fetch(
      BASE_URL +
        END_POINTS.getSocietyMappingTwo +
        `?society_id=${society_id}&mapping_one_id=${mapping_one_id}`,
      {
        method: 'Get',
        headers: {
          Accept: 'applicaiton/json',
          Authorization: 'Bearer ' + token,
          'User-Agent': `kunji_ios`,
        },
        // body: body,
      },
    )
      .then(async res => {
        let json = await res.json();
        console.log('1=>', json);

        resolve({status: true, data: json});
      })
      .catch(err => {
        console.log('Change Password Error:', err);
        reject({status: false, error: err});
      });
  });
};

export const getlevelThreeMapping = async (
  token,
  society_id,
  mapping_two_id,
) => {
  // console.log('tokken in req', body);
  return new Promise((resolve, reject) => {
    fetch(
      BASE_URL +
        END_POINTS.getSocietyMappingThree +
        `?society_id=${society_id}&mapping_two_id=${mapping_two_id}`,
      {
        method: 'Get',
        headers: {
          Accept: 'applicaiton/json',
          Authorization: 'Bearer ' + token,
          'User-Agent': `kunji_ios`,
        },
        // body: body,
      },
    )
      .then(async res => {
        let json = await res.json();
        console.log('three=>', json);

        resolve({status: true, data: json});
      })
      .catch(err => {
        console.log('Change Password Error:', err);
        reject({status: false, error: err});
      });
  });
};
export const addVehicleData = async (body, token) => {
  console.log('tokken in req', body);
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + END_POINTS.addVehicle, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'applicaiton/json',
        Authorization: 'Bearer ' + token,
        'User-Agent': `kunji_ios`,
      },
      body: body,
    })
      .then(async res => {
        let json = await res.json();
        console.log('1=>', json);
        if (json.success) {
          resolve({status: true, data: json});
        } else {
          resolve({status: false, data: json});
        }
      })
      .catch(err => {
        console.log('Change Password Error:', err);
        reject({status: false, error: err});
      });
  });
};

export const addFamilyMember = async formdata => {
  const res = await apiClient.post(
    'http://18.141.204.254/kunji-api/mobile/user/add-user-family-member',
    {
      formdata,
    },
  );

  console.log('res ==> addFamilyMember  ', res);
};
