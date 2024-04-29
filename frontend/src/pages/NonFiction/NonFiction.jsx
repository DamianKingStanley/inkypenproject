import React from "react";
import { useParams } from "react-router-dom";
import Navibar from "../../component/Navibar/Navibar";
import Navbar from "../../component/Navbar/Navbar";
import PostCardNonFiction from "../../component/PostCardEach/PostCardNonFiction";

const NonFiction = () => {
  return (
    <div>
      <Navbar />
      <Navibar />
      <section>
        <div className="content-header">
          <h1>Non-Fiction</h1>
        </div>
        <div>
          <PostCardNonFiction />
        </div>
      </section>
    </div>
  );
};

export default NonFiction;
