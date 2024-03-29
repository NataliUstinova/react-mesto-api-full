export const BASE_URL = "https://api.mesto.nata.u.nomoredomains.icu";
// export const BASE_URL = "http://localhost:3001";

export const checkServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, email: email }),
  }).then(checkServerResponse);
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ password: password, email: email }),
  }).then(checkServerResponse);
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
    credentials: 'include',
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  }).then(checkServerResponse);
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(checkServerResponse);
};
