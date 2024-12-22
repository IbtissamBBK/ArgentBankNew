// src/redux.js
import { createSlice, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

// Slice utilisateur
const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    token: null,
    userInfo: null,
    error: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userInfo = action.payload.user;
      state.error = null;
    },
    loginFailure(state, action) {
      state.isLoggedIn = false;
      state.token = null;
      state.error = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.userInfo = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = userSlice.actions;

// Middleware pour gérer la connexion utilisateur
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', credentials);
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

