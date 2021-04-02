import { useContext } from 'react';

import authStorage from './storage';
import AuthContext from './context';

import jwt from 'jwt-decode';

export default useAuth = () => {

    const {user, setUser} = useContext(AuthContext);

    const { name, rating, number, uri } = jwt(user);

    const logout = () => {
        setUser(null);
        authStorage.removeToken();
    }

    return { user, setUser, logout, name, rating, number, uri };
}
