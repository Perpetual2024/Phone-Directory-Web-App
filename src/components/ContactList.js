import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/ContactList.css'

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true); // To show a loading state
  const [error, setError] = useState(null); // To handle errors

  const API_URI = "http://localhost:8080/contact-registry/contacts";

useEffect(() => {
  fetchContacts();
}, []);

const fetchContacts = async () => {
  try {
    const response = await axios.get(API_URI, {
      headers: {
        Accept: "application/json"
      }
    });

    console.log(response.data);
    setContacts(response.data); 
    setLoading(false); 
  } catch (error) {
    setError("Error fetching contacts. Please try again later.");
    setLoading(false);
    console.error("Error fetching contacts:", error);
  }
};

  

 

  return (
    <div className="list-container">
      <h2>📋 Available Contacts</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {contacts.length === 0 ? (
        <p>No contacts available.</p>
      ) : (
        contacts.map((contact) => (
          <div key={contact.id} className="contact-card">
            <p><strong>Name:</strong> {contact.fullName}</p>
            <p><strong>📞Phone:</strong> {contact.phoneNumber}</p>
        
            <p><strong>✉️Email:</strong> {contact.emailAddress}</p>
            <p><strong>🆔ID No:</strong> {contact.idNumber}</p>
            <p><strong>🎂DOB:</strong> {contact.dateOfBirth}</p>
            <p><strong>🧑Gender:</strong> {contact.gender}</p>
            <p><strong>🏙️County:</strong> {contact.county}</p>
            <p><strong>🏢Organization:</strong> {contact.organizationName}</p>

            
          </div>
        ))
      )}
    </div>
  );
}

export default ContactList;
