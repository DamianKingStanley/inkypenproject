import React from "react";
import "./Contact.css";
import { Link } from "react-router-dom";
import email from "../../assest/email.png";
import facebook from "../../assest/facebook.png";
import instagram from "../../assest/instagram.png";
import LinkedIn from "../../assest/linkedin.png";
import whatsapp from "../../assest/whatsapp.png";

const Contact = () => {
  return (
    <div>
      <section className="contact_me">
        <h1>Contact Admin</h1>
        <section className="contactme">
          <div id="cm">
            <Link to="mailto:damianstanley76@gmail.com">
              <img src={email} alt="" />
            </Link>
            <h5>Email</h5>
            <br />
            <p>damianstanley76@gmail.com</p>
          </div>

          <div id="cm">
            <Link to="https:wa.me/message/XKFZMJLWLLMZN1">
              <img src={whatsapp} alt="" />
            </Link>
            <h5>WhatsApp</h5>
            <br />
            <p>09081090810</p>
          </div>

          <div id="cm">
            <Link to="https://www.facebook.com/damian.stanley.906">
              <img src={facebook} alt="" />
            </Link>
            <h5>Facebook</h5>

            <br />
            <p>king Damian</p>
          </div>
          <div id="cm">
            <Link to="/">
              <img src={LinkedIn} alt="" />
            </Link>
            <h5>LinkedIn</h5>

            <br />
            <p>DamianKingStanley</p>
          </div>
          <div id="cm">
            <Link to="https://www.instagram.com/damiankingstanley?igsh=OGQ5ZDc2ODk2ZA">
              <img src={instagram} alt="" />
            </Link>
            <h5>Instagram</h5>

            <br />
            <p>DamianKingStanley</p>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Contact;
