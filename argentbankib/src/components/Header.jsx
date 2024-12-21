// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/argentBankLogo.png";

const Header = () => {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link to="/signin" className="main-nav-item">
          <i className="fa fa-user-circle"></i> Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Header;
