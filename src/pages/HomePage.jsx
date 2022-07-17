import {CurrentUserContext} from '../contexts/CurrentUserContext.jsx';
import Main from '../components/Main.jsx';
import Footer from '../components/Footer.jsx';
import EditProfilePopup from '../components/EditProfilePopup.jsx';
import AddPlacePopup from '../components/AddPlacePopup.jsx';
import EditAvatarPopup from '../components/EditAvatarPopup.jsx';
import PopupWithForm from '../components/PopupWithForm.jsx';
import ImagePopup from '../components/ImagePopup.jsx';
import {useEffect, useState} from 'react';
import {api} from '../utils/api.js';
import {useAuth} from '../utils/useAuth.js';
import InfoTooltip from '../components/InfoTooltip.jsx';


export function HomePage() {
	const {loggedIn, acceptMessage, changeAcceptMessageOpened, acceptMessageOpened} = useAuth();
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
		myId: '', about: '', avatar: '', cohort: '', name: ''
	})

	useEffect(() => {
		if (loggedIn) {
			api
					.getUserInfo()
					.then(setCurrentUser)
					.catch((err) => console.log("что-то пошло не так", err));
			api
					.getCardInfo()
					.then((data) => {
						setCards(data.map((item) => ({ ...item, key: item._id })));
					})
					.catch((err) => console.log("что-то пошло не так", err));
		}
	}, [loggedIn]);


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

	function handleCardLike(card) {
		// Снова проверяем, есть ли уже лайк на этой карточке
		const isLiked = card.likes.some(i => i._id === currentUser._id);

		// Отправляем запрос в API и получаем обновлённые данные карточки
		api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
			setCards((state) => state.map((c) => c._id === card._id ? newCard : c));})
				.catch(err => console.log('что-то пошло не так', err));
	}

	function handleAddPlaceSubmit(data) {
		api.setNewCardInfo(data).then(newCard => {setCards([newCard, ...cards])})
				.catch(err => console.log('что-то пошло не так', err));
	}

	function handleCardDelete(card) {
		api.deleteCard(card._id).then(newCard => {setCards((state) => state.filter(c => c._id !== card._id))})
				.catch(err => console.log('что-то пошло не так', err));
	}
	const closeInfoTooltip =() => {
		changeAcceptMessageOpened(false)
	}
	return (<CurrentUserContext.Provider value={currentUser}>
		<div className='root'>
			<Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
			      onCardClick={setSelectedCard} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
			<Footer/>
			<EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
			<AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
			<EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
			<PopupWithForm title="Вы уверены?" name='add-Form' onClose={closeAllPopups} buttonText="Да"/>
			<ImagePopup card={selectedCard} onClose={closeAllPopups}/>
			<InfoTooltip isOpen={acceptMessageOpened}
			             typeMessage={acceptMessage}
			             onClose={closeInfoTooltip}
			/>
		</div>
	</CurrentUserContext.Provider>);
}
