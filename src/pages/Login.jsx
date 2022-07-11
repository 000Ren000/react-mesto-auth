import {useAuth} from '../utils/useAuth.js';
import {useLocation, useNavigate} from "react-router-dom";

export function Login() {

	const navigate = useNavigate();
	const location = useLocation();
	const {signIn} = useAuth();
	const fromPage = location.state?.from?.pathname || '/';

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		signIn(
				{
					email: form.email.value,
					password: form.password.value,
					loggedIn: true,
					userInOutButton: 'Registration',
					path: '/sign-up'
				},() => navigate(fromPage, {replace: true}));

	}
	return (
			<div className="authorization">
				<form action="src/pages/Login.jsx" className="authorization__form" onSubmit={handleSubmit}>
					<div className="authorization__title">Вход</div>
					<div className="authorization__inputs-container">
						<input
								type="text"
								className="authorization__input"
								placeholder="Email"
								name="email"
						/>
						<input
								type="password"
								className="authorization__input"
								placeholder="Пароль"
								name="password"
						/>
					</div>
					<div className="authorization__buttons-container">
						<button className="authorization__button">Войти</button>
					</div>
				</form>
			</div>
	)
}