import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ContactEdit() {
  const { id } = useParams(); // Get contact ID from URL
  const [contact, setContact] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    idNumber: '',
    dateOfBirth: '',
    gender: '',
    county: '',
    organizationName: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContactById(id);
  }, [id]);

  const fetchContactById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/contact-registry/contacts/${id}`);
      setContact(response.data); // Pre-fill the form with existing contact data
    } catch (error) {
      setError("Error fetching contact details.");
      console.error("Error fetching contact:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send updated contact data to the backend using the correct URL for edit
      await axios.put(`http://localhost:8080/contact-registry/edit-contact?id=${id}`, contact);
      alert("Contact updated successfully.");
      navigate(`/contacts/${id}`); // Navigate back to the contact view page after successful update
    } catch (error) {
      setError("Error updating contact.");
      console.error("Error updating contact:", error);
    }
  };

  return (
    <div className="contact-edit">
      <h2>Edit Contact</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={contact.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={contact.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="emailAddress">Email:</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={contact.emailAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="idNumber">ID No:</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={contact.idNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth">DOB:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={contact.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={contact.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="county">County:</label>
          <input
            type="text"
            id="county"
            name="county"
            value={contact.county}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="organizationName">Organization:</label>
          <input
            type="text"
            id="organizationName"
            name="organizationName"
            value={contact.organizationName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Update Contact</button>
        </div>
      </form>
      <button onClick={() => navigate(`/contacts/${id}`)}>Cancel</button>
    </div>
  );
}

export default ContactEdit;
