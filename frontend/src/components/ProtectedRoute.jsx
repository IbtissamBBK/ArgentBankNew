import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  if (!isLoggedIn) {
    // Rediriger vers /signin si l'utilisateur n'est pas connecté
    return <Navigate to="/signin" />;
  }

  // Afficher la page protégée si l'utilisateur est connecté
  return children;
};

export default ProtectedRoute;
