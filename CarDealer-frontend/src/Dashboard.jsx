import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import StatsCard from "./StatsCard";
import InquiriesTable from "./InquiriesTable";
import TestDriveTable from "./TestDriveTable";
import "./admindashboard.css";

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [testDrives, setTestDrives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [carsResponse, inquiriesResponse, testDrivesResponse] =
          await Promise.all([
            fetch("http://localhost:8084/api/cars"),
            fetch("http://localhost:8084/api/inquiries"),
            fetch("http://localhost:8084/api/test-drives")
          ]);

        const carsData = await carsResponse.json();
        const inquiriesData = await inquiriesResponse.json();
        const testDrivesData = await testDrivesResponse.json();

        setCars(carsData);
        setInquiries(inquiriesData);
        setTestDrives(testDrivesData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;