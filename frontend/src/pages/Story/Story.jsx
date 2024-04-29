import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";
import PostCardStory from "../../component/PostCardEach/PostCardStory";

const Story = () => {
  return (
    <div>
      <Navbar />
      <Navibar />

      <section>
        <div className="content-header">
          <h1>Fictions</h1>
        </div>
        <div>
          <PostCardStory />
        </div>
      </section>
    </div>
  );
};

export default Story;
