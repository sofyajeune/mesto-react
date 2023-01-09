function PopupWithForm(props) {

  const { name, title, children, isOpen, onClose, buttonName } = props;

  return (
    <div className={`popup popup_type_${props.name} ${isOpen ? "popup_opened" : ""}`}
      onClick={(evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          onClose();
        }
      }}>
      <div className="popup__container">
        <button id="closebutton-edit-form" className="popup__close-button" onClick={onClose} type="button" aria-label="закрыть окно" />
        <form className="popup__form" name={name} onSubmit={onClose} noValidate>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__save" type="submit" aria-label="создать">{buttonName}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;