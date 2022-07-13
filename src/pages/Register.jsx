import {Link, useNavigate, useLocation} from 'react-router-dom'
import {useAuth} from '../utils/useAuth.js';
import {auth} from '../utils/auth.js';


export function Register() {
	const {signIn} = useAuth();
	const navigate = useNavigate();

	const createAccaunt = (email, password) => {
		auth.signUp(email, password)
				.then(data => {
							console.log(data);
				}).catch(err => console.log('что-то пошло не так', err))
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		const email = form.email.value
		const password = form.password.value;

		auth.signUp(email, password)
				.then(data => {
					console.log(data);
					signIn({
						email: data.email,
						password: data.password,
						loggedIn: true,
						userInOutButton: 'Выход',
						path: '/'
					}, () => navigate("/", {replace: true}));
				}).catch(err => {
			console.log('что-то пошло не так', err)
			signIn({
				email: '',
				password: '',
				loggedIn: false,
				userInOutButton: 'Вход',
				path: '/'
			}, () => navigate("/", {replace: true}));
		})



	}
	return (
			<div className="authorization">
				<form action="src/pages/Register.jsx" className="authorization__form" onSubmit={handleSubmit}>
					<div className="authorization__title">Регистрация</div>
					<div className="authorization__inputs-container">
						<input
								type="email"
								className="authorization__input"
								placeholder="Email"
								name="email"
								required

						/>
						<input
								type="password"
								className="authorization__input"
								placeholder="Пароль"
								name="password"
								required


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