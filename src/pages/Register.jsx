import {Link, useNavigate, useLocation} from 'react-router-dom'
import {useAuth} from '../utils/useAuth.js';


export function Register() {
	const {signIn} = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const fromPage = location.state?.from?.pathname || '/';
	// const fromPage =  '/';

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		signIn({
			email: form.email.value,
			password: form.password.value,
			loggedIn: false,
			userInOutButton: 'Login',
			path: '/sign-in'
		}, () => navigate(fromPage, {replace: true}))
	}
	return (
			<div className="authorization">
				<form action="src/pages/Register.jsx" className="authorization__form" onSubmit={handleSubmit}>
					<div className="authorization__title">Регистрация</div>
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
						<button className="authorization__button">Зарегистрироваться</button>
						<p className="authorization__link">Уже зарегистрированы?
							<Link className="authorization__link link" to="/sign-in"> Войти</Link>
						</p>
					</div>
				</form>
			</div>
	)
}