import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';

function Main(props) {

  const { onEditProfile, onAddPlace, onEditAvatar, onCard } = props;

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getInitialCard()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <main>
      <section className="profile">
        <img className="profile__avatar" src={userAvatar} alt="Аватарка" />
        <button type="button" className="profile__avatar-edit-button" aria-label="кнопка для изменения аватара" onClick={onEditAvatar} />
        <div className="profile__info">
          <h1 className="profile__name" id="name">{userName}</h1>
          <button className="profile__edit-button" type="button" aria-label="добавление информации" onClick={onEditProfile} />
          <p className="profile__position" id="position-job">{userDescription}</p>
        </div>
        <button className="profile__plus-button" type="button" aria-label="редактирование профиля" onClick={onAddPlace} />
      </section>
      <section className="elements" aria-label="Фотографии пользователя">
        <div className="cards">
          {cards.map((card) => (
            <Card key={card._id}
              name={card.name}
              link={card.link}
              likesAmount={card.likes.length}
              onCardClick={onCard} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Main;


