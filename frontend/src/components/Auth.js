import React from "react";
import useValidation from "../hooks/useValidation";

const Auth = ({
  title,
  autocomplete,
  children,
  isLoginForm,
  onLogin,
  onRegister,
}) => {
  const { values, errors, isDisabled, handleInputChange } = useValidation({});

  function handleSubmit(e) {
    e.preventDefault();
    {
      isLoginForm
        ? onLogin(values.email, values.password)
        : onRegister(values.email, values.password);
    }
  }

  return (
    <div className="auth__container">
      <h1 className="auth__title">{title}</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          id="sign-up-email"
          autoComplete="email"
          required
          minLength="2"
          maxLength="40"
          className={`popup__input auth__input ${
            errors.email && "auth__error_visible"
          }`}
          type="email"
          name="email"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleInputChange}
        />
        <span className={errors.email && "auth__input_type_error"}>
          {errors.email}
        </span>
        <input
          id="pswd"
          autoComplete={autocomplete}
          required
          minLength="6"
          maxLength="200"
          className={`popup__input auth__input ${
            errors.password && "auth__error_visible"
          }`}
          type="password"
          name="password"
          value={values.password || ""}
          placeholder="Пароль"
          onChange={handleInputChange}
        />
        <span
          className={
            errors.password && "auth__input_type_error auth__input_type_error-2"
          }
        >
          {errors.password}
        </span>
        <button
          className={
            !isDisabled ? "auth__button auth__button_disabled" : "auth__button"
          }
          type="submit"
        >
          {isLoginForm ? "Войти" : "Зарегистрироваться"}
        </button>
        {children}
      </form>
    </div>
  );
};

export default Auth;
