import React from "react";
import "./ContactUs.css";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import Navibar from "../../component/Navibar/Navibar";
import Contact from "../../component/Contact/Contact";

const ContactUs = () => {
  return (
    <div className="contactUsBody">
      <Navbar />
      <Navibar />
      <form action="" method="post">
        <section className="contact_us">
          <div>
            <label htmlFor="email">Your full name</label> <br />
            <input type="text" name="fullname" id="yourFullname" />
          </div>{" "}
          <br />
          <div>
            <label htmlFor="email">Your email</label> <br />
            <input
              type="email"
              name="email"
              id="yourEmail"
              placeholder="e.g damianstanley76@gmail.com"
            />
          </div>{" "}
          <br />
          <div>
            <label htmlFor="message">How can we help you?</label> <br />
            <textarea
              name="message"
              id="yourMessage"
              cols="70"
              rows="10"
            ></textarea>
          </div>{" "}
          <br />
          <button id="sendMesagebtn" type="submit">
            Send message
          </button>
        </section>
      </form>
      <Contact />
      <Footer />
    </div>
  );
};

export default ContactUs;
