import imgResFalse from '../images/res_false.png';
import imgResOk from '../images/res_ok.png';

export default function InfoTooltip(props) {
	const {isOpen, onClose, typeMessage} = props;
	const content = (
			<>
				<img
						src={typeMessage ? imgResOk : imgResFalse}
						alt="Иконка доступа"
						className="edit-form__image"
				/>
				<h3 className="edit-form__message">
					{typeMessage
							? "Вы успешно зарегестрировались"
							: `Что-то пошло не так!
                        Попробуйте ещё раз.`}
				</h3>
			</>
	);

	return (
			<form name="editForm" className="edit-form" noValidate>
				<div
						className={`popup popup_opacity_mid ${isOpen ? "popup_opened" : ""} `}
				>
					<div className="popup__conteiner">
						{content}
						<button
								type="button"
								aria-label="Закрыть"
								className="popup__button-close link"
								onClick={onClose}
						/>
					</div>
				</div>
			</form>
	)
}