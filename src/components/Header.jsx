import logo from '../images/logo.svg';
import {Link, Outlet} from 'react-router-dom'
import {useAuth} from '../utils/useAuth.js';
import {useEffect, useState} from 'react';


export default function Header() {
	const {userInfo} = useAuth();
const {path, userInOutButton} = userInfo
	 // const [path, setPath] = useState(userInfo.path)
		// const [userInOutButton, setUserInOutButton] = useState(userInfo.userInOutButton);
	 // useEffect(() => {
		// 		 setPath(userInfo.path);
		// 		 setUserInOutButton(userInfo.userInOutButton);
		// 	 }
		// 	 ,[userInfo])
	return (
			<>
				<header className="header">
					<img className="header__logo" src={logo} alt="Логотип"/>
					{/*{!loggedIn ? <Link className="header__authorization link" to="/sign-up">Регистрация</Link> :*/}
					{/*		<Link className="header__authorization link" to="/sign-in">Войти</Link>}*/}
					<Link className="header__authorization link" to={path}>{userInOutButton}</Link>
				</header>
				<Outlet/>
			</>
	)
}