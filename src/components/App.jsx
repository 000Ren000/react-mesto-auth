import {Navigate, Route, Routes} from "react-router-dom";
import {HomePage} from '../pages/HomePage.jsx';
import {Register} from '../pages/Register.jsx';
import {Login} from '../pages/Login.jsx';
import Header from './Header.jsx';
import ProtectedRoute from '../hoc/ProtectedRoute.jsx';
import {AuthProvider} from '../hoc/AuthProvider.jsx';

function App() {


	return (
			<AuthProvider>
				<Routes>

					<Route path="/" element={<Header />}>
						<Route path="*" element={<Navigate to="/"/>}/>
						<Route path="/" element={
							<ProtectedRoute>
								<HomePage/>
							</ProtectedRoute>}/>
						<Route path="sign-in" element={<Login/>}/>
						<Route path="sign-up" element={<Register/>}/>

					</Route>

				</Routes>
			</AuthProvider>
	);
}


export default App;
