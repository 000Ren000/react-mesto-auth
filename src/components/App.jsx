import {useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {HomePage} from './hoc/HomePage.jsx';
import {Register} from './Register.jsx';
import {Login} from './Login.jsx';
import Header from './Header.jsx';
import ProtectedRoute from './hoc/ProtectedRoute.jsx';

function App() {


	return (
			<Routes>
				<Route path="/" element={<Header text="Регистрация"/>}>
					<Route path="/" element={
						<ProtectedRoute>
							<HomePage/>
						</ProtectedRoute>} />
					<Route path="sign-up" element={<Register/>}/>
					<Route path="sign-in" element={<Login/>}/>
				</Route>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
	);
}


export default App;
