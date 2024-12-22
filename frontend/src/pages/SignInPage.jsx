// src/pages/SignInPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Importer le hook useNavigate
import { loginUser } from "../redux";
import "../styles/main.css";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialiser le hook pour la navigation
  const { isLoggedIn, error } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  // Utiliser useEffect pour rediriger après une connexion réussie
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user"); // Redirige vers la page utilisateur
    }
  }, [isLoggedIn, navigate]);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        {!isLoggedIn ? (
          <form>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button
              type="button"
              className="sign-in-button"
              onClick={handleLogin}
            >
              Sign In
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        ) : (
          <p>Redirecting...</p> // Message de redirection en cas de connexion réussie
        )}
      </section>
    </main>
  );
};

export default SignInPage;
