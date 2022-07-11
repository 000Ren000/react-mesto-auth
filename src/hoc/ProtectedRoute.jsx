import {Navigate} from 'react-router-dom'
import {useAuth} from '../utils/useAuth.js';


function ProtectedRoute({children}) {
const {loggedIn} = useAuth();
console.log(loggedIn);
	if  (!loggedIn) {
		  return <Navigate to="/sign-in" />
	}
	return children
}

export default ProtectedRoute;