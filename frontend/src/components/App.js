import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import "../index.css";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import CurrentUserContext from "./../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import React from "react";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as authApi from "../utils/authApi";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  // function tokenCheck() {
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     authApi
  //       .getContent(jwt)
  //       .then((res) => {
  //         if (res) {
  //           setEmail(res.email);
  //           setLoggedIn(true);
  //           history.push("/");
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }
  
  useEffect(() => {
    authApi
      .getContent()
      .then((res) => {
        if (res) {
          setCurrentUser(res);
          setEmail(res.email);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  
  useEffect(() => {
    if (!loggedIn) return;
    
    api
      .getUserInfoServer()
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log(err));
    api
      .getInitialCards()
      .then((res) => {
        setCards(res.reverse());
        history.push("/");
      })
      .catch((err) => console.log(err));
  }, [loggedIn]);
  
  
  function handleCardClick(cardData) {
    setIsImagePopupOpen(true);
    setSelectedCard(cardData);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardDeleteClick(card) {
    setIsDeletePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsModalOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleUpdateUser(input) {
    setIsLoading(true);
    api
      .editProfile(input)
      .then((input) => {
        setCurrentUser(input);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(input) {
    setIsLoading(true);
    api
      .changeUserAvatar(input)
      .then((input) => {
        setCurrentUser(input);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  // Cards
  function handleAddPlace(newCard) {
    setIsLoading(true);
    api
      .addUserCard(newCard)
      .then((newCard) => {
        // prev для гарантии предыдущего состояния
        setCards((prev) => [newCard, ...prev]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(deletedCard) {
    setIsLoading(true);
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        setCards((state) =>
          state.filter((item) => item._id !== deletedCard._id)
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleRegister(email, password) {
    authApi
      .register(email, password)
      .then((res) => {
        if (res.email) {
          setIsSuccess(true);
          setTimeout(() => {
            handleLogin(email, password);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
      })
      .finally(() => setIsModalOpen(true));
  }

  function handleLogin(email, password) {
    authApi
      .login(email, password)
      .then(() => {
          setIsModalOpen(false);
          setLoggedIn(true);
          setEmail(email);
          history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsModalOpen(true);
      });
  }

  function handleLogout() {
    authApi.logout()
      .then(() => {
        setEmail("");
        setLoggedIn(false);
        history.push("/sign-in");
      })
      .catch((err) => {
      console.log(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          loggedIn={loggedIn}
          onLogout={handleLogout}
          link="/sign-up"
          linkText="Register"
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardBinClick={handleCardDeleteClick}
          />
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <InfoTooltip
          isOpen={isModalOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
        
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCardSubmit={handleAddPlace}
          isLoading={isLoading}
        />

        <DeleteCardPopup
          isOpen={isDeletePopupOpen}
          isLoading={isLoading}
          card={selectedCard}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />
        
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
