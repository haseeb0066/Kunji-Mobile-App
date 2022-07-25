import {USERS,TOKEN} from './ActionsTypes';

const setUser = user => {
  console.log('===user===from===Action===redux===>>>>', user);
  return {
    type: USERS,
    payload: user,
  };
};
const setToken = token => {
  console.log('===user===from===Action===redux===>>>>', token);
  return {
    type: TOKEN,
    payload: token,
  };
};

export {setUser,setToken};
