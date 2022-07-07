import {useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {ProtectedRoute} from './ProtectedRoute.js';
import {Register} from './Register.js';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	return (
			<Routes>
				<Route path="sign-up" element={<Register title="Регистрация"/>}/>
				<Route path="sign-in" element={<div className="root"> /sign-in</div>}/>
				<Route path="/" element={ loggedIn ? <ProtectedRoute /> : <Navigate to="sign-up" /> } />
				<Route path="*" element={ loggedIn ? <Navigate to="/"/> : <Navigate to="sign-up" /> } />
			</Routes>
	);
}




export default App;
