import React from "react";

function Card(props) {
    const { name, link, likesAmount, onCardClick } = props;

    return (
        <div className="cards__elements">
            <article className="cards__article">
                <img className="cards__photo" onClick={() => onCardClick(props)} src={link} alt="" />
                <div className="cards__flex">
                    <h2 className="cards__text">{name}</h2>
                    <div>
                        <button className="cards__like-button" type="button"></button>
                        <p className="cards__amount-likes">{likesAmount}</p>
                    </div>
                </div>
            </article>
            <button className="cards__button-remove" type="button"></button>
        </div>
    );
}



export default Card;