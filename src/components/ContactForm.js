// src/components/ContactForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ContactForm() {
    const {id} = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    idNumber: '',
    dateOfBirth: '',
    gender: '',
    county: '',
    organizationName: '',
  });

  const API_URI = "https://localhost:8080/contact-registry/contacts";

  useEffect(() => {
    if (isEditing) {
        axios.get(`${API_URI}/${id}`)
        .then(response => setFormData(response.data))
        .catch(error => console.error("Error loading contact", error))
    }
  }, [id]);


  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value}); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_URI}/${id}`, formData);
      } else {
        await axios.post(API_URI, formData);
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
      <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
      <input name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} required />
      <input name="county" placeholder="County" value={formData.county} onChange={handleChange} required />
      <input name="organizationName" placeholder="Organization Name" value={formData.organizationName} onChange={handleChange} />
      <button type="submit">{isEditing ? "Update" : "Create"}</button>
    </form>
  );
}

export default ContactForm;
