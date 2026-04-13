import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import StatsCard from "./StatsCard";
import InquiriesTable from "./InquiriesTable";
import TestDriveTable from "./TestDriveTable";
import "./admindashboard.css";
import { API_BASE } from "./apiConfig";

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [testDrives, setTestDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminMessages, setAdminMessages] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
const [carsResponse, inquiriesResponse, testDrivesResponse, messagesResponse] =
  await Promise.all([
    fetch(`${API_BASE}/api/cars`, { credentials: "include" }),
    fetch(`${API_BASE}/api/inquiries`, { credentials: "include" }),
    fetch(`${API_BASE}/api/test-drives`, { credentials: "include" }),
    fetch(`${API_BASE}/api/customer-messages`, { credentials: "include" }),
  ]);

        const carsData = await carsResponse.json();
        const inquiriesData = await inquiriesResponse.json();
        const testDrivesData = await testDrivesResponse.json();
        const messagesData = await messagesResponse.json();

        setCars(carsData);
        setInquiries(inquiriesData);
        setTestDrives(testDrivesData);
        setAdminMessages(messagesData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const fetchAdminMessages = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/customer-messages`, {
        credentials: "include"
      });
      const data = await response.json();
      setAdminMessages(data);
    } catch (error) {
      console.error("Error fetching admin messages:", error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/customer-messages/${id}/read`, {
        method: "PATCH",
        credentials: "include"
      });

      if (response.ok) {
        fetchAdminMessages();
      } else {
        console.error("Failed to mark message as read.");
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/customer-messages/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (response.ok) {
        fetchAdminMessages();
      } else {
        console.error("Failed to delete message.");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const approvedCount = testDrives.filter(
    (request) => request.status === "APPROVED"
  ).length;

  const recentInquiries = [...inquiries]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const recentTestDrives = [...testDrives]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <h1>Sales Staff Dashboard</h1>

        {loading ? (
          <p>Loading dashboard data...</p>
        ) : (
          <>
            <div className="stats">
              <StatsCard
                title="Vehicles Available"
                value={cars.length}
                color="#1976d2"
              />
              <StatsCard
                title="Customer Inquiries"
                value={inquiries.length}
                color="#2e7d32"
              />
              <StatsCard
                title="Test Drive Requests"
                value={testDrives.length}
                color="#f57c00"
              />
              <StatsCard
                title="Approved Test Drives"
                value={approvedCount}
                color="#c62828"
              />
            </div>

            <div className="tables">
  <InquiriesTable inquiries={recentInquiries} />
  <TestDriveTable requests={recentTestDrives} />
</div>

<div className="table-box" style={{ marginTop: "30px" }}>
  <h2>Customer Support Messages</h2>

  {adminMessages.length === 0 ? (
    <p>No customer messages found.</p>
  ) : (
    <table>
      <thead>
        <tr>
          <th>Customer Email</th>
          <th>Message</th>
          <th>Created At</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {adminMessages.map((msg) => (
          <tr key={msg.id}>
            <td>{msg.customerEmail}</td>
            <td>{msg.message}</td>
            <td>
              {msg.createdAt
                ? new Date(msg.createdAt).toLocaleString()
                : ""}
            </td>
            <td>{msg.status}</td>
            <td>
              {msg.status !== "READ" && (
                <button
                  onClick={() => handleMarkAsRead(msg.id)}
                  style={{
                    background: "#2e7d32",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginRight: "8px"
                  }}
                >
                  Mark Read
                </button>
              )}

              <button
                onClick={() => handleDeleteMessage(msg.id)}
                style={{
                  background: "#c62828",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;