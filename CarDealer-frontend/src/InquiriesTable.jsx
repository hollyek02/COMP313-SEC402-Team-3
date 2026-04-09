import React from "react";

const InquiriesTable = ({ inquiries }) => {
  return (
    <div className="table-box">
      <h3>Recent Inquiries</h3>

      {inquiries.length === 0 ? (
        <p>No inquiries found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>

          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td>{inquiry.customerName}</td>
                <td>{inquiry.email}</td>
                <td>{inquiry.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InquiriesTable;