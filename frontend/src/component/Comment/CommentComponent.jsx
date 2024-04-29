import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Comment.css";

const CommentComponent = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editComment, setEditComment] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [userPicture, setUserPicture] = useState(null);
  const [userUsername, setUserUsername] = useState(null);
  // const [loggedInCommenter, setLoggedInCommenter] = useState(null);

  useEffect(() => {
    const fetchUserProfilePicture = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        const userId = userData?.result?.id;
        const response = await fetch(`http://localhost:5000/user/${userId}`);
        const data = await response.json();
        setUserPicture(data.user.profilePicture);
        setUserUsername(data.user.username); // Set user's profile picture from backend
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfilePicture();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/comments/${postId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const loggedInUserData = sessionStorage.getItem("userData");
  const loggedInUser = JSON.parse(loggedInUserData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userId = loggedInUser.result.id;
      const username = userUsername;
      const profilePicture = userPicture;
      const response = await axios.post(
        `http://localhost:5000/${postId}/comments`,
        {
          content: newComment,
          postId: postId,
          createdBy: userId,
          username: username,
          profilePicture: profilePicture,
        }
      );
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleEdit = (commentId, initialContent) => {
    setEditComment(commentId);
    setEditedContent(initialContent);
  };

  const handleSaveEdit = async (commentId, updatedContent) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/${postId}/comments/${commentId}`,
        {
          content: updatedContent,
        }
      );
      const updatedComments = comments.map((comment) =>
        comment._id === commentId ? response.data : comment
      );
      setComments(updatedComments);
      setEditComment(null);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditComment(null);
    setEditedContent("");
  };

  const handleDelete = (commentId) => {
    setDeleteConfirmation(commentId);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/${postId}/comments/${deleteConfirmation}`
      );
      const filteredComments = comments.filter(
        (comment) => comment._id !== deleteConfirmation
      );
      setComments(filteredComments);
      setDeleteConfirmation(null);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  return (
    <div>
      {!loggedInUser && (
        <div className="loginCommentMessage">
          <p>Please log in to comment.</p>
        </div>
      )}
      <form className="comment-container" onSubmit={handleSubmit}>
        <p>Add Comments</p>
        <input
          type="text"
          value={newComment}
          onChange={handleInputChange}
        />{" "}
        <br /> <br />
        <button id="postCommentBtn" type="submit">
          Post comment
        </button>
      </form>
      <div className="postedComments">
        <p>Comments</p>
        {deleteConfirmation && (
          <div className="deleteConfirm">
            <p>Are you sure you want to delete this comment?</p>
            <button onClick={confirmDelete}>Confirm</button>
            <button onClick={cancelDelete}>Cancel</button>
          </div>
        )}
        {comments.map((comment) => (
          <div key={comment._id}>
            {editComment === comment._id ? (
              <div className="EditComment">
                <input
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <button
                  onClick={() => handleSaveEdit(comment._id, editedContent)}
                >
                  Save
                </button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div className="commentAction">
                <div className="commentInfo">
                  <img
                    id="commentersPicture"
                    src={comment.profilePicture}
                    alt="Profile"
                  />
                  <p>@{comment.username} says:</p>
                </div>
                <h1>{comment.content}</h1>
                <div className="editDelete">
                  {loggedInUser &&
                    loggedInUser.result.id === comment.createdBy && (
                      <>
                        <p
                          onClick={() =>
                            handleEdit(comment._id, comment.content)
                          }
                        >
                          Edit
                        </p>
                        <p onClick={() => handleDelete(comment._id)}>Delete</p>
                      </>
                    )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentComponent;
