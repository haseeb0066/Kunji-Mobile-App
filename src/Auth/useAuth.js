import {useContext} from 'react';

import AuthContext from './context';
import authStorage from './Storage';

export default useAuth = () => {
  const {user, setUser} = useContext(AuthContext);

  const logIn = user => {
    // const user = jwtDecode(AuthToken);
    setUser(user);
    authStorage.storeUser(user);
  };

  const storeToken = token => {
    authStorage.storeToken(token);
  };
  const getUserToken = async () => {
    const token = await authStorage.getToken();
    return token;
  };

  const logOut = () => {
    setUser(null);
    authStorage.deleteUser();
    authStorage.deleteToken();
  };

  return {user, logOut, logIn, setUser, storeToken, getUserToken};
};
