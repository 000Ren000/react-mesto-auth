import {createContext, useEffect, useState} from 'react';
import {auth} from '../utils/auth.js';
import {useNavigate} from 'react-router-dom';
import Preloader from '../components/Preloader.jsx';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
	const [loggedIn, setLoggedIn] = useState(false);
	const navigate = useNavigate();
	const JWT = localStorage.getItem('JWT');
	const [userInfo, setUserInfo] = useState({_id: '', email: ''});
	const [acceptMessage, setAcceptMessage] = useState(false);
	const [acceptMessageOpened, setAcceptMessageOpened] = useState(false);
	const [isTokenChecked, setIsTokenChecked] = useState(false)
	useEffect(() => {
		if (!JWT) {
			setIsTokenChecked(true)
			return navigate("/sign-in");
		}
		setIsTokenChecked(false)
		auth.checkToken(JWT)
				.then(({data}) => {
					setUserInfo(data);
					setLoggedIn(true);
				}).catch(err => {
			console.log('Проблемы с авторизацией', err);
		}).finally(() => setIsTokenChecked(true))
	}, []);
	const onLogin = (newUser) => {
		setUserInfo(newUser);
		setLoggedIn(true);
	}
	const onSignOut = () => {
		localStorage.removeItem('JWT');
		setLoggedIn(false);
	}
	const changeAcceptMessage = (accept) => {
		setAcceptMessage(accept);
	}
	const changeAcceptMessageOpened = (opened) => {
		setAcceptMessageOpened(opened);
	}
	const value = {
		userInfo,
		loggedIn,
		acceptMessage,
		acceptMessageOpened,
		changeAcceptMessageOpened,
		onLogin,
		onSignOut,
		changeAcceptMessage,
		setLoggedIn
	}
	return <AuthContext.Provider value={value}>
		{isTokenChecked ? children : <Preloader />}
	</AuthContext.Provider>
}
