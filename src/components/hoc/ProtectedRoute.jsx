import {Navigate} from 'react-router-dom'
import {useState} from 'react';
import {HomePage} from './HomePage.jsx';

function ProtectedRoute({children}) {
	const [loggedIn, setLoggedIn] = useState(true);

	if (!loggedIn) {
		return <Navigate to="/sign-in" replace/>
	}

	return children
}

export default ProtectedRoute;