import { createSlice, configureStore } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/user"; // URL de l'API

export const isLoggedIn = (state) => {
  if (!state.user.token) {
  return false;
 }
 const isExpired = parseJwt(state.user.token).exp < Date.now() / 1000;
 if (isExpired) {
  localStorage.removeItem("authToken");
  return false;
 }
 return true;
}

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

// Slice utilisateur
const userSlice = createSlice({ // Crée un slice Redux pour gérer les informations utilisateur 
  name: "user",
  initialState: {
    token: localStorage.getItem("authToken") || null, // Charge le token si présent
    userInfo: null, // Les informations utilisateur ne sont pas chargées au démarrage
    error: null,
  },
  reducers: { // Reducers pour gérer les actions Redux 
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.userInfo = action.payload.user;
      state.error = null;
      localStorage.setItem("authToken", action.payload.token);
    },
    loginFailure(state, action) {
      state.token = null;
      state.error = action.payload;
      localStorage.removeItem("authToken");
    },
    logout(state) {
      state.token = null;
      state.userInfo = null;
      localStorage.removeItem("authToken");
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    updateUserInfo(state, action) {
      if (state.userInfo) {
        state.userInfo.userName = action.payload.userName;
      }
    },
  },
});

export const { loginSuccess, loginFailure, logout, setUserInfo, updateUserInfo } =
  userSlice.actions;

  
// Middleware : connexion utilisateur 
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response =await axios.post(`${API_URL}/login`, credentials);
    const token = response.data.body.token;

    // Récupérer le profil utilisateur directement
    const userResponse = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(loginSuccess({ token, user: userResponse.data.body }));
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || "Login failed"));
  }
};


// Middleware : récupère le profil utilisateur
export const fetchUserProfile = () => async (dispatch, getState) => {
  const { token } = getState().user; // Récupère le token

  if (!token) return;

  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(setUserInfo(response.data.body));
  } catch (error) {
    console.error("Erreur lors de la récupération du profil utilisateur :", error);
    dispatch(logout());
  }
};


// Middleware : mise à jour du nom d'utilisateur
export const updateUsername = (newUsername) => async (dispatch, getState) => {
  const { token } = getState().user;
  try {
    const response = await axios.put(`${API_URL}/profile`,
      { userName: newUsername },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(updateUserInfo(response.data.body)); // Met à jour userInfo dans Redux
  } catch (error) {
    console.error("Erreur mise à jour username:", error.message);
  }
};

// Configurez le store Redux
export default configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});