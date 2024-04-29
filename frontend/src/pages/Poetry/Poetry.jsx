import React from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";
import PostCardPoetry from "../../component/PostCardEach/PostCardPoetry";

const Poetry = () => {
  const { textarea } = useParams();

  return (
    <div>
      <Navbar />
      <Navibar />
      <section>
        <div className="content-header">
          <h1>Poetry</h1>
        </div>
        <div>
          <PostCardPoetry />
        </div>
      </section>
    </div>
  );
};

export default Poetry;
