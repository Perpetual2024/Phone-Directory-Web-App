import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ContactView() {
  const { id } = useParams(); // Get contact ID from URL
  const [contact, setContact] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchContactById(id); // Pass id to the function
    }
  }, [id]); // This will run when id changes

  const fetchContactById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/contact-registry/contacts/${id}`);
      setContact(response.data); // Set the contact data
    } catch (error) {
      setError("Error fetching contact: " + error.message); // Show error if something goes wrong
      console.error("Error fetching contact:", error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this contact?");
    if (!confirmed) return;

    try {
        // Send DELETE request with JSON payload
        const response = await axios.delete("http://localhost:8080/contact-registry/delete-contact", {
            data: { id: id } // Send the id in the request body
        });

        console.log(response.data); // Should log success message
        alert("Contact deleted successfully.");
        navigate("/"); // Redirect to the main contact list page
    } catch (err) {
        console.error("Error deleting contact:", err.response ? err.response.data : err.message);
        alert("Failed to delete contact.");
    }
};


  const handleEdit = () => {
    navigate(`/contacts/${id}/edit`);
  };

  if (error) return <p>{error}</p>;
  if (!contact) return <p>Loading contact...</p>;

  return (
    <div className="contact-view">
      <h2>👤 Contact Details</h2>
      <p><strong>Name:</strong> {contact.fullName}</p>
      <p><strong>📞 Phone:</strong> {contact.phoneNumber}</p>
      <p><strong>✉️ Email:</strong> {contact.emailAddress}</p>
      <p><strong>🆔 ID No:</strong> {contact.idNumber}</p>
      <p><strong>🎂 DOB:</strong> {contact.dateOfBirth}</p>
      <p><strong>🧑 Gender:</strong> {contact.gender}</p>
      <p><strong>🏙️ County:</strong> {contact.county}</p>
      <p><strong>🏢 Organization:</strong> {contact.organizationName}</p>

      <button onClick={handleEdit}>✏️ Edit</button>
      <button onClick={handleDelete} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
        🗑 Delete
      </button>
      <br /><br />
      <button onClick={() => navigate('/')}>⬅️ Back to Contact List</button>
    </div>
  );
}

export default ContactView;
