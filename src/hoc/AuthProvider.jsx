import {createContext, useState} from 'react';
export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
	const [userInfo, setUserInfo] = useState(
			{
				email: '',
				password: '',
				loggedIn: false,
				userInOutButton: 'Войти',
				path: '/sign-in'
			});
	const {loggedIn} = userInfo;
	const signIn = (newUser, forwardIn) => {
		setUserInfo(newUser);
		console.log(userInfo);
		forwardIn();
	}
	const signOut = (forwardOut) => {
		setUserInfo({
			...userInfo,
			loggedIn: false
		})
		forwardOut();
	}
	const value = {
		userInfo,
		loggedIn,
		signIn,
		signOut
	}
	return <AuthContext.Provider value={value}>
		{children}
	</AuthContext.Provider>
}