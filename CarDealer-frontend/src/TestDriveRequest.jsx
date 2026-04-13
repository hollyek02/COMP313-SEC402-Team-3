import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { API_BASE } from "../apiConfig";

function TestDriveRequest() {
  const { id } = useParams(); // get clicked request ID
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);

  // Fetch request details by ID
  useEffect(() => {
    fetch(`${API_BASE}/api/test-drives/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setRequest(data))
      .catch((err) => console.error(err));
  }, [id]);

  // Delete request
  const handleDelete = () => {
   fetch(`${API_BASE}/api/test-drives/${id}`, {
  method: "DELETE",
  credentials: "include",
})
      .then(() => navigate("/test-drives")) // go back to list after deletion
      .catch((err) => console.error(err));
  };

  if (!request) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: "50px",
        }}
      >
        <div
          style={{
            border: "1px solid #ccc",
            padding: "30px",
            borderRadius: "8px",
            width: "400px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h2>Test Drive Request Details</h2>
          <p><strong>Name:</strong> {request.customerName}</p>
          <p><strong>Email:</strong> {request.email}</p>
          <p><strong>Car Model:</strong> {request.carinfo}</p>
          <p><strong>Preferred Date:</strong> {request.preferredDate}</p>

          <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginTop: "20px" }}>
            <button
              onClick={() => navigate("/test-drives")}
              style={{ padding: "8px 15px", border: "1px solid black" }}
            >
              Go Back
            </button>
            <button
              onClick={handleDelete}
              style={{ padding: "8px 15px", background: "red", color: "white" }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestDriveRequest;