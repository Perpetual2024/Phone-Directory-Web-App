import React, { useState } from "react";
import axios from "axios";

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
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data?.error) {
        setMessage(err.response.data.error);
      } else {
        setMessage("Something went wrong.");
      }
    }
  };

  return (
    <div>
      <h2>Create Contact</h2>
      {["fullName", "phoneNumber", "emailAddress", "idNumber", "dateOfBirth", "gender", "county", "organizationName"].map((field) => (
        <div key={field}>
          <label>{field.replace(/([A-Z])/g, " $1")}:</label>
          <input
            type={field === "dateOfBirth" ? "date" : "text"}
            name={field}
            value={contact[field]}
            onChange={handleChange}
            placeholder={field}
          />

        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      <p>{message}</p>
    </div>
  );
};

export default CreateContactForm;
