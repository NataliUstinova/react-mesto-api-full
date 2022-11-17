import React, { useCallback, useState } from "react";

export default function useValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  function handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const eventTarget = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: eventTarget.validationMessage });

    if (name === "email" || name === "password") {
      setIsDisabled(eventTarget.closest(".auth__form").checkValidity());
    } else {
      setIsDisabled(eventTarget.closest(".popup__form").checkValidity());
    }
  }

  const resetForm = useCallback(
    (blankValues = {}, blankErrors = {}, defaultDisabled = false) => {
      setValues(blankValues);
      setErrors(blankErrors);
      setIsDisabled(defaultDisabled);
    },
    [setValues, setErrors, setIsDisabled]
  );

  return { values, errors, isDisabled, handleInputChange, resetForm };
}
