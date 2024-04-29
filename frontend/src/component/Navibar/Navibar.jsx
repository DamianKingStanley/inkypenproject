import React, { useState, useEffect, useRef } from "react";
import "./Navibar.css";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBook,
  FaFeatherAlt,
  FaNewspaper,
  FaPen,
  FaUser,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import logo from "../../assest/inkypenlogoo.png";
import { Link } from "react-router-dom";

const Navibar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavbarToggle = (event) => {
    event.stopPropagation(); // Prevent event bubbling
    toggleMenu();
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = sessionStorage.getItem("userData");
      return token !== null && token !== undefined;
    };

    setIsLoggedIn(checkLoginStatus());
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userData");
    window.location.href = "/";
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    const userData = sessionStorage.getItem("userData");

    if (userData) {
      const parsedData = JSON.parse(userData);
      setUser(parsedData);
    }
  }, []);

  return (
    <nav className={`navbar ${isOpen ? "open" : ""}`} ref={navbarRef}>
      <div className="navbar-brand">
        <Link to="/">
          <h3>
            <img id="inkylogo" src={logo} alt="" />
            INKYPEN
          </h3>
        </Link>
      </div>
      <button className="navbar-toggle" onClick={handleNavbarToggle}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <ul className={`navbar-nav ${isOpen ? "open" : ""}`}>
        <li className="nav-item">
          <Link className="nav-link" onClick={toggleMenu} to="/">
            <FaHome /> Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={toggleMenu} to="/stories">
            <FaBook /> Story
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={toggleMenu} to="/poetries">
            <FaFeatherAlt /> Poetry
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={toggleMenu} to="/articles">
            <FaNewspaper /> Articles
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={toggleMenu} to="/non-fiction">
            <FaPen /> Non-Fiction
          </Link>
        </li>
        <div>
          {isLoggedIn && (
            <div className="user-info">
              <span className="username">
                <FaUserCircle /> {user?.result?.username}
              </span>
              <ul className="user-options">
                <li>
                  <Link to={`/profile/${user?.result?.username}`}>
                    <FaUser /> Dashboard
                  </Link>
                </li>
                <li onClick={handleLogout}>
                  <FaSignOutAlt /> Log Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navibar;
