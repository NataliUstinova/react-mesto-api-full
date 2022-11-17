import Popup from "./Popup";

export default function ImagePopup({ isOpen, card, onClose }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="popup_show-pic">
        <img className="popup__full-image" src={card.link} alt={card.name} />
        <p className="popup__description">{card.name}</p>
      </div>
    </Popup>
  );
}
