import PopupWithForm from './PopupWithForm.js';
import {useRef} from 'react';

export default function EditAvatarPopup(props) {
	const	{isOpen, onClose, onSubmit} = props;
	const avatarRef = useRef();

	function handleSubmit(e) {
		e.preventDefault();

		props.onUpdateAvatar({
			avatar: avatarRef.current.value
		});
		onClose();
		avatarRef.current.value = '';
	}
	return (
			<PopupWithForm title="Обновить аватар" name='add-Form'
			               buttonText="Сохранить"
			               isOpen={isOpen}
			               onClose={onClose}
			               onSubmit={handleSubmit}
			>
				<input name="link"
				       id="input-avatar"
				       placeholder="Ссылка на картинку"
				       type="url"
				       className="edit-form__input edit-form__input_type_link"
				       ref={avatarRef}
				       required
				/>
				<span className="popup__error" id="input-avatar-error"></span>
			</PopupWithForm>
	)
}