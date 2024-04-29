import React from "react";
import { FaHeart, FaEye } from "react-icons/fa";
import "./LikesAndViews.css";

const LikesAndViews = ({ likes, views }) => {
    return ( <
        div className = "likes_views_container" >
        <
        FaHeart id = "heart" / > < span > { likes } < /span> <FaEye / > { " " } <
        span > { views } < /span>{" "} <
        /div>
    );
};

export default LikesAndViews;