import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from './redux';
import axios from 'axios';

import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import UserPage from './pages/UserPage.jsx';
import ProtectedRoute from "./components/ProtectedRoute";
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      // Valide le token en appelant l'API du profil
      axios
        .get("http://localhost:3001/api/v1/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // Charge les infos utilisateur en cas de succès
          dispatch(
            loginSuccess({
              token,
              user: response.data.body,
            })
          );
        })
        .catch(() => {
          // Supprime les infos utilisateur si le token est invalide
          dispatch(logout());
        });
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
         {/* Utilisation de ProtectedRoute pour sécuriser la page user */}
         <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

