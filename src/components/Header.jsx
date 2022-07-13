import logo from '../images/logo.svg';
import {Link, Outlet} from 'react-router-dom'
import {useAuth} from '../utils/useAuth.js';


export default function Header() {
	const {userInfo, } = useAuth();
	const {path, userInOutButton, loggedIn} = userInfo

	return (
			<>
				<header className="header">
					<img className="header__logo" src={logo} alt="Логотип"/>
					<Link className="header__authorization link" to={!loggedIn ? path : "/"}>{userInOutButton}</Link>
				</header>
				<Outlet/>
			</>
	)
}