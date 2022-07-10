export function Login() {

	return (
			<div className="authorization">
				<form action="" className="authorization__form">
					<div className="authorization__title">Вход</div>
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
						<button className="authorization__button">Войти</button>
					</div>
				</form>
			</div>
	)
}