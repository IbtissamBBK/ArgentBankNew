import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux";
import logo from "../assets/argentBankLogo.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {!isLoggedIn ? (
          <Link className="main-nav-item" to="/signin">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        ) : (
          <button className="main-nav-item" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i> Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
