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

  //example using useRef
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
      title="Update Avatar"
      button={isLoading ? "Saving..." : "Save"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar"
        required
        // example using useRef
        // ref={avatarRef}
        value={values.avatar || ""}
        className={`popup__input ${errors.avatar && "popup__error_visible"}`}
        type="url"
        name="avatar"
        placeholder="Link to an avatar"
        onChange={handleInputChange}
      />
      <span className={errors.avatar && "popup__input_type_error"}>
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
