import React, { useState } from "react";
import axios from "axios";

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
          
    console.log(response.data)
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
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Search Contact by Phone</h2>

      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border border-gray-300 p-2 mr-2 rounded"
      />
      <button
        onClick={fetchContactByPhone}
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
      >
        Search
      </button>

      {loading && <p className="mt-2">Loading...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {contact && (
        <div className="mt-4 p-4 border rounded shadow bg-gray-50">
          <h3 className="text-lg font-bold mb-2">Contact Found:</h3>
          <p><strong>Name:</strong> {contact.name}</p>
          <p><strong>Email:</strong> {contact.emailAddress}</p>
          <p><strong>ID:</strong> {contact.idNumber}</p>
          <p><strong>County:</strong> {contact.county}</p>
          <p><strong>Gender:</strong>{contact.gender}</p>
          <p><strong>Organization:</strong> {contact.organizationName}</p>
        </div>
      )}
    </div>
  );
};

export default PhoneSearch;
