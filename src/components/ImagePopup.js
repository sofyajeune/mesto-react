function ImagePopup(props) {

    const { name, selectedCard, onClose, isOpen } = props;

    return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
    onClick={(evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        onClose();
      }
    }}
    >
        <div className="popup__container popup__container_type_open-image">
            <button onClick={onClose} className="popup__close-button" type="button" />
            <figure className="popup__photo">
                <img className="popup__image" src={selectedCard.link} alt={selectedCard.name} />
                <figcaption className="popup__caption">{selectedCard.name}</figcaption> 
            </figure>
        </div>
    </div>
    )
}

export default ImagePopup;