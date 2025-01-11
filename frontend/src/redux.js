import { createSlice, configureStore } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/user"; // URL de l'API

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

// Middleware pour gérer la connexion utilisateur
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response =await axios.post(`${API_URL}/login`, credentials);
    const token = response.data.body.token;

    // Sauvegarder le token
    localStorage.setItem("authToken", token);
    await dispatch(fetchUserProfile()); // Récupère le profil utilisateur après connexion réussie 
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || "Login failed"));
  }
};

// Middleware pour récupérer le profil utilisateur (si nécessaire au démarrage)
export const fetchUserProfile = () => async (dispatch, getState) => {
  const token = getState().user || localStorage.getItem("authToken"); // Récupère le token

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

// Middleware pour mettre à jour le username
export const updateUsername = (newUsername) => async (dispatch, getState) => {
  const { token } = getState().user;
  try {
    const response = await axios.put(
      `${API_URL}/profile`,
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