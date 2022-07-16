import {createContext, useEffect, useState} from 'react';
import {auth} from '../utils/auth.js';
import {useNavigate} from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
	const [loggedIn, setLoggedIn] = useState(false);
	const navigate = useNavigate();
	const JWT = localStorage.getItem('JWT');
	const [userInfo, setUserInfo] = useState({_id: '', email: ''});
	useEffect(() => {
		if (!JWT) return navigate("/sign-in");
		auth.checkToken(JWT)
				.then(({data}) => {
					setUserInfo(data);
					setLoggedIn(true);
				}).catch(err => {
			console.log('Проблемы с авторизацией', err);
		})
	}, []);
	const onLogin = (newUser) => {
		setUserInfo(newUser);
		setLoggedIn(true);
	}
	const onSignOut = () => {
		localStorage.removeItem('JWT');
		setLoggedIn(false);
	}
	const value = {
		userInfo,
		loggedIn,
		onLogin,
		onSignOut,
		setLoggedIn
	}
	return <AuthContext.Provider value={value}>
		{children}
	</AuthContext.Provider>
}
