import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";
import { FaUserCircle } from "react-icons/fa";
import Footer from "../../component/Footer/Footer";

const CreatePost = ({}) => {
  const [title, setTitle] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");
  const [userPicture, setUserPicture] = useState(null); // State to store user's profile picture
  const navigate = useNavigate();
  const [errorResponse, setErrorResponse] = useState(null);

  useEffect(() => {
    const fetchUserProfilePicture = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        const userId = userData?.result?.id;
        const response = await fetch(`http://localhost:5000/user/${userId}`);
        const data = await response.json();

        setUserPicture(data.user.profilePicture); // Set user's profile picture from backend
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfilePicture();
  }, []);

  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const handleChoiceChange = (event) => {
    setSelectedChoice(event.target.value);
  };

  const getUserUsername = () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    return userData ? userData.result.username : "";
  };

  const submitForm = async () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userId = userData?.result?.id;

    const getUserToken = () => {
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      return userData ? userData.token : "";
    };

    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUserToken()}`,
        },
        body: JSON.stringify({
          title,
          author: getUserUsername(),
          textAreaValue,
          selectedChoice,
          userId,
          profilePicture: userPicture, // Include user's profile picture in the POST request body
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/");
      } else {
        const errorResponseData = await response.json();
        setErrorResponse(errorResponseData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="CreatePostBody">
      <Navbar />
      <Navibar />
      <section className="Createpost">
        {errorResponse && (
          <p className="post_response"> You must login first!</p>
        )}
        <img
          id="postProfilePicture"
          src={userPicture || <FaUserCircle className="default-avatar-icon" />}
          alt="Profile"
        />
        <h3>Choose a category</h3>
        <select
          id="Postcategories"
          value={selectedChoice}
          onChange={handleChoiceChange}
        >
          <option value="">Select an option</option>
          <option value="Story">Story</option>
          <option value="Poetry">Poetry</option>
          <option value="Essay">Essay</option>
          <option value="NonFiction">Non-Fiction</option>
        </select>
        <br /> <br />
        <label htmlFor="Author"> Author: </label> <br />
        <input
          type="text"
          name="author"
          id="postCreator"
          required
          value={getUserUsername()} // Set author input value as the user's username
          readOnly // Make the author input read-only
        />{" "}
        <br /> <br />
        <label htmlFor="Title"> Title: </label> <br />
        <input
          type="text"
          name="title"
          id="postTitle"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /> <br />
        <h3>Paste your content here:</h3>
        <textarea
          id="Postcontent"
          value={textAreaValue}
          onChange={handleTextAreaChange}
        />{" "}
        <br /> <br />
        <button id="createpostbtn" onClick={submitForm}>
          Create Post
        </button>
      </section>
      <Footer />
    </div>
  );
};

export default CreatePost;
