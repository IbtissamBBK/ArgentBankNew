import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from './redux';

import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import UserPage from './pages/UserPage.jsx';
import ProtectedRoute from "./components/ProtectedRoute";
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

const App = () => { 

  const dispatch = useDispatch(); 

  useEffect(() => { // Utilise un effet pour récupérer le profil utilisateur
    dispatch(fetchUserProfile()); // Récupère le profil utilisateur au démarrage
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/user" element={<ProtectedRoute><UserPage /></ProtectedRoute>}/>
      </Routes>
      <Footer />
    </>
  );
};

export default App;

