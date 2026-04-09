import React from "react";

const TestDriveTable = ({ requests }) => {
  return (
    <div className="table-box">
      <h3>Recent Test Drive Requests</h3>

      {requests.length === 0 ? (
        <p>No test drive requests found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.customerName}</td>
                <td>{request.email}</td>
                <td>{request.preferredDate}</td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TestDriveTable;