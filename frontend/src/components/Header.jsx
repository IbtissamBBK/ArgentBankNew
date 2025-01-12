import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux";
import logo from "../assets/argentBankLogo.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useSelector((state) => state.user);

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
        {isLoggedIn && userInfo ? (
          <>
            {/* Affiche le username à côté du bouton logout */}
            <span className="main-nav-username">
              <strong>{userInfo.userName}</strong>
            </span>
            <Link className="main-nav-item" onClick={handleLogout}>
            <FontAwesomeIcon icon={faUserCircle} /> Logout
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/signin">
            <FontAwesomeIcon icon={faUserCircle} /> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
