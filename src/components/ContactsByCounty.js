import React, { useState } from "react";
import axios from "axios";
import '../css/ContactCounty.css'

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
    <div className="county-container">
      <h2>Find Contacts by County</h2>

      <div className="county-search">
        <input
          type="text"
          placeholder="Enter county"
          value={county}
          onChange={(e) => setCounty(e.target.value)}
        />
        <button onClick={fetchContactsByCounty}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {contacts.length > 0 && (
        <ul className="contacts-list">
          {contacts.map((contact) => (
            <li key={contact.id}>
              <strong>{contact.fullName}</strong><br />
              📞 {contact.phoneNumber} | ✉️ {contact.emailAddress}<br />
              🆔 {contact.idNumber} | 🎂 {contact.dateOfBirth}<br />
              🧑 {contact.gender} | 🏙️ {contact.county}<br />
              🏢 {contact.organizationName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactsByCounty;
