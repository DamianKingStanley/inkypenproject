import React, { useState } from "react";
import "./Sponsorship.css";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";

const Sponsorship = () => {
  const [donationTo, setDonationTo] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [isDonated, setIsDonated] = useState(false);
  const [isCardPaymentUnavailable, setIsCardPaymentUnavailable] =
    useState(false);

  const handleDonationToChange = (e) => {
    setDonationTo(e.target.value);
  };

  const handlePaymentModeChange = (e) => {
    setPaymentMode(e.target.value);
    if (e.target.value === "card") {
      setIsCardPaymentUnavailable(true);
    } else {
      setIsCardPaymentUnavailable(false);
    }
  };

  const handleDonationSubmit = () => {
    setIsDonated(true);
  };
  return (
    <div className="SponsorhipBody">
      <Navbar />
      <Navibar />
      <section className="donation-form">
        <h2>Donate and Sponsor</h2>
        {!isDonated ? (
          <form>
            <div>
              <label>
                Who are you donating to?
                <select value={donationTo} onChange={handleDonationToChange}>
                  <option value="">Select an option</option>
                  <option value="platform"> InkyPen </option>
                  <option value="writer">Writer</option>
                </select>
              </label>
            </div>
            {donationTo === "writer" && (
              <div>
                <label>
                  Writer Name:
                  <input type="text" placeholder="Enter writer's name" />
                </label>
              </div>
            )}
            <div>
              <label>
                Choose payment mode:
                <select value={paymentMode} onChange={handlePaymentModeChange}>
                  <option value="">Select an option</option>
                  <option value="card">Card</option>
                  <option value="bankTransfer">Bank Transfer</option>
                </select>
              </label>
            </div>
            {isCardPaymentUnavailable && (
              <p className="cardAvailable">
                Card payment is unavailable at the moment.
              </p>
            )}
            {paymentMode === "bankTransfer" && (
              <div className="bank-details">
                <p>Bank Transfer Details:</p>
                <p>Account Name: Damian Stanley</p>
                <p>Account Number: 6555558822</p>
                <p>Bank Name: Fidelity Bank</p>
              </div>
            )}
            <button type="button" onClick={handleDonationSubmit}>
              Click me after donation!
            </button>
          </form>
        ) : (
          <div className="thankyoudonation">
            <p>Thank you for your donation!</p>
            <button onClick={() => setIsDonated(false)}>Donate Again</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Sponsorship;
