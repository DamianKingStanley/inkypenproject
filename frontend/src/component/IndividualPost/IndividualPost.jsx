import React, { useState, useEffect, useRef } from "react";
import convertDate from "../../utils/convertDate";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./IndividualPost.css";
import ConfirmationBox from "../ConfirmationBox/ConfirmationBox";
import LikesAndViews from "../../component/LikesAndViews/LikesAndViews";

const IndividualPost = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData?.result?.id;
  const [showConfirmationBox, setShowConfirmationBox] = useState({});
  const [postToDelete, setPostToDelete] = useState(null);
  const [copiedToClipboardMap, setCopiedToClipboardMap] = useState({});

  const [dropdownOpen, setDropdownOpen] = useState(
    Array(posts.length).fill(false)
  );
  const dropdownRefs = useRef([]);

  useEffect(() => {
    const initialConfirmationState = {};
    posts.forEach((post) => {
      initialConfirmationState[post._id] = false;
    });
    setShowConfirmationBox(initialConfirmationState);
  }, [posts]);

  const getUserToken = () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    return userData ? userData.token : "";
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = (index) => {
    const newDropdownOpen = Array(posts.length).fill(false);
    newDropdownOpen[index] = !dropdownOpen[index];
    setDropdownOpen(newDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(Array(posts.length).fill(false));
  };

  const handleOutsideClick = (event) => {
    if (!dropdownRefs.current.some((ref) => ref.contains(event.target))) {
      closeDropdown();
    }
  };

  const handleDeletePost = async (postId, index) => {
    setPostToDelete(postId);
    setShowConfirmationBox({ ...showConfirmationBox, [postId]: true });
  };

  const confirmDeletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/posts/edit/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${getUserToken()}`,
          },
        }
      );
      console.log("Post deleted:", response.data);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
    setShowConfirmationBox({ ...showConfirmationBox, [postId]: false });
  };

  const cancelDeletePost = (postId) => {
    setShowConfirmationBox({ ...showConfirmationBox, [postId]: false });
  };

  const handleEditPost = async (postId) => {
    try {
      const response = await axios.get(`http://localhost:5000/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      });

      if (response.status === 200) {
        const postData = response.data;
        navigate(`/post/edit/${postId}`, { state: { postData } });
      }
    } catch (error) {
      console.error("Error editing post:", error);
    }

    closeDropdown();
  };

  const handleSharePost = (postId) => {
    const postURL = `${window.location.origin}/contents/${postId}`;
    navigator.clipboard
      .writeText(postURL)
      .then(() => {
        console.log("URL copied to clipboard:", postURL);
        setCopiedToClipboardMap((prevState) => ({
          ...prevState,
          [postId]: true,
        }));
        closeDropdown();
        setTimeout(() => {
          setCopiedToClipboardMap((prevState) => ({
            ...prevState,
            [postId]: false,
          }));
        }, 3000);
      })
      .catch((error) => {
        console.error("Failed to copy URL to clipboard:", error);
        closeDropdown();
      });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/posts/user?userId=${userId}`
        );
        const data = await response.json();
        const reversedData = data.reverse();
        setPosts(reversedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [userId]);

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + " .....see more!";
    }
    return text;
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="IndividualPostBody">
      <div className="IndividualPostWrapper">
        {posts.map((post, index) => (
          <div id="try" key={post._id}>
            <div>
              {copiedToClipboardMap[post._id] && (
                <p className="clipboard-message">
                  URL copied to clipboard. Share the link to your friends.
                </p>
              )}
              <div>
                <div className="likeAndOptions">
                  <p>{convertDate(post?.createdAt)}</p>
                  <div className="OptionsDropdown">
                    <div className="OptionsDropdown-toggle">
                      <li onClick={toggleMenu} className="">
                        Option
                      </li>
                    </div>

                    {isOpen && (
                      <ul className="action-dropdown">
                        <li onClick={() => handleEditPost(post._id)}>Edit</li>
                        <li onClick={() => handleDeletePost(post._id, index)}>
                          Delete
                        </li>
                        <li onClick={() => handleSharePost(post._id)}>Share</li>
                      </ul>
                    )}
                  </div>
                </div>
                <LikesAndViews likes={post.likes} views={post.views} />
                <h3 id="titles">{post.title}</h3>
                <p>{post.selectedChoice}</p>
                <p onClick={() => navigate(`/contents/${post?._id}`)}>
                  {truncateText(post.textAreaValue, 15)}
                </p>
              </div>
            </div>

            <div>
              {showConfirmationBox[post._id] && (
                <ConfirmationBox
                  message="Are you sure you want to delete this post?"
                  onConfirm={() => confirmDeletePost(post._id)}
                  onCancel={() => cancelDeletePost(post._id)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndividualPost;
