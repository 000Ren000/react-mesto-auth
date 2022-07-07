export function Register({title}) {

	return (
			<div className="authorization">
				<form action="" className="authorization__form">
					<div className="authorization__title">{title}</div>
					<div className="authorization__inputs">
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
					<div className="authorization__buttons"></div>
				</form>
			</div>
	)
}