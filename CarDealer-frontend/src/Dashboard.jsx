import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import StatsCard from "./StatsCard";
import InquiriesTable from "./InquiriesTable";
import TestDriveTable from "./TestDriveTable";
import "./admindashboard.css";

const Dashboard = () => {
  const [vehiclesCount, setVehiclesCount] = useState(0);
  const [inquiriesCount, setInquiriesCount] = useState(0);
  const [testDrivesCount, setTestDrivesCount] = useState(0);

  // Fetch vehicles
  useEffect(() => {
    fetch("http://localhost:8084/api/cars",{credentials: "include"})
      .then((res) => res.json())
      .then((data) => setVehiclesCount(data.length))
      .catch((err) => console.error(err));
  }, []);

  // Fetch inquiries
  useEffect(() => {
    fetch("http://localhost:8084/api/inquiries",{credentials: "include"})
      .then((res) => res.json())
      .then((data) => setInquiriesCount(data.length))
      .catch((err) => console.error(err));
  }, []);

  // Fetch test drive requests
  useEffect(() => {
    fetch("http://localhost:8084/api/test-drives",{credentials: "include"})
      .then((res) => res.json())
      .then((data) => setTestDrivesCount(data.length))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <h1>Sales Staff Dashboard</h1>

        <div className="stats">
          <StatsCard title="Vehicles Available" value={vehiclesCount} color="#1976d2" />
          <StatsCard title="Customer Inquiries" value={inquiriesCount} color="#2e7d32" />
          <StatsCard title="Test Drive Requests" value={testDrivesCount} color="#f57c00" />
        </div>

        <div className="tables">
          <InquiriesTable />
          <TestDriveTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;