import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header({ email, loggedIn, onLogout }) {
  const location = useLocation();

  return (
    <header className="header">
      <img src={logo} alt="Место" className="header__logo" />
      <div className="header__container">
        {loggedIn && <p className="header__email">{email}</p>}
        {loggedIn && (
          <p className="header__link header__logout" onClick={onLogout}>
            Выйти
          </p>
        )}
      </div>
      {location.pathname === "/sign-in" && (
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      )}
      {location.pathname === "/sign-up" && (
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      )}
    </header>
  );
}
