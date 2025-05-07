import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import "../css/CreateContact.css";

const CreateContactForm = () => {
  const [contact, setContact] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    idNumber: "",
    dateOfBirth: "",
    gender: "",
    county: "",
    organizationName: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/contact-registry/create-contact", contact, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setMessage("Contact created successfully!");
      setTimeout(() => {
        navigate("/contacts");
      }, 1500);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data?.error) {
        setMessage(err.response.data.error);
      } else {
        setMessage("Fill the forms in all areas.");
      }
    }
  };

  return (
    <div className="create-contact-container">
      <h2 className="form-title">Create Contact</h2>
      {[
        "fullName",
        "phoneNumber",
        "emailAddress",
        "idNumber",
        "dateOfBirth",
        "gender",
        "county",
        "organizationName",
      ].map((field) => (
        <div className="form-group" key={field}>
          <label className="form-label">
            {field.replace(/([A-Z])/g, " $1")}:
          </label>
          <input
            type={field === "dateOfBirth" ? "date" : "text"}
            name={field}
            className="form-input"
            value={contact[field]}
            onChange={handleChange}
            placeholder={field !== "dateOfBirth" ? field : ""}
          />
        </div>
      ))}
      <button className="form-button" onClick={handleSubmit}>
        Submit
      </button>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default CreateContactForm;
