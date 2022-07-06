import PopupWithForm from './PopupWithForm.js';
import {useEffect, useState} from 'react';

export default function (
		{
			isOpen,
			onClose,
			onAddPlace
		}) {
	const [name, setName] = useState('');
	const [link, setLink] = useState('');
	useEffect(() => {
		setName('');
		setLink('');
	}, [isOpen])
	function handleChangeName(e) {
		setName(e.target.value);
	}
	function handleChangeLink(e) {
		setLink(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		onAddPlace({name, link});
		onClose();
	}

	return (
			<PopupWithForm title="Новое место" name='add-Form'
			               buttonText="Создать"
			               isOpen={isOpen}
			               onClose={onClose}
			               onSubmit={handleSubmit}
			>
				<input name="name"
				       id="input-name"
				       placeholder="Название"
				       type="text"
				       className="edit-form__input edit-form__input_type_name "
				       minLength="2"
				       maxLength="30"
				       required
				       onChange={handleChangeName}
				       value={name}
				/>
				<span className="popup__error" id="input-name-error"></span>
				<input name="link"
				       id="input-link"
				       placeholder="Ссылка на картинку"
				       type="url"
				       className="edit-form__input edit-form__input_type_link"
				       required
				       onChange={handleChangeLink}
				       value={link}
				/>
				<span className="popup__error" id="input-link-error"></span>
			</PopupWithForm>
	)
}