import imgResFalse from '../images/res_false.png';
import imgResOk from '../images/res_ok.png';

export default function InfoTooltip(props) {
	const {isOpen, onClose, typeMessage} = props;
	const Message = () => {
		return (typeMessage) ?
				<>
					<img src={imgResOk} className="edit-form__image"/>
					<h3 className="edit-form__message">Вы успешно зарегестрировались</h3>
					<button type="button" aria-label="Закрыть"
					        className="popup__button-close link"
					        onClick={onClose}
					/>
				</>
				:
				<>
					<img src={imgResFalse} className="edit-form__image"/>
					<h3 className="edit-form__message">`{'Что-то пошло не так!\n' +
						'Попробуйте ещё раз.'}`</h3>
					<button type="button" aria-label="Закрыть"
					        className="popup__button-close link"
					        onClick={onClose}
					/>
				</>

	}
	return (
			<form name="editForm" className="edit-form" noValidate>
				<div className={`popup popup_opacity_mid ${isOpen ? 'popup_opened' : ''} `}>
					<div className="popup__conteiner">
						<Message />
						<button type="button" aria-label="Закрыть"
						        className="popup__button-close link"
						        onClick={onClose}
						/>
					</div>
				</div>
			</form>
	)
}