import React from "react";
import "./Articles.css";
import { useParams } from "react-router-dom";
import Navibar from "../../component/Navibar/Navibar";
import Navbar from "../../component/Navbar/Navbar";
import PostCardEssay from "../../component/PostCardEach/PostCardEssay";

const Articles = () => {
  const { textarea } = useParams();
  return (
    <div>
      <Navbar />
      <Navibar />
      <div className="content-header">
        <h1>Articles</h1>
      </div>
      <div>
        <PostCardEssay />
      </div>
    </div>
  );
};

export default Articles;
