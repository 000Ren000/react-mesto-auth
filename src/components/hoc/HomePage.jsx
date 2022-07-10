import {CurrentUserContext} from '../../contexts/CurrentUserContext.jsx';
import Header from '../Header.jsx';
import Main from '../Main.jsx';
import Footer from '../Footer.jsx';
import EditProfilePopup from '../EditProfilePopup.jsx';
import AddPlacePopup from '../AddPlacePopup.jsx';
import EditAvatarPopup from '../EditAvatarPopup.jsx';
import PopupWithForm from '../PopupWithForm.jsx';
import ImagePopup from '../ImagePopup.jsx';
import {useEffect, useState} from 'react';
import {api} from '../../utils/Api.js';


export function HomePage() {

const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
const [selectedCard, setSelectedCard] = useState({name: '', link: ''});

const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
const handleAddPlaceClick = () => setAddPlacePopupOpen(true);
const closeAllPopups = () => {
	setEditAvatarPopupOpen(false);
	setIsEditProfilePopupOpen(false);
	setAddPlacePopupOpen(false);
	setSelectedCard({name: '', link: ''});
}

//Данные о пользователе
const [currentUser, setCurrentUser] = useState({
	myID: '',
	about: '',
	avatar: '',
	cohort: '',
	name: ''
})
useEffect(() => {
	api.getUserInfo().then(setCurrentUser
	).catch(err => console.log('что-то пошло не так', err));
}, []); 	//Получение данных о пользователе

const handleUpdateUser = (data) => {
	api.setUserInfo(data).then(setCurrentUser)
			.catch(err => console.log('что-то пошло не так', err));
}
const handleUpdateAvatar = (data) => {
	api.changeAvatar(data.avatar).then(setCurrentUser)
			.catch(err => console.log('что-то пошло не так', err));
}

//Получение массива с карточками
const [cards, setCards] = useState([]);
useEffect(() => {
	api.getCardInfo().then(data => {
		setCards(data.map(item => ({...item, key: item._id})
		));
	})
			.catch(err => console.log('что-то пошло не так', err));
}, []);


function handleCardLike(card) {
	// Снова проверяем, есть ли уже лайк на этой карточке
	const isLiked = card.likes.some(i => i._id === currentUser._id);

	// Отправляем запрос в API и получаем обновлённые данные карточки
	api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
		setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
	})
			.catch(err => console.log('что-то пошло не так', err));
}

function handleAddPlaceSubmit(data) {
	api.setNewCardInfo(data).then(newCard => {
		setCards([newCard, ...cards])
	})
			.catch(err => console.log('что-то пошло не так', err));
}

function handleCardDelete(card) {
	api.deleteCard(card._id).then(newCard => {
		setCards((state) => state.filter(c => c._id !== card._id))
	})
			.catch(err => console.log('что-то пошло не так', err));
}


	return (
			<CurrentUserContext.Provider value={currentUser}>
				<div className='root'>

					<Main onEditProfile={handleEditProfileClick}
					      onAddPlace={handleAddPlaceClick}
					      onEditAvatar={handleEditAvatarClick}
					      onCardClick={setSelectedCard}
					      cards={cards}
					      onCardLike={handleCardLike}
					      onCardDelete={handleCardDelete}
					/>
					<Footer/>
					<EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
					                  onUpdateUser={handleUpdateUser}
					/>

					<AddPlacePopup isOpen={isAddPlacePopupOpen}
					               onClose={closeAllPopups}
					               onAddPlace={handleAddPlaceSubmit}
					/>

					<EditAvatarPopup isOpen={isEditAvatarPopupOpen}
					                 onClose={closeAllPopups}
					                 onUpdateAvatar={handleUpdateAvatar}
					/>


					<PopupWithForm title="Вы уверены?" name='add-Form'
					               onClose={closeAllPopups}
					               buttonText="Да"
					/>

					<ImagePopup card={selectedCard} onClose={closeAllPopups}/>

				</div>
			</CurrentUserContext.Provider>
	);
}