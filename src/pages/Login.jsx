import {useAuth} from '../utils/useAuth.js';
import {auth} from '../utils/auth.js';
import InfoTooltip from '../components/InfoTooltip.jsx';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export function Login() {
	const navigate = useNavigate();
	const {onLogin} = useAuth();
	const [acceptMessage, setAcceptMessage] = useState(false);
	const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false);
	const closePopup = () => {
		setIsInfoTooltipOpened(false);
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		const email = form.email.value
		const password = form.password.value;

		auth.signIn(email, password)
				.then(({token}) => {
					console.log('email:', email, 'password', password, 'token', token);
					auth.checkToken(token)
							.then((data) => {
								localStorage.setItem('JWT', token);
								onLogin(data);
								navigate("/");
							})
				}).catch(err => {
			console.log('Вход не выполнен! Так как ', err);
			setAcceptMessage(false);
			setIsInfoTooltipOpened(true);
		});
	}

	return (
			<>
				<InfoTooltip
						isOpen={isInfoTooltipOpened}
						typeMessage={acceptMessage}
						onClose={closePopup}
				/>
				<div className="authorization">
					<form action="src/pages/Login.jsx" className="authorization__form" onSubmit={handleSubmit}>
						<div className="authorization__title">Вход</div>
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
									autoComplete="on"
									required
							/>
						</div>
						<div className="authorization__buttons-container">
							<button className="authorization__button">Войти</button>
						</div>
					</form>
				</div>
			</>
	)
}