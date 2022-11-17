import React from "react";
import Popup from "./Popup";
import fail from "../images/fail.svg";
import success from "../images/success.svg";

const InfoTooltip = ({ isOpen, onClose, isSuccess }) => {
  return (
    <>
      <Popup isOpen={isOpen} onClose={onClose}>
        <div className="popup__container">
          <div className="modal__container">
            <img
              className="modal__icon"
              src={isSuccess ? success : fail}
              alt={isSuccess ? "успешно" : "не успешно"}
            />
            <h1 className="modal__heading">
              {isSuccess
                ? "Вы успешно зарегистрировались!"
                : "Что-то пошло не так! Попробуйте ещё раз."}
            </h1>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default InfoTooltip;
