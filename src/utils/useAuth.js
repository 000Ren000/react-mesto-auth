import {useContext} from 'react';
import {AuthContext} from '../hoc/AuthProvider.jsx';


export const useAuth = () => useContext(AuthContext);