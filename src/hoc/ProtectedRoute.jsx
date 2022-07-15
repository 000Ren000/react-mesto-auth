import {Navigate} from 'react-router-dom'
import {useAuth} from '../utils/useAuth.js';
import {auth} from '../utils/auth.js';
import {useEffect, useState} from 'react';

function ProtectedRoute({children}) {
	const {loggedIn, onLogin} = useAuth();
	const [inChecked, setInChecked] = useState(loggedIn);
	useEffect(() => {
		if (!loggedIn) {
			const JWT = localStorage.getItem('JWT');
			if (!JWT) return <Navigate to="/sign-in"/>;
			auth.checkToken(JWT)
					.then(({data}) => {
						onLogin(data);
						setInChecked(true);
					}).catch(err => console.log('Проблемы с авторизацией', err))
		}
	}, [!loggedIn])

	if (inChecked) return children;
}

export default ProtectedRoute;