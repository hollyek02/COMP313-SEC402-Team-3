import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

function ViewTestDrives() {
  const [requests, setRequests] = useState([]);
<<<<<<< HEAD
  const [message, setMessage] = useState("");

  const fetchRequests = () => {
    fetch("http://localhost:8084/api/test-drives")
=======
  const navigate = useNavigate();


  useEffect(() => {
    fetch("http://localhost:8084/api/test-drives",{credentials: "include"})
>>>>>>> d503c44a1ad7146200230d04951bf3a971585e02
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((error) =>
        console.error("Error fetching test drive requests:", error)
      );
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:8084/api/test-drives/${id}/status?status=${newStatus}`,
        {
          method: "PATCH"
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage(`Request ${newStatus.toLowerCase()} successfully.`);
        fetchRequests();
      } else {
        setMessage(result.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setMessage("Server error while updating request status.");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "40px", flex: 1 }}>
        <h1>Staff Test Drive Requests</h1>

        {message && (
          <p style={{ marginTop: "15px", fontWeight: "bold" }}>{message}</p>
        )}

        {requests.length === 0 ? (
          <p>No test drive requests found.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px"
            }}
          >
            <thead>
              <tr style={{ background: "#f2f2f2" }}>
                <th style={cellStyle}>ID</th>
                <th style={cellStyle}>Customer Name</th>
                <th style={cellStyle}>Email</th>
                <th style={cellStyle}>Preferred Date</th>
                <th style={cellStyle}>Car Info</th>
                <th style={cellStyle}>Status</th>
                <th style={cellStyle}>Created At</th>
<<<<<<< HEAD
                <th style={cellStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td style={cellStyle}>{req.id}</td>
                  <td style={cellStyle}>{req.customerName}</td>
                  <td style={cellStyle}>{req.email}</td>
                  <td style={cellStyle}>{req.preferredDate}</td>
                  <td style={cellStyle}>{req.carId}</td>
                  <td style={cellStyle}>{req.status}</td>
                  <td style={cellStyle}>{req.createdAt}</td>
                  <td style={cellStyle}>
                    {req.status === "PENDING" ? (
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          onClick={() => handleStatusUpdate(req.id, "APPROVED")}
                          style={approveButton}
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => handleStatusUpdate(req.id, "REJECTED")}
                          style={rejectButton}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
=======
                <th style={cellStyle}>Action</th>
              </tr>
            </thead>
           <tbody>
  {requests.map((req) => (
    <tr key={req.id}>
      <td style={cellStyle}>{req.id}</td>
      <td style={cellStyle}>{req.customerName}</td>
      <td style={cellStyle}>{req.email}</td>
      <td style={cellStyle}>{req.preferredDate}</td>
      <td style={cellStyle}>{req.carinfo}</td>

      {/* Status dropdown */}
      <td style={cellStyle}>
        <select
          value={req.status}
          onChange={(e) => {
            const newStatus = e.target.value;
            // Optionally update backend here
            fetch(`http://localhost:8084/api/test-drives/${req.id}/status?status=${newStatus}`, {
              method: "PATCH"
            })
            .then(() => {
              // Update local state
              setRequests((prev) =>
                prev.map((r) =>
                  r.id === req.id ? { ...r, status: newStatus } : r
                )
              );
            })
            .catch((err) => console.error(err));
          }}
          style={{
            color:
              req.status === "PENDING"
                ? "red"
                : req.status === "IN_PROCESS"
                ? "blue"
                : req.status === "COMPLETED"
                ? "green"
                : "black",
            fontWeight: "bold",
            padding: "5px"
          }}
        >
          <option value="PENDING" style={{ color: "red" }}>Pending</option>
          <option value="IN_PROCESS" style={{ color: "blue" }}>In Process</option>
          <option value="COMPLETED" style={{ color: "green" }}>Completed</option>
        </select>
      </td>

      <td style={cellStyle}>{req.createdAt}</td>

      <td style={{ ...cellStyle, textAlign:"center"}}>
  <button style={{ border:"1px solid black"}} onClick={() => navigate(`/test-drive-request/${req.id}`)}>View</button>
</td>
    </tr>
  ))}
</tbody>
>>>>>>> d503c44a1ad7146200230d04951bf3a971585e02
          </table>
        )}
      </div>
    </div>
  );
}

const cellStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  textAlign: "left"
};

const approveButton = {
  padding: "8px 12px",
  background: "#2e7d32",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

const rejectButton = {
  padding: "8px 12px",
  background: "#c62828",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

export default ViewTestDrives;