import logo from '../images/logo.svg';
import {Link, Outlet} from 'react-router-dom'

export default function Header({text}) {
	return (
			<>
				<header className="header">
					<img className="header__logo" src={logo} alt="Логотип"/>
					<Link className="header__authorization link" to="/sign-up">{text}</Link>
				</header>
				<Outlet />
			</>
	)
}