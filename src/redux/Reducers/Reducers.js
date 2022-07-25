import {USERS,TOKEN} from '../Actions/ActionsTypes';

const initialState = {
  getData: [],
  token:null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS:
      return {
        ...state,
        getData: action.payload,
      };
    case TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export {userReducer};
