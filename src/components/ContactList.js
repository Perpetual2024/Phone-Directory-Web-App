import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ContactList() {
  const [contacts, setContacts] = useState([]);

  const API_URI = "http://localhost:8080/contact-registry/contacts"

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(API_URI);
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URI}/${id}`);
      fetchContacts(); // refresh list
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="list-container">
      <h2>📋 Available Contacts</h2>
      {contacts.length === 0 ? (
        <p>No contacts available.</p>
      ) : (
        contacts.map((contact) => (
          <div key={contact.id} className="contact-card">
            <p><strong>Name:</strong> {contact.fullName}</p>
            <p><strong>Phone:</strong> {contact.phoneNumber}</p>
            <p><strong>Email:</strong> {contact.emailAddress}</p>
            <p><strong>ID No:</strong> {contact.idNumber}</p>
            <p><strong>DOB:</strong> {contact.dateOfBirth}</p>
            <p><strong>Gender:</strong> {contact.gender}</p>
            <p><strong>County:</strong> {contact.county}</p>
            <p><strong>Organization:</strong> {contact.organizationName}</p>

            <div className="actions">
              <button onClick={() => handleDelete(contact.id)}>🗑 Delete</button>
              <button onClick={() => alert("Redirect to Edit")}>✏️ Edit</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ContactList;