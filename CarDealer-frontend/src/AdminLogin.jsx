import React, { useState } from "react";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { API_BASE } from "./apiConfig";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { fetchUser } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(`${API_BASE}/api/admin/login`, {
  method: "POST",
  credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const text = await response.text();
      console.log("Raw response:", text);

      let data = null;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("JSON parse error:", err);
      }

      if (!response.ok) {
        setError(data?.message || "Login failed");
        return;
      }

      console.log("Parsed data:", data);

      await fetchUser();


      navigate("/dashboard");
    } catch (err) {
      console.error("Error:", err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="title">Toyota Dealership</h1>
        <p className="subtitle">Admin Panel Login</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-button" type="submit">
            Login
          </button>
        </form>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;