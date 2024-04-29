import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";
import "./Dashboard.css";
import posticon from "../../assest/iconpost.png";
import { FaUserCircle } from "react-icons/fa"; // Import the book icon
import IndividualPost from "../../component/IndividualPost/IndividualPost";
import WarningAlert from "../../component/WarningAlert/WarningAlert";

const Dashboard = () => {
  const [user, setUser] = useState(null);

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
    <div className="DashboardBody">
      <Navbar />
      <Navibar />

      {user && (
        <div className="UserHeader">
          <section className="theAuthor">
            <div>
              {user?.profilePicture ? (
                <img
                  src={user?.profilePicture}
                  alt="Profile"
                  className="profilePicture"
                />
              ) : (
                <FaUserCircle className="profileIcon" />
              )}
            </div>
            <div>
              <h2>Welcome back, {user.fullname}!</h2>
              <p>Username: @{user.username}</p>
              <div className="updateAndPostBtn">
                <div className="updateOnly">
                  <Link to={`/profile/edit/${user.username}`}>
                    <button id="profileUpdateBtn">Update Profile</button>
                  </Link>
                </div>
                <div id="postContentBtn">
                  <Link to="/post-content">
                    <p>
                      <img id="posticon" src={posticon} alt="" />
                      Share a post
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      <WarningAlert />

      {user && <IndividualPost />}
    </div>
  );
};

export default Dashboard;
