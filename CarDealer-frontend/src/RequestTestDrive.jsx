import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const RequestTestDrive = () => {
  const { id } = useParams(); // ✅ Get car ID from URL

  const [testDriveData, setTestDriveData] = useState({
    customerName: "",
    email: "",
    carinfo:"",
    preferredDate: ""
  });

  const [testDriveStatus, setTestDriveStatus] = useState("");

  const handleTestDriveChange = (e) => {
    setTestDriveData({
      ...testDriveData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitTestDrive = async (e) => {
    e.preventDefault();

    const requestData = {
      customerName: testDriveData.customerName,
      email: testDriveData.email,
      preferredDate: testDriveData.preferredDate,
      carinfo: testDriveData.carinfo
      //carId: Number(id)
    };

    try {
      const response = await fetch("http://localhost:8084/api/test-drives", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        setTestDriveStatus("Test drive request submitted successfully.");
        setTestDriveData({
          customerName: "",
          email: "",
          carinfo:"",
          preferredDate: ""

        });
      } else {
        setTestDriveStatus("Failed to submit test drive request.");
      }
    } catch (error) {
      console.error("Error submitting test drive request:", error);
      setTestDriveStatus(
        "An error occurred while submitting the test drive request."
      );
    }
  };

  // ✅ JSX is returned here, not inside handleSubmitTestDrive
  return (
    <div>
      <Navbar />

      <div
        
  style={{
    display: "flex",
    justifyContent: "flex-start",   // centers horizontally
    alignItems: "center",       // centers vertically
    height: "100vh",            // full viewport height
    flexDirection: "column",    // stack elements vertically
    padding: "20px",            // optional padding
    boxSizing: "border-box"     // ensure padding doesn't break centering
  }}
>


     

      <h3 style={{ marginTop: "40px" }}>Request Test Drive</h3>

      <form onSubmit={handleSubmitTestDrive} style={{ maxWidth: "500px", width: "100%", display: "flex",   flexDirection: "column",     // stack inputs vertically
      alignItems: "center"   }}>
        <input
          type="text"
          name="customerName"
          placeholder="Your Name"
          value={testDriveData.customerName}
          onChange={handleTestDriveChange}
          required
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px"
          }}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={testDriveData.email}
          onChange={handleTestDriveChange}
          required
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px"
          }}
        />
        <p><b>Which car would you like to test drive?</b></p>
        <textarea
            name="carinfo"
            placeholder="Car Info"
            value={testDriveData.carinfo}
            onChange={handleTestDriveChange}
            required
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "10px",
              height: "120px"
            }}
          />

        <input
          type="date"
          name="preferredDate"
          value={testDriveData.preferredDate}
          onChange={handleTestDriveChange}
          required
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px"
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Request Test Drive
        </button>
      </form>

      {testDriveStatus && (
        <p style={{ marginTop: "15px", fontWeight: "bold" }}>
          {testDriveStatus}
        </p>
      )}
      </div>
    </div>
  );
};

export default RequestTestDrive;