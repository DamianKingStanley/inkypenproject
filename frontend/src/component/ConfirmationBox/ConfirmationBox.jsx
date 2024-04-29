import React from "react";
import "./ConfirmationBox.css";

const ConfirmationBox = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-box">
      <p>{message}</p>
      <button id="ConfirmYesBtn" onClick={onConfirm}>
        Yes
      </button>
      <button id="ConfirmNoBtn" onClick={onCancel}>
        No
      </button>
    </div>
  );
};

export default ConfirmationBox;
