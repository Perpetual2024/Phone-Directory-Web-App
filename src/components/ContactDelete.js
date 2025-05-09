import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ContactDelete() {
  const { id } = useParams(); // Get contact ID from URL
  const [contact, setContact] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchContactById(id); // Fetch contact details before confirming deletion
    }
  }, [id]);

  const fetchContactById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/contact-registry/contacts/${id}`);
      setContact(response.data); // Set contact data
    } catch (error) {
      setError("Error fetching contact: " + error.message);
      console.error("Error fetching contact:", error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this contact?");
    if (!confirmed) return;

    try {
      // Updated delete URL to match the backend format
      await axios.delete(`http://localhost:8080/contact-registry/delete-contact?id=${id}`);
      alert("Contact deleted successfully.");
      navigate('/'); // Redirect back to the contact list page
    } catch (err) {
      alert("Failed to delete contact.");
      console.error(err);
    }
  };

  if (error) return <p>{error}</p>;
  if (!contact) return <p>Loading contact...</p>;

  return (
    <div className="delete-contact">
      <h2>❌ Delete Contact</h2>
      <p><strong>Name:</strong> {contact.fullName}</p>
      <p><strong>📞 Phone:</strong> {contact.phoneNumber}</p>
      <p><strong>✉️ Email:</strong> {contact.emailAddress}</p>
      <p><strong>🆔 ID No:</strong> {contact.idNumber}</p>
      <p><strong>🎂 DOB:</strong> {contact.dateOfBirth}</p>
      <p><strong>🧑 Gender:</strong> {contact.gender}</p>
      <p><strong>🏙️ County:</strong> {contact.county}</p>
      <p><strong>🏢 Organization:</strong> {contact.organizationName}</p>

      <div>
        <button
          onClick={handleDelete}
          style={{ backgroundColor: 'red', color: 'white' }}
        >
          🗑 Delete
        </button>
        <button
          onClick={() => navigate('/')}
          style={{ marginLeft: '10px' }}
        >
          ⬅️ Cancel
        </button>
      </div>
    </div>
  );
}

export default ContactDelete;
