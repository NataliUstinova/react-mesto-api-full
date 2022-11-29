import React from "react";
import PopupWithForm from "./PopupWithForm";

const DeleteCardPopup = ({
  isOpen,
  isLoading,
  card,
  onCardDelete,
  onClose,
}) => {
  function handleCardDelete(e) {
    e.preventDefault();
    onCardDelete(card.card);
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      isLoading={isLoading}
      isDisabled={false}
      onSubmit={handleCardDelete}
      title="Are you sure?"
      button={isLoading ? "Deleting..." : "Yes"}
    />
  );
};

export default DeleteCardPopup;
