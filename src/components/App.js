
import '../index.css';
import React from 'react';
import { api } from '../utils/Api';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";



function App() {

  const [currentUser, setCurrentUser] = React.useState({})


  //Данные пользователя и карточки
  React.useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCard()
    ])
      .then(([res, cards]) => {
        setCurrentUser(res)
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Состояние попапов 
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  //Для выбранной карточки (попап открытой картинки)
  const [selectedCard, setSelectedCard] = React.useState(null);

  //Обработчик клика по изображению (попап)
  function handleCardClick(props) {
    setSelectedCard(props);
  }

  //Обработчик для отправки данных пользователя на сервер 
  function handleUpdateUser(user) {
    api
      .setUserInfo(user.name, user.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }


  //Обработчик для обновления аватара 
  function handleUpdateAvatar(user) {
    api.addNewAvatar(user)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

//Обработчик кнопки редактирования аватарки
function handleEditAvatarClick() {
  setIsAvatarPopupOpen(true);
}

//Обработчик кнопки редактирования данных польз
function handleEditProfileClick() {
  setIsProfilePopupOpen(true);
}

//Обработчик кнопки добавления карточки
function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true);
}

 //Обработчик закрытия попапов
 function closeAllPopups() {
  setIsAddPlacePopupOpen(false);
  setIsAvatarPopupOpen(false);
  setIsProfilePopupOpen(false);
  setSelectedCard(null);
}

 //Стейт для карточек
 const [cards, setCards] = React.useState([]);

function handleCardLike(card) {
  // Снова проверяем, есть ли уже лайк на этой карточке
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  
  // Отправляем запрос в API и получаем обновлённые данные карточки
  api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  });
} 

  //Функция удаления карточки, по аналогии с функцией лайка
  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  //Функция добавления карточки
  function handleAddPlace(card) {
    api.addNewCard(card.name, card.link)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          isEditAvatarPopupOpen={handleEditAvatarClick}
          isEditProfilePopupOpen={handleEditProfileClick}
          isAddPlacePopupOpen={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          onClose={closeAllPopups}
          name="confirm-delete"
          title="Вы уверены?"
          buttonName="Да"
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
