import React, { useState } from "react";
import "./Accordion.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>
          {title}
          {isOpen ? (
            <FaAngleUp className="arrow" />
          ) : (
            <FaAngleDown className="arrow" />
          )}
        </h3>
      </div>
      {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  );
};

const App = () => {
  return (
    <div className="AccordionBody">
      <h1>Frequently Asked Questions</h1>
      <Accordion
        title="WHAT IS INKYPEN?"
        content="InkyPen is a writing platform, from Inkynovel Academy. It's a fraction of the academy that gives an opportunity to be known, recognized and appreciated to every pen bearer. We are devoted to making you bleed your pen and let creativity flow with your ink. Join other Inkers, share your amazing contents, grow your audience and become a well know author.  "
      />
      <Accordion
        title="HOW CAN I BE PART OF THIS?"
        content="It is very simple. Being part of this simply means you want to become an inker (Someone who uses his or her pen and ink to build worlds and make magics). Just register, and start sharing your amazing piece of work. With dedeciation, consistency and determination, you will see how great you will get, over time. "
      />
      <Accordion
        title="WHAT DO I GAIN FROM THIS?"
        content="We promised to make sure that every writer is appreciated for their amazing works. The more content you share on this platform, and the more points you gather over time, we will surely reward monetary. We will also make sure to always repost your amazing contents on our social media walls. This will help grow your visibility.  "
      />
    </div>
  );
};

export default App;
