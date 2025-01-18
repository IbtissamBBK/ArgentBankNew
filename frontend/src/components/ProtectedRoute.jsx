import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../redux.js";

const ProtectedRoute = ({ children }) => {
  const userIsLoggedIn = useSelector(isLoggedIn);

  if (!userIsLoggedIn) {
    // Rediriger vers /signin si l'utilisateur n'est pas connecté
    return <Navigate to="/signin" />;
  }

  // Afficher la page protégée si l'utilisateur est connecté
  return children;
};

export default ProtectedRoute;
