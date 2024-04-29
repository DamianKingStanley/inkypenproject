import React, { useState } from "react";
import axios from "axios";
import "./Comment.css";

const CommentForm = ({ postId, refreshComments }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loggedInUserData = sessionStorage.getItem("userData");
    const loggedInUser = JSON.parse(loggedInUserData);

    try {
      const userId = loggedInUser.result.id; // Accessing the user ID from the 'result' property
      const response = await axios.post(
        `http://localhost:5000/${postId}/comments`,
        {
          content: comment,
          post: postId,
          createdBy: userId, // Using the user ID for the 'createdBy' field
        }
      );
      console.log(response.data);
      // If successful, refresh comments
      refreshComments();
      // Clear comment input
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={handleCommentChange}
        placeholder="Enter your comment..."
        required
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
