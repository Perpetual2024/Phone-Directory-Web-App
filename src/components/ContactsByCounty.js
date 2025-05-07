import React, { useState } from "react";
import axios from "axios";

const ContactsByCounty = () => {
  const [county, setCounty] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchContactsByCounty = async () => {
    if (!county.trim()) {
      setError("Please enter a county.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:8080/contact-registry/contacts/by-county?county=${encodeURIComponent(county)}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      setContacts(response.data);
    } catch (err) {
      setError("Failed to fetch contacts.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Find Contacts by County</h2>
      <input
        type="text"
        placeholder="Enter county"
        value={county}
        onChange={(e) => setCounty(e.target.value)}
      />
      <button onClick={fetchContactsByCounty}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {contacts.length > 0 && (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              {contact.fullName} - {contact.phoneNumber} - {contact.emailAddress} - {contact.idNumber}-{contact.dateOfBirth} - {contact.gender} - {contact.county} - {contact.organizationName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactsByCounty;
