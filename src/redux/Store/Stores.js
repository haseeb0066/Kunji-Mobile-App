import {createStore} from 'redux';
import {userReducer} from '../Reducers/Reducers';
const store = createStore(userReducer);
export {store};
