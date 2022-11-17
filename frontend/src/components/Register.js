import React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";

const Register = ({ onRegister }) => {
  return (
    <Auth
      onRegister={onRegister}
      isLoginForm={false}
      title="Регистрация"
      autocomplete="new-password"
    >
      <div className="auth__text-container">
        <p className="auth__text">Уже зарегистрированы?</p>
        <Link to={"/sign-in"} className="auth__text auth__link">
          Войти
        </Link>
      </div>
    </Auth>
  );
};

export default Register;
