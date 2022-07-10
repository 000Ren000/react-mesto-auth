import {Link} from 'react-router-dom'
export function Register() {

	return (
			<div className="authorization">
				<form action="" className="authorization__form">
					<div className="authorization__title">Регистрация</div>
					<div className="authorization__inputs-container">
						<input
								type="text"
								className="authorization__input"
								placeholder="Email"
						/>
						<input
								type="password"
								className="authorization__input"
								placeholder="Пароль"
						/>
					</div>
					<div className="authorization__buttons-container">
						<button className="authorization__button">Зарегистрироваться</button>
						<p className="authorization__link">Уже зарегистрированы?
						<Link className="authorization__link link" to="/sign-in" > Войти</Link>
						</p>
					</div>
				</form>
			</div>
	)
}