
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { API_BASE } from "./apiConfig";

function CustomerInquiry() {
  const { id } = useParams(); // get the clicked inquiry id from URL
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/inquiries/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setInquiry(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = () => {
    fetch(`${API_BASE}/api/inquiries/${id}`, {
  method: "DELETE",
  credentials: "include",
})
      .then(() => navigate("/inquiries")) // go back to home after deletion
      .catch((err) => console.error(err));
  };

  if (!inquiry) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
  <Sidebar />
  <div
    style={{
      flex: 1,           // takes the remaining width
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
      <h2>Customer Inquiry Details</h2>
      <p><strong>Name:</strong> {inquiry.customerName}</p>
      <p><strong>Email:</strong> {inquiry.email}</p>
      <p><strong>Message:</strong> {inquiry.message}</p>

      <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginTop: "20px" }}>
        <button onClick={() => navigate("/inquiries")} style={{ padding: "8px 15px", border:"1px solid black" }}>Go Back</button>
        <button onClick={handleDelete} style={{ padding: "8px 15px", background: "red", color: "white" }}>Delete</button>
      </div>
    </div>
  </div>
</div>
    
  );
}

export default CustomerInquiry;



