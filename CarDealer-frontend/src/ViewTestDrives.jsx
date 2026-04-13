import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "./apiConfig";

function ViewTestDrives() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchRequests = () => {
   fetch(`${API_BASE}/api/test-drives`, { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch requests: ${res.status}`);
        }
        return res.json();
      })
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
      const response = await fetch(`${API_BASE}/api/test-drives/${id}/status?status=${newStatus}`, {
  method: "PATCH",
  credentials: "include",
})

      let result = {};
      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (response.ok) {
        setMessage(`Request ${newStatus.toLowerCase()} successfully.`);
        fetchRequests();
      } else if (response.status === 403) {
        setMessage("Forbidden: admin authentication is required.");
      } else if (response.status === 401) {
        setMessage("Unauthorized: please log in again.");
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
                  <td style={cellStyle}>{req.carinfo || req.carId}</td>
                  <td style={cellStyle}>{req.status}</td>
                  <td style={cellStyle}>{req.createdAt}</td>
                  <td style={cellStyle}>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {req.status === "PENDING" && (
                        <>
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
                        </>
                      )}

                      <button
                        style={viewButton}
                        onClick={() => navigate(`/test-drive-request/${req.id}`)}
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
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

const viewButton = {
  padding: "8px 12px",
  background: "white",
  color: "black",
  border: "1px solid black",
  borderRadius: "4px",
  cursor: "pointer"
};

export default ViewTestDrives;