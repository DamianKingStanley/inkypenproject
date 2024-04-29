import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";
import "./UserPosts.css";
import convertDate from "../../utils/convertDate";
import { FaUserCircle, FaHeart, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserPosts = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [likes, setLikes] = useState({});
  const [userLikedPosts, setUserLikedPosts] = useState(new Set());
  const [views, setViews] = useState({});

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:5000/user/${userId}`
        );
        setUserData(userResponse.data.user);

        const response = await axios.get(
          `http://localhost:5000/user/${userId}/posts`
        );

        const sortedPosts = response.data.userPosts.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        const likesData = {};
        const viewsData = {};

        sortedPosts.forEach((post) => {
          likesData[post._id] = post.likes;
          viewsData[post._id] = post.views;
        });

        setLikes(likesData);
        setViews(viewsData);

        setUserPosts(sortedPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + " ............ CLICK TO READ!";
    }
    return text;
  };

  const handlePostClick = async (postId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/posts/${postId}/view`
      );
      console.log("View count updated:", response);

      // Update the view count in state
      setViews((prevViews) => ({
        ...prevViews,
        [postId]: response.data.views,
      }));

      // Navigate to single post page
      navigate(`/contents/${postId}`);
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      if (!userData || !userData.token) {
        console.error("User data is missing or invalid.");
        return;
      }

      if (userLikedPosts.has(postId)) {
        console.log("Post already liked by the current user.");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      console.log("Like response:", response);

      setUserLikedPosts(
        (prevLikedPosts) => new Set([...prevLikedPosts, postId])
      );

      if (response.status === 200) {
        setLikes((prevLikes) => ({
          ...prevLikes,
          [postId]: response.data.likes,
        }));
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="UserPostsBody">
      <Navbar />
      <Navibar />
      <div className="userpostsContainer">
        <div className="authorDetails">
          <div>
            {userData?.profilePicture ? (
              <img
                src={userData.profilePicture}
                alt="Profile"
                className="writerPicture"
              />
            ) : (
              <FaUserCircle className="default-avatar-icon" />
            )}
          </div>

          <div>
            <h1> {userData?.fullname}</h1>
            <h3>@{userData?.username}</h3>
          </div>
        </div>

        <section>
          <div>
            {loading ? (
              <p>Loading...</p>
            ) : userPosts.length === 0 ? (
              <p>No posts found.</p>
            ) : (
              <div className="UsersContents">
                {userPosts.map((post) => (
                  <div className="EachContent" key={post._id}>
                    <div className="EachContentTop">
                      <p id="s-choice">{post?.selectedChoice}</p>
                      <p>{post?.title}</p>
                      <p id="displaydate">{convertDate(post?.createdAt)}</p>
                    </div>
                    <p
                      className="content"
                      onClick={() => handlePostClick(post?._id)}
                    >
                      {truncateText(post.textAreaValue, 20)}
                    </p>
                    <div className="post_actions">
                      <FaHeart
                        id="heart"
                        className={likes[post._id] ? "liked" : ""}
                        onClick={() => handleLikePost(post._id)}
                      />
                      <span>{likes[post._id] || 0}</span>
                      <FaEye />
                      <span>{views[post._id] || 0}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserPosts;
