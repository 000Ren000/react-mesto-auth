import {Navigate} from 'react-router-dom'
import {useAuth} from '../utils/useAuth.js';


function ProtectedRoute({children}) {
	const {loggedIn} = useAuth(); //получение глобальной переменной
	if (loggedIn) return children;
	else return <Navigate to="/sign-in"/>;
}

export default ProtectedRoute;