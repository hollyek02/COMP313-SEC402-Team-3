import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userData = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await fetch("http://localhost:8084/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Registration successful. Please log in.");
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: ""
        });

        setTimeout(() => {
          navigate("/customer-login");
        }, 1500);
      } else {
        setError(result.message || "Registration failed.");
      }

    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h1>Customer Registration</h1>

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>

        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5"
  },
  box: {
    width: "400px",
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px"
  },
  button: {
    padding: "12px",
    background: "#e4002b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  success: {
    color: "green",
    marginTop: "15px"
  },
  error: {
    color: "red",
    marginTop: "15px"
  }
};

export default CustomerRegister;