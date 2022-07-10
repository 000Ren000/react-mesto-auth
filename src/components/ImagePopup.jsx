export default function ImagePopup ({card, onClose}) {
	const {name, link} = card;
	return (
			<div className={`popup popup_opacity_hard ${link !== '' ? 'popup_opened' : ''}`}
			     id="image-popup">
				<div className="popup__image-conteiner">
					<img src={link} alt={name} className="popup__image"/>
					<p className="popup__image-description">{name}</p>
					<button className="popup__button-close link"
					onClick={onClose}></button>
				</div>
			</div>
	)
}