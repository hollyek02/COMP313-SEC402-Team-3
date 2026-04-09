import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const SubmitForm = () => {
  const { id } = useParams(); // get carId from URL params

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    message: ""
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitInquiry = async (e) => {
    e.preventDefault();

    const inquiryData = {
      customerName: formData.customerName,
      email: formData.email,
      message: formData.message,
      carId: Number(id)
    };

    try {
      const response = await fetch("http://localhost:8084/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiryData)
      });

      if (response.ok) {
        setStatusMessage("Inquiry submitted successfully.");
        setFormData({ customerName: "", email: "", message: "" });
      } else {
        setStatusMessage("Failed to submit inquiry.");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setStatusMessage("An error occurred while submitting the inquiry.");
    }
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start", // <-- centers horizontally
          alignItems: "center",     // <-- centers vertically
          height: "100vh",
          flexDirection: "column",
          padding: "20px",
          boxSizing: "border-box"
        }}
      >
        <h3 style={{ marginTop: "40px" }}>Submit Form</h3>

        <form
          onSubmit={handleSubmitInquiry} // <-- corrected here
          style={{
            maxWidth: "500px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <input
            type="text"
            name="customerName"
            placeholder="Your Name"
            value={formData.customerName}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "10px",
              height: "120px"
            }}
          />

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              background: "black",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            Submit Inquiry
          </button>
        </form>

        {statusMessage && (
          <p style={{ marginTop: "15px", fontWeight: "bold" }}>
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default SubmitForm;