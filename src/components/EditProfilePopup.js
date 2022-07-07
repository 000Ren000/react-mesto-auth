import PopupWithForm from './PopupWithForm.js';
import {useEffect, useState} from 'react';
import {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

export default function EditProfilePopup(props) {
	const {isOpen, onClose} = props;
	const currentUser = useContext(CurrentUserContext);
	const {name: userName, about: userDescription} = currentUser;
	useEffect(() => {
		setName(userName);
		setDescription(userDescription);
	}, [currentUser, isOpen]);

	const [name, setName] = useState(userName);
	const [description, setDescription] = useState(userDescription)

	function handleChangeName(e) {
		setName(e.target.value);
	}
	function handleChangeDescription(e) {
		setDescription(e.target.value);
	}
	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();

		// Передаём значения управляемых компонентов во внешний обработчик
		props.onUpdateUser({
			name,
			about: description,
		});
		onClose();
	}
	return (
			<PopupWithForm title="Редактировать профиль" name='edit-form'
			               buttonText="Сохранить"
			               isOpen={isOpen}
			               onClose={onClose}
			               onSubmit={handleSubmit}
			>
				<input name="name"
				       type="text"
				       className="edit-form__input edit-form__input_type_name"
				       id="input-profile-name"
				       minLength="2"
				       maxLength="40"
				       required
				       value={name}
				       onChange={handleChangeName}
				/>
				<span className="popup__error" id="input-profile-name-error"></span>
				<input name="about"
				       type="text"
				       className="edit-form__input edit-form__input_type_profession"
				       id="input-profession"
				       minLength="2"
				       maxLength="200"
				       required
				       value={description}
				       onChange={handleChangeDescription}
				/>
				<span className="popup__error" id="input-profession-error"></span>
			</PopupWithForm>
	)
}
