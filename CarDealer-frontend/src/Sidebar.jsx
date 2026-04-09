import React from "react";
import { useNavigate } from "react-router-dom";
import ManageVehicles from "./ManageVehicles";
import { useAuth } from "./AuthContext"; 

const Sidebar = () => {

  const navigate = useNavigate();

  const { logout } = useAuth(); 

    const handleLogout = async () => {
    await logout();           
    navigate("/admin");       
  };

  return (
    <div className="sidebar">
      <h3 className="logo">Car Dealership</h3>

      <ul>
        <li onClick={() => navigate("/Dashboard")}>Dashboard</li>

        <li onClick={() => navigate("/manage-vehicles")}>
          Manage Vehicle
        </li>

        <li onClick={() => navigate("/inquiries")}>
          Inquiries
        </li>

        <li onClick={() => navigate("/test-drives")}>
          Test Drives
        </li>

        <li onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;