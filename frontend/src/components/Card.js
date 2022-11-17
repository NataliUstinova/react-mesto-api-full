import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({
  card,
  onCardClick,
  onCardLike,
  onCardBinClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwned = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete ${
    isOwned ? "card__delete-button_visible" : "card__delete-button_hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

  function handleClick() {
    onCardClick({ name: card.name, link: card.link });
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="card card__element">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={() => onCardBinClick({ card })}
      />
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__info">
        <h3 className="card__title">{card.name}</h3>
        <div className="card__like-wrapper">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится"
          ></button>
          <p className="card__like-counter">
            {card.likes.length > 0 ? card.likes.length : ""}
          </p>
        </div>
      </div>
    </li>
  );
}
