import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "./apiConfig";

function CustomerLogin() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_BASE}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("loggedInUser", JSON.stringify(result.user));
        navigate("/customer-dashboard");
      } else {
        setError(result.message || "Login failed.");
      }

    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h1>Customer Login</h1>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

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
  error: {
    color: "red",
    marginTop: "15px"
  }
};

export default CustomerLogin;