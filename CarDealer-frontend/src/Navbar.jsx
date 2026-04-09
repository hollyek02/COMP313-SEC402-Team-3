import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo} onClick={() => navigate("/")}>
        TOYOTA
      </div>

      <div style={styles.menu}>
        <button style={styles.button} onClick={() => navigate("/browse-vehicles")}>
          Browse Vehicles
        </button>

        <button style={styles.button} onClick={() => navigate("/submit-form")}>
          Submit Inquiry
        </button>

        <button style={styles.button} onClick={() => navigate("/request-test-drive")}>
          Request Test Drive
        </button>

        <button style={styles.button} onClick={() => navigate("/")}>
          Home
        </button>

        {!loggedInUser ? (
          <>
            <button
              style={styles.sign}
              onClick={() => navigate("/customer-register")}
            >
              Register
            </button>

            <button
              style={styles.sign}
              onClick={() => navigate("/customer-login")}
            >
              Customer Login
            </button>
          </>
        ) : (
          <>
            <button
              style={styles.sign}
              onClick={() => navigate("/customer-dashboard")}
            >
              My Dashboard
            </button>

            <button style={styles.sign}>
              Hello, {loggedInUser.fullName}
            </button>

            <button style={styles.sign} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    background: "black",
    color: "white",
    alignItems: "center"
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  menu: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap"
  },
  button: {
    padding: "8px 15px",
    background: "#e4002b",
    border: "none",
    color: "white",
    cursor: "pointer"
  },
  sign: {
    padding: "8px 15px",
    background: "#c62828",
    border: "none",
    color: "white",
    cursor: "pointer"
  }
};

export default Navbar;