import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import {
  BsHouseDoorFill,
  BsBook,
  BsCardText,
  BsBookHalf,
} from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa"; // Importing icons from React Icons
import logo from "../../assest/inkypenlogoo.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = sessionStorage.getItem("userData");
      return token !== null && token !== undefined;
    };

    setIsLoggedIn(checkLoginStatus());
  }, []);

  const handleButtonClick = () => {
    const isLoggedIn = sessionStorage.getItem("userData");
  };

  const handlePostClick = () => {
    const isLoggedIn = sessionStorage.getItem("userData");

    if (isLoggedIn) {
      window.location.href = "/post-content";
    } else {
      window.location.href = "/login";
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userData");
    window.location.href = "/";
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    // console.log("userData:", userData);

    if (userData) {
      const parsedData = JSON.parse(userData);
      setUser(parsedData);
      // console.log("user:", parsedData);
    }
  }, []);
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        if (!userData || !userData.result.id) {
          console.error("User ID is undefined");
          return;
        }

        const userId = userData.result.id;

        const response = await fetch(
          `http://localhost:5000/user/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUser({
            ...data,
            profilePicture: data.profilePicture, // Updated URL here
          });
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    getUserProfile();
  }, []);

  return (
    <div>
      <section className="navbar1">
        <div className="logo">
          <Link to="/">
            <h3>
              <img id="inkypenLogo" src={logo} alt="" />
              INKYPEN
            </h3>
          </Link>
        </div>
        <div className="nav1-items">
          <ul>
            <li>
              <Link to="/">
                <BsHouseDoorFill /> Home
              </Link>
            </li>
            <li>
              <Link to="/stories">
                <BsBook /> Fiction Story
              </Link>
            </li>
            <li>
              <Link to="/poetries">
                <BsBookHalf /> Poetry
              </Link>
            </li>
            <li>
              <Link to="/articles">
                <BsCardText /> Essay
              </Link>
            </li>
            <li>
              <Link to="/non-fiction">
                <BsBook /> Non-Fiction
              </Link>
            </li>
          </ul>
        </div>
        <div id="You">
          {isLoggedIn && (
            <div className="dropdown">
              <div
                onClick={toggleMenu}
                // className="dropdown-toggle"
                className="userImage"
              >
                {user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    alt="Profile"
                    className="profilePictureNav"
                  />
                ) : (
                  <FaUserCircle className="profileIconNav" />
                )}

                {/* <li onClick={toggleMenu} className="dropdown-toggle">
                  {user?.result?.username}
                </li> */}
              </div>
              {isOpen && (
                <ul className="dropdownMenu">
                  <li className="">
                    <Link
                      to={`/profile/${user?.result?.username}`}
                      onClick={handleButtonClick}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="" onClick={handleLogout}>
                    Log Out
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
        <div>
          <button id="post-contentBtn">
            <Link onClick={handlePostClick}>Post</Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
