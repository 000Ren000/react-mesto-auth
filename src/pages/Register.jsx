import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../utils/useAuth.js';
import {auth} from '../utils/auth.js';
import {useState} from 'react';
import InfoTooltip from '../components/InfoTooltip.jsx';


export function Register() {
	const {signIn} = useAuth();
	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		const email = form.email.value
		const password = form.password.value;

		auth.signUp(email, password)
				.then(({data}) => {
					signIn(data)
					setAcceptMessage(true);
					setIsInfoTooltipOpened(true);
				}).catch(err => {
			console.log('что-то пошло не так', err);
			setAcceptMessage(false);
			setIsInfoTooltipOpened(true);
		})
	}
	const navigate = useNavigate();

	const [acceptMessage, setAcceptMessage] = useState(false);
	const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false);
	const closePopup = () => {
		setIsInfoTooltipOpened(false);
		if (acceptMessage) navigate("/");
	}
	return (
			<>
				<InfoTooltip isOpen={isInfoTooltipOpened}
				             typeMessage={acceptMessage}
				             onClose={closePopup}
				/>
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
									autoComplete="on"


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
			</>
	)
}