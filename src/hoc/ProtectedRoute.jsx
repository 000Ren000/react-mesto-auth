import {Navigate} from 'react-router-dom'
import {useAuth} from '../utils/useAuth.js';

function ProtectedRoute({children}) {
	return useAuth().loggedIn ? children : <Navigate to="/sign-in"/>
}
export default ProtectedRoute;