import React from "react";
import Auth from "./Auth";

const Login = ({ onLogin }) => {
  return (
    <Auth
      onLogin={onLogin}
      isLoginForm={true}
      title="Вход"
      buttonText="Войти"
      autocomplete="current-password"
    ></Auth>
  );
};

export default Login;
