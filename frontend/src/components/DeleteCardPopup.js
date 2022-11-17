import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useValidation from "../hooks/useValidation";

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
      title="Вы уверены?"
      button={isLoading ? "Удаление..." : "Да"}
    />
  );
};

export default DeleteCardPopup;
