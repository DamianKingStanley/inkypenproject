import React from "react";
import "./AboutUs.css";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";
import { Link } from "react-router-dom";
// import Footer from "../../component/Footer/Footer";

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <Navibar />
      <section className="AboutUsSection">
        <h1>ABOUT INKYPEN</h1>
        <p>
          This is a fraction of the
          <span>
            <Link to="https://www.inkynovelwritersacademy.com.ng">
              INKYNOVEL WRITERS ACADEMY.
            </Link>
          </span>
          The Inkypen is a writing platform for all and every pen bearers,
          within and outside this country and continent. We provide writers;
          story tellers, poets and essay writers, a platform to share their
          great piece with the rest of the world.
        </p>
        <p>
          We're all about bringing your words to life and sharing your stories
          with the world. Whether you're a seasoned writer or just starting out,
          Inkypen is your place to shine.
        </p>
        <p>
          Here at Inkypen, we believe in the magic of storytelling. It's not
          just about putting words on a page; it's about connecting with others,
          sparking imagination, and making a difference. We're here to support
          you every step of the way as you explore your creativity and find your
          voice.
        </p>
        <p>
          Inkypen isn't just a platform—it's a community. It's a place where
          writers of all kinds come together to inspire, learn, and grow. From
          poetry to prose, fiction to non-fiction, there's room for everyone to
          share their passion and perspective.
        </p>
        <p>
          Our journey at Inkypen began with a simple idea: to create a space
          where writers could come together to express themselves freely and
          share their work with the world. We wanted to build more than just a
          platform; we wanted to cultivate a community—a place where writers
          could connect, support each other, and celebrate the power of
          storytelling.
        </p>
        <p>
          As we've grown, our vision has only strengthened. Inkypen is now a
          vibrant hub for writers of all backgrounds and genres. Whether you're
          writing poetry that pours from your soul, crafting intricate plots
          that keep readers on the edge of their seats, or sharing personal
          essays that resonate with others, Inkypen is your canvas.
        </p>
        <p>
          But Inkypen is more than just a place to publish your writing. It's a
          place to learn, grow, and evolve as a writer. Our platform is filled
          with resources, from writing prompts to workshops, designed to help
          you sharpen your skills and expand your horizons. And our community is
          always here to offer encouragement, feedback, and support along the
          way.
        </p>
        <p>
          Welcome to Inkypen—where every word counts, and every writer belongs.
          Let's write something amazing together!
        </p>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default AboutUs;
