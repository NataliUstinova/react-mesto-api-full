import React, { useContext, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "./../contexts/CurrentUserContext";
import useValidation from "../hooks/useValidation";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
}) {
  const { values, errors, isDisabled, handleInputChange, resetForm } =
    useValidation({});

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Редактировать профиль"
      button={isLoading ? "Сохранение..." : "Сохранить"}
      onClose={onClose}
      isDisabled={!isDisabled}
      onSubmit={handleSubmit}
    >
      <input
        id="profile-name"
        required
        minLength="2"
        maxLength="40"
        className={`popup__input ${errors.name && "popup__error_visible"}`}
        type="text"
        name="name"
        placeholder="Имя"
        value={values.name || ""}
        onChange={handleInputChange}
      />
      <span className={errors.name && "popup__input_type_error"}>
        {errors.name}
      </span>
      <input
        id="profile-job"
        required
        minLength="2"
        maxLength="200"
        className={`popup__input ${errors.about && "popup__error_visible"}`}
        type="text"
        name="about"
        value={values.about || ""}
        placeholder="Деятельность"
        onChange={handleInputChange}
      />
      <span
        className={
          errors.about && "popup__input_type_error popup__input_type_error-2"
        }
      >
        {errors.about}
      </span>
    </PopupWithForm>
  );
}
