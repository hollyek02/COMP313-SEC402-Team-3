import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "./apiConfig";



function ViewInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/inquiries`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setInquiries(data))
      .catch((error) => console.error("Error fetching inquiries:", error));
  }, []);

  return (
     <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "40px", flex: 1 }}>
        <h1>Staff Inquiry View</h1>

        {inquiries.length === 0 ? (
          <p>No inquiries found.</p>
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
                <th style={cellStyle}>Message</th>
                
                <th style={cellStyle}>Created At</th>
                <th style={cellStyle}>Status</th>
                <th style={cellStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
  {inquiries.map((inquiry) => (
    <tr key={inquiry.id}>
      <td style={cellStyle}>{inquiry.id}</td>
      <td style={cellStyle}>{inquiry.customerName}</td>
      <td style={cellStyle}>{inquiry.email}</td>
      <td style={cellStyle}>{inquiry.message}</td>
      <td style={cellStyle}>{inquiry.createdAt}</td>


      {/* ✅ Status dropdown */}
      <td style={{cellStyle, textAlign:"center"}}>
        <select
          value={inquiry.status || "PENDING"}   // fallback
          onChange={(e) => {
            const newStatus = e.target.value;

            fetch(`${API_BASE}/api/inquiries/${inquiry.id}/status?status=${newStatus}`, {
  method: "PATCH",
  credentials: "include",
})
              .then(() => {
                setInquiries((prev) =>
                  prev.map((i) =>
                    i.id === inquiry.id
                      ? { ...i, status: newStatus }
                      : i
                  )
                );
              })
              .catch((err) => console.error(err));
          }}
          style={{
            color:
              inquiry.status === "PENDING"
                ? "red"
                : inquiry.status === "IN_PROCESS"
                ? "blue"
                : inquiry.status === "COMPLETED"
                ? "green"
                : "black",
            fontWeight: "bold",
            padding: "5px"
          }}
        >
          <option value="PENDING" style={{ color: "red" }}>
            Pending
          </option>
          <option value="IN_PROCESS" style={{ color: "blue" }}>
            In Process
          </option>
          <option value="COMPLETED" style={{ color: "green" }}>
            Completed
          </option>
        </select>
      </td>
      <td style={{ ...cellStyle, textAlign:"center"}}>
  <button style={{ border:"1px solid black"}} onClick={() => navigate(`/customer-inquiry/${inquiry.id}`)}>View</button>
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


export default ViewInquiries;