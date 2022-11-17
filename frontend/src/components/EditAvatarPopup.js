import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useValidation from "../hooks/useValidation";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const { values, errors, isDisabled, handleInputChange, resetForm } =
    useValidation({});

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      avatar: values.avatar,
    });
  }

  //пример с использованием useRef
  // const avatarRef = React.useRef()
  // useEffect(() => {
  //   avatarRef.current.value = ''
  // }, [isOpen])
  //
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   onUpdateUser({
  //     avatar: avatarRef.current.value
  //   });
  // }

  return (
    <PopupWithForm
      isOpen={isOpen}
      isDisabled={!isDisabled}
      title="Обновить аватар"
      button={isLoading ? "Сохранение..." : "Сохранить"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar"
        required
        //пример с использованием useRef
        // ref={avatarRef}
        value={values.avatar || ""}
        className={`popup__input ${errors.avatar && "popup__error_visible"}`}
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        onChange={handleInputChange}
      />
      <span className={errors.avatar && "popup__input_type_error"}>
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
