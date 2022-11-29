import React, { useEffect } from "react";

const Popup = ({ isOpen, onClose, children }) => {
  function closeByEsc(e) {
    if (e.key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", closeByEsc);
    }
    return () => {
      document.removeEventListener("keydown", closeByEsc);
    };
  }, [isOpen]);

  function handleCloseOverlay(e) {
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains("popup__close")
    ) {
      onClose();
    }
  }

  return (
    <div
      className={`popup ${isOpen && "popup_opened"}`}
      onClick={handleCloseOverlay}
    >
      <div className="popup__relative-container">
        {children}
        <button
          className="popup__close"
          type="button"
          aria-label="close"
        ></button>
      </div>
    </div>
  );
};

export default Popup;
