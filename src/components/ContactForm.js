import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ContactForm = () => {
  const { id } = useParams(); // null for new, contact ID for edit
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    idNumber: '',
    dateOfBirth: '',
    gender: '',
    county: '',
    organization: ''
  });

  const API_URL = "http://localhost:8080/api/contacts";

  useEffect(() => {
    if (isEditing) {
      axios.get(`${API_URL}/${id}`)
        .then(res => setFormData(res.data))
        .catch(err => console.error("Error loading contact", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      navigate("/contacts");
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? "Edit Contact" : "Add Contact"}</h2>
      <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
      <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="ID Number" />
      <input name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" />
      <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" />
      <input name="county" value={formData.county} onChange={handleChange} placeholder="County" />
      <input name="organization" value={formData.organization} onChange={handleChange} placeholder="Organization" />
      <button type="submit">{isEditing ? "Update" : "Create"}</button>
    </form>
  );
};

export default ContactForm;
