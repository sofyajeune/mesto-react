
import '../index.css';
import React from 'react';

import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick(card) {
    setImagePopupOpen(true)
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
  };


  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={() => setIsEditProfilePopupOpen(true)}
        onAddPlace={() => setIsAddPlacePopupOpen(true)}
        onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
        onCard={handleCardClick} />
      <Footer />
      <PopupWithForm
        name="edit-form"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <input type="text" name="name" className="popup__input popup__input_data_name" id="data_name" minLength={2} maxLength={40} placeholder="Имя" required />
            <span className="popup__form-input-error" id="data_name-error" />
            <input type="text" name="about" className="popup__input popup__input_data_job" id="data_job" minLength={2} maxLength={200} placeholder="О себе" required />
            <span className="popup__form-input-error" id="data_job-error" />
            <button className="popup__save" type="submit" aria-label="сохранить">Сохранить</button>
          </>
        }
      />
      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <input id="input-avatar" type="url" name="avatar" className="popup__input popup__input_avatar" defaultValue required />
            <span id="input-avatar-error" className="popup__form-input-error" />
            <button className="popup__save" type="submit" aria-label="сохранить">Сохранить</button>
          </>
        }
      />
      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        children={
          <>
            <button type="submit" className="popup__save" name="#submit-delete-card">Да</button>
          </>
        }
      />
      <PopupWithForm
        name="add-card"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <input type="text" name="name" className="popup__input popup__input_data_photo" id="data_photo" placeholder="Название" minLength={2} maxLength={30} required />
            <span className="popup__form-input-error" id="data_photo-error" />
            <input type="url" name="link" className="popup__input popup__input_data_url" id="data_url" placeholder="Ссылка на картинку" required />
            <span className="popup__form-input-error" id="data_url-error" />
            <button className="popup__save" type="submit" aria-label="создать">Создать</button>
          </>
        }
      />
      <ImagePopup
        name="open-image"
        selectedCard={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
      />
    </div>
  );
}

export default App;
