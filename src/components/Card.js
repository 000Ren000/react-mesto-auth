import {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

export default function Card (props) {
	const {name, link, likes, owner} = props.card;
	const likeCounter = likes.length;
	const handleCardClick = () => {
		props.onCardClick(props.card);
	}
	const handleLikeClick = () => {
		props.onCardLike(props.card);
	}
	const handleDeleteClick = () => {
		props.onCardDelete(props.card);
	}
	const currentUser = useContext(CurrentUserContext);
	// Определяем, являемся ли мы владельцем текущей карточки
	const isOwn = owner._id === currentUser._id;
	const cardDeleteButtonClassName = (`card__trash ${isOwn ? '' : 'card__trash_hidden'}`);

	//Проверка на наш лайк
	const isLiked = props.card.likes.some(likes => likes._id === currentUser._id);

	return (
				<li className="card">
					<div className="card__border-image">
						<div style={{backgroundImage: `url(${link})`}}
						     className="card__image"
						      onClick={handleCardClick}
						/>
					</div>
					<div className="card__description">
						<h2 className="card__title">{name}</h2>
						<div className="card__like-container">
							<button type="button" className={`card__button-like ${isLiked ? 'card__button-like_active' : ''} `} onClick={handleLikeClick}></button>
							<span className="card__like-counter">{likeCounter}</span>
						</div>
					</div>
					<button className={`${cardDeleteButtonClassName} link`}
					        onClick={handleDeleteClick}
					></button>
				</li>
	)
}