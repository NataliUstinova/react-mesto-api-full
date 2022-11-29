import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useValidation from "../hooks/useValidation";

const AddPlacePopup = ({ isOpen, onClose, onCardSubmit, isLoading }) => {
  const { values, errors, isDisabled, handleInputChange, resetForm } =
    useValidation({});

  function handleSubmit(e) {
    e.preventDefault();
    onCardSubmit({ name: values.name, link: values.link });
  }

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="New place"
      button={isLoading ? "Saving..." : "Add"}
      onClose={onClose}
      isDisabled={!isDisabled}
      onSubmit={handleSubmit}
    >
      <input
        id="pic-title"
        required
        minLength="2"
        maxLength="30"
        className={
          errors.name ? "popup__input popup__error_visible" : "popup__input"
        }
        type="text"
        name="name"
        value={values.name || ""}
        placeholder="Picture title"
        onChange={handleInputChange}
      />
      <span className={errors.name && "popup__input_type_error"}>
        {errors.name}
      </span>
      <input
        id="pic-link"
        required
        className={
          errors.link ? "popup__input popup__error_visible" : "popup__input"
        }
        type="url"
        name="link"
        value={values.link || ""}
        placeholder="Link to a picture"
        onChange={handleInputChange}
      />
      <span
        className={
          errors.link && "popup__input_type_error popup__input_type_error-2"
        }
      >
        {errors.link}
      </span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
