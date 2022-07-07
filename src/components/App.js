import {useState} from 'react';
import {Routes, Route, Navigate, Link} from "react-router-dom";
import {ProtectedRoute} from './ProtectedRoute.js';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	// const navigate = useNavigate ();

let handleOfClick = () => {
	setLoggedIn(true);
}
	return (
			<Routes>
				<Route path="sign-up" element={<div className="root"> /sign-up
				<Link to="/"><button onClick={handleOfClick}>True</button> </Link>
				</div>}/>
				<Route path="sign-in" element={<div className="root"> /sign-in</div>}/>
				<Route path="*" element={<div className="root"> not found 404</div>}/>
				<Route path="/" element={ loggedIn ? <ProtectedRoute /> : <Navigate to="sign-up" /> } />

			</Routes>
	);
}

export default App;
