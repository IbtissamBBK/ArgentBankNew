import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, loginUser } from "../redux";
import "../styles/main.css";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, error } = useSelector((state) => state.user);
  const userIsLoggedIn = useSelector(isLoggedIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  // Redirection après connexion réussie
  useEffect(() => {
    if (userIsLoggedIn && userInfo) {
      navigate("/user"); // Redirige après connexion réussie
    }

  }, [userIsLoggedIn, userInfo, navigate]);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
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
          <button
            type="button"
            className="sign-in-button"
            onClick={handleLogin}
          >
            Sign In
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </section>
    </main>
  );
};

export default SignInPage;

