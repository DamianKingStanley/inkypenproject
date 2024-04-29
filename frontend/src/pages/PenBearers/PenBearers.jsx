import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PenBearers.css";
import Loading from "../../component/Loading/Loading";

const PenBearers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const redirectToUserPosts = (userId) => {
    navigate(`/writer/${userId}/posts`);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="PenBearersSection">
      <Navbar />
      <Navibar />
      <section className="Penbearers">
        <h1>Meet our Pen Bearers</h1>
        {users.map((user) => (
          <div
            className="singularUser"
            key={user._id}
            onClick={() => redirectToUserPosts(user._id)}
          >
            <img
              src={user.profilePicture}
              alt="Profile"
              width="50"
              height="50"
              id="penbearerImage"
            />
            <span id="penbearerUsername">@{user.username}</span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PenBearers;
