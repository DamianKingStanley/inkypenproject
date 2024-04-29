import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const handleButtonClick = () => {
    const isLoggedIn = sessionStorage.getItem("userData");

    if (isLoggedIn) {
      window.location.href = "/post-content";
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className="HeroSectionBody">
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <section className="HeroWriteUp">
        <h1>
          Building Worlds and Making Magic with
          <span> Pen and Ink.</span>
        </h1>
        <h3>
          Join InkyPen today, and discover amazing stories, mind-blowing
          poetries, and educating articles. You can also become an Inker. Just
          sign up and get started.
        </h3>
      </section>
      <div className="HeroActionBtn">
        <button id="SWBtn" onClick={handleButtonClick}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
