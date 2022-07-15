import logo from '../images/logo.svg';
import {Link, Outlet, useLocation} from 'react-router-dom'
import {useAuth} from '../utils/useAuth.js';


export default function Header() {
	const {userInfo, signOut, loggedIn} = useAuth();
	const location = useLocation();
	const loging = {
		linkName: 'Войти',
		link: '/sign-in'
	}
	const registration = {
			linkName: 'Регистрация',
			link: '/sign-up'
	}
		const Login = (props) => (
				!loggedIn ? <Link className="header__authorization link"
				                  to={props.logIn.link}>{props.logIn.linkName}</Link>
			: <>
					<p className="header__authorization link">{userInfo.email}</p>
					<Link className="header__authorization link" to="/sign-in"
					      onClick={signOut}>Выход</Link>
				</>
		)
	return (
			<>
				<header className="header">
					<img className="header__logo" src={logo} alt="Логотип"/>
					<Login logIn={(location.pathname === '/sign-in') ? registration : loging}/>
				</header>
				<Outlet/>
			</>
	)
}