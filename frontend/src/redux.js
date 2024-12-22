// src/redux.js
import { createSlice, configureStore } from "@reduxjs/toolkit";
import axios from "axios";

// Slice utilisateur
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: !!localStorage.getItem("authToken"), // Vérifie si un token existe
    token: localStorage.getItem("authToken") || null, // Charge le token si présent
    userInfo: null, // Les informations utilisateur ne sont pas chargées au démarrage
    error: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userInfo = action.payload.user;
      state.error = null;
      // Sauvegarde le token dans localStorage
      localStorage.setItem("authToken", action.payload.token);
    },
    loginFailure(state, action) {
      state.isLoggedIn = false;
      state.token = null;
      state.error = action.payload;
      // Supprime le token en cas d'erreur
      localStorage.removeItem("authToken");
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.userInfo = null;
      // Supprime le token de localStorage
      localStorage.removeItem("authToken");
    },
  },
});

export const { loginSuccess, loginFailure, logout } = userSlice.actions;

// Middleware pour gérer la connexion utilisateur
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      credentials
    );
    dispatch(loginSuccess(response.data.body));
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};

// Configurez le store Redux
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
