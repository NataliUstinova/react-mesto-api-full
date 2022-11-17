import Popup from "./Popup";

export default function PopupWithForm({
  isOpen,
  title,
  button,
  children,
  onClose,
  onSubmit,
  isDisabled,
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="popup__container">
        <h3 className="popup__heading">{title}</h3>
        <form className="popup__form" noValidate onSubmit={onSubmit}>
          {children}
          <button
            className={`popup__save ${isDisabled && "popup__save_disabled"}`}
            type="submit"
          >
            {button || "Сохранить"}
          </button>
        </form>
      </div>
    </Popup>
  );
}
