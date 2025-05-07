import React, { useState } from "react";
import axios from "axios";
import "../css/PhoneSearch.css";

const PhoneSearch = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contact, setContact] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchContactByPhone = async () => {
    if (!phoneNumber.trim()) {
      setError("Please enter a phone number.");
      return;
    }

    setLoading(true);
    setError("");
    setContact(null);

    try {
      const response = await axios.get(`http://localhost:8080/contact-registry/contacts/by-phone`, {
        params: { phoneNumber },
        headers: {
          Accept: "application/json",
        },
      });

      console.log(response.data);
      setContact(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No contact found for this phone number.");
      } else {
        setError("Failed to fetch contact. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="phone-search-container">
      <h2 className="phone-search-title">Search Contact by Phone</h2>

      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="phone-search-input"
      />
      <button onClick={fetchContactByPhone} className="phone-search-button">
        Search
      </button>

      {loading && <p className="phone-search-loading">Loading...</p>}
      {error && <p className="phone-search-error">{error}</p>}

      {contact && (
        <div className="phone-search-result">
          <h3>Contact Found:</h3>
          <p><strong>Name:</strong> {contact.name}</p>
          <p><strong>Email:</strong> {contact.emailAddress}</p>
          <p><strong>ID:</strong> {contact.idNumber}</p>
          <p><strong>County:</strong> {contact.county}</p>
          <p><strong>Gender:</strong> {contact.gender}</p>
          <p><strong>Organization:</strong> {contact.organizationName}</p>
        </div>
      )}
    </div>
  );
};

export default PhoneSearch;
