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
        const contactData = response.data;

        const formattedDateOfBirth = formatDate(contactData.dateOfBirth);

        setContact({
            ...contactData,
            dateOfBirth: formattedDateOfBirth
        });

      } catch (error) {
        setError("Error fetching contact details.");
        console.error("Error fetching contact:", error);
      }
    };
  
    // Format date to YYYY-MM-DD
    const formatDate = (date) => {
      const newDate = new Date(date);
      const year = newDate.getFullYear();
      const month = (newDate.getMonth() + 1).toString().padStart(2, '0'); 
      const day = newDate.getDate().toString().padStart(2, '0'); 
      return `${year}-${month}-${day}`;
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
        await axios.put(`http://localhost:8080/contact-registry/edit-contact?id=${id}`, contact);
        alert("Contact updated successfully.");
        navigate(`/contacts/${id}`);
      } catch (error) {
        setError("Error updating contact.");
        console.error("Error updating contact:", error);
      }
    };
  
    return (
      <div className="contact-edit">
        <h2>Edit Contact</h2>
        {error && <p>{error}</p>}
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
        <button className="cancel" onClick={() => navigate(`/contacts/${id}`)}>Cancel</button>
      </div>
    );
  }
  
  export default ContactEdit;
