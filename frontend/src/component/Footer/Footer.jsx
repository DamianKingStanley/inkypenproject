import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="FooterBody">
      <section className="footerLists">
        <ul>
          <Link to="/sponsorship">
            <li>Sponsorship</li>
          </Link>
          <Link to="/pen-bearers">
            <li>Pen Bearers</li>
          </Link>
          <Link to="/contact-us">
            <li>Contact</li>
          </Link>
          <Link to="/about-us">
            <li>About</li>
          </Link>
        </ul>
        <p> &copy; 2024 InkyNovel- Let your creativity flow on ink.</p>
      </section>
    </div>
  );
};

export default Footer;
