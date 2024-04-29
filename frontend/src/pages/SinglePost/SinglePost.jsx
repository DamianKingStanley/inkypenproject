import React, { useEffect, useState } from "react";
import "./SinglePost.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import convertDate from "../../utils/convertDate";
import capitalizeInitials from "../../utils/convertInitial";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";
import LikesAndViews from "../../component/LikesAndViews/LikesAndViews";
import { FaUserCircle } from "react-icons/fa";
import CommentComponent from "../../component/Comment/CommentComponent";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/post/${id}`);
        setPost(response.data.SinglePost);
      } catch (error) {
        console.log(error);
      }
    };
    id && fetchPost();
  }, [id]);

  const formatContentIntoParagraphs = (content) => {
    if (!content) {
      return null;
    }

    const paragraphs = content
      .split("\n")
      .map((paragraph, index) => <p key={index}>{paragraph}</p>);
    return paragraphs;
  };

  return (
    <div>
      <Navbar />
      <Navibar />
      <div className="single_post_container">
        <div className="single_post_details">
          {post.createdAt && <p>{convertDate(post.createdAt)}</p>}

          <div className="theUser">
            {post?.profilePicture ? (
              <img
                src={post?.profilePicture}
                alt="Profile"
                className="displaypicture"
              />
            ) : (
              <FaUserCircle className="default-avataricon" />
            )}
            {post.author && <h6>{capitalizeInitials(post.author)}</h6>}
          </div>
        </div>
        <div className="singlePostHeader">
          <div>
            <h3 id="s--choice">{post?.selectedChoice}</h3>
            <h1>{post?.title}</h1>
            <h5>{formatContentIntoParagraphs(post?.textAreaValue)}</h5>
          </div>
          <div>
            <LikesAndViews likes={post.likes} views={post.views} />
          </div>
        </div>
      </div>
      <section>
        <CommentComponent postId={id} />
      </section>
    </div>
  );
};

export default SinglePost;
