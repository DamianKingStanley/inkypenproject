import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./WarningAlert.css";

const WarningAlert = ({ duration = 2000 }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Delay to allow users to read the initial message
    const initialDelayTimer = setTimeout(() => {
      setMessage("Hi there,Please update your profile before you continue");
      setVisible(true);
    }, 5000);

    // Hide the alert after the specified duration
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    // Clear initial delay timer
    return () => {
      clearTimeout(initialDelayTimer);
      clearTimeout(timer);
    };
  }, [duration]);

  const handleClose = () => {
    setVisible(false);
  };

  // Function to handle message change
  const handleNextMessage = () => {
    setMessage(
      "For security reason, when you sign in another account on the same device, please update your profile again.!"
    );
    setVisible(true);
  };

  return (
    <>
      {visible && (
        <div className="popup-container">
          <div className="popup-message">{message}</div>
          {message !== ""}
          <FaTimes className="close-button" onClick={handleClose} />
        </div>
      )}
    </>
  );
};

export default WarningAlert;
