import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { API_BASE } from "./apiConfig";

function CustomerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [ownedCars, setOwnedCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);

  const [serviceForm, setServiceForm] = useState({
    carId: "",
    serviceType: "",
    preferredDate: "",
    timeSlot: "",
    notes: ""
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [serviceMessage, setServiceMessage] = useState("");
  const [serviceBookings, setServiceBookings] = useState([]);

  const [allCars, setAllCars] = useState([]);
const [addVehicleForm, setAddVehicleForm] = useState({ carId: "" });

const [chatMessages, setChatMessages] = useState([]);
const [newMessage, setNewMessage] = useState("");
const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    if (!storedUser) {
      navigate("/customer-login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    fetch(`${API_BASE}/api/customer-vehicles/${parsedUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOwnedCars(data);
        setLoadingCars(false);
      })
      .catch((error) => {
        console.error("Error fetching owned vehicles:", error);
        setLoadingCars(false);
      });

fetch(`${API_BASE}/api/cars`)
  .then((res) => res.json())
  .then(setAllCars)
  .catch((error) => console.error("Error fetching cars:", error));

    fetch(`${API_BASE}/api/service-bookings/${parsedUser.email}`)
      .then((res) => res.json())
      .then((data) => setServiceBookings(data))
      .catch((error) =>
        console.error("Error fetching service bookings:", error)
      );

    fetch(`${API_BASE}/api/customer-messages/${parsedUser.email}`)
  .then((res) => res.json())
  .then((data) => setChatMessages(data))
  .catch((error) =>
    console.error("Error fetching chat messages:", error)
  );
  }, [navigate]);

  const handleServiceChange = async (e) => {
    const { name, value } = e.target;

    if (name === "preferredDate") {
      setServiceForm((prev) => ({
        ...prev,
        preferredDate: value,
        timeSlot: ""
      }));

      if (value) {
        try {
          const response = await fetch(`${API_BASE}/api/service-bookings/available-slots?date=${value}`);
          const slots = await response.json();
          setAvailableSlots(slots);
        } catch (error) {
          console.error("Error fetching available slots:", error);
          setAvailableSlots([]);
        }
      } else {
        setAvailableSlots([]);
      }

      return;
    }

    setServiceForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setServiceMessage("");

    if (!user) return;

    const bookingData = {
      customerEmail: user.email,
      carId: Number(serviceForm.carId),
      serviceType: serviceForm.serviceType,
      preferredDate: serviceForm.preferredDate,
      timeSlot: serviceForm.timeSlot,
      notes: serviceForm.notes
    };

    try {
      const response = await fetch(`${API_BASE}/api/service-bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();

      if (response.ok) {
        setServiceMessage("Service booking submitted successfully.");
        setServiceForm({
          carId: "",
          serviceType: "",
          preferredDate: "",
          timeSlot: "",
          notes: ""
        });
        setAvailableSlots([]);

        const updatedBookings = await fetch(`${API_BASE}/api/service-bookings/${user.email}`
        );
        const bookingsData = await updatedBookings.json();
        setServiceBookings(bookingsData);
      } else {
        setServiceMessage(result.message || "Failed to submit service booking.");
      }
    } catch (error) {
      console.error("Error submitting service booking:", error);
      setServiceMessage("An error occurred while submitting the booking.");
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/service-bookings/cancel/${id}`,
        {
          method: "PATCH"
        }
      );

      if (response.ok) {
        setServiceMessage("Booking cancelled successfully.");

        const updatedBookings = await fetch(`${API_BASE}/api/service-bookings/${user.email}`
        );
        const bookingsData = await updatedBookings.json();
        setServiceBookings(bookingsData);
      } else {
        const errorText = await response.text();
        setServiceMessage(errorText || "Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      setServiceMessage("Error cancelling booking.");
    }
  };

  const handleAddVehicle = async (e) => {
  e.preventDefault();

  if (!user || !addVehicleForm.carId) return;

  try {
    const response = await fetch(`${API_BASE}/api/customer-vehicles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customerEmail: user.email,
        carId: Number(addVehicleForm.carId)
      })
    });

    if (response.ok) {
      const updatedCars = await fetch(`${API_BASE}/api/customer-vehicles/${user.email}`);
      const carsData = await updatedCars.json();
      setOwnedCars(carsData);
      setAddVehicleForm({ carId: "" });
      alert("Vehicle added to your profile!");
    } else {
      alert("Failed to add vehicle.");
    }
  } catch (error) {
    console.error("Error adding vehicle:", error);
    alert("Error adding vehicle.");
  }
};

const handleSendMessage = async (e) => {
  e.preventDefault();

  if (!user || !newMessage.trim()) return;

  try {
    const response = await fetch(`${API_BASE}/api/customer-messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customerEmail: user.email,
        message: newMessage
      })
    });

    if (response.ok) {
      setNewMessage("");

      const updatedMessages = await fetch(
        `${API_BASE}/api/customer-messages/${user.email}`
      );
      const messagesData = await updatedMessages.json();
      setChatMessages(messagesData);
    } else {
      alert("Failed to send message.");
    }
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Error sending message.");
  }
};

  if (!user) {
    return <h2 style={{ padding: "40px" }}>Loading dashboard...</h2>;
  }

  return (
    <div>
      <Navbar />

      <div style={styles.page}>
        <h1 style={styles.heading}>My Dashboard</h1>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>My Profile</h2>
            <p><strong>Full Name:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Account Summary</h2>
            <p>Welcome back to your dealership customer portal.</p>
            <p>
              Here you can view your customer information and see the vehicles
              registered under your account.
            </p>
          </div>

          <div style={{ ...styles.card, gridColumn: "1 / span 2" }}>
            <h2 style={styles.cardTitle}>My Vehicles</h2>

            {loadingCars ? (
              <p>Loading vehicle records...</p>
            ) : ownedCars.length === 0 ? (
              <p>No vehicle records available for this customer.</p>
            ) : (
              <div style={styles.vehicleGrid}>
                {ownedCars.map((car) => (
                  <div key={car.id} style={styles.vehicleCard}>
                    <img src={`${API_BASE}/images/${car.image}`}
                      alt={car.name}
                      style={styles.vehicleImage}
                    />
                    <h3>{car.name}</h3>
                    <p><strong>Price:</strong> ${Number(car.price).toFixed(2)}</p>
                    <p>{car.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

<div style={{ ...styles.card, gridColumn: "1 / span 2" }}>
  <h2 style={styles.cardTitle}>Add My Vehicle</h2>

  <form onSubmit={handleAddVehicle} style={styles.form}>
    <select
      name="carId"
      value={addVehicleForm.carId}
      onChange={(e) =>
        setAddVehicleForm({ ...addVehicleForm, carId: e.target.value })
      }
      required
      style={styles.input}
    >
      <option value="">Select from Dealership Inventory</option>
      {allCars.map((car) => (
        <option key={car.id} value={car.id}>
          {car.name} (${Number(car.price).toFixed(0)})
        </option>
      ))}
    </select>

    <button type="submit" style={styles.button}>
      Add My Vehicle
    </button>
  </form>
</div>

          <div style={{ ...styles.card, gridColumn: "1 / span 2" }}>
            <h2 style={styles.cardTitle}>Service Booking</h2>

            {ownedCars.length === 0 ? (
              <p>You need at least one registered vehicle to request service.</p>
            ) : (
              <form onSubmit={handleServiceSubmit} style={styles.form}>
                <select
                  name="carId"
                  value={serviceForm.carId}
                  onChange={handleServiceChange}
                  required
                  style={styles.input}
                >
                  <option value="">Select Vehicle</option>
                  {ownedCars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.name}
                    </option>
                  ))}
                </select>

                <select
                  name="serviceType"
                  value={serviceForm.serviceType}
                  onChange={handleServiceChange}
                  required
                  style={styles.input}
                >
                  <option value="">Select Service Type</option>
                  <option value="Oil Change">Oil Change</option>
                  <option value="Tire Rotation">Tire Rotation</option>
                  <option value="Brake Inspection">Brake Inspection</option>
                  <option value="Battery Check">Battery Check</option>
                  <option value="General Maintenance">General Maintenance</option>
                </select>

                <input
                  type="date"
                  name="preferredDate"
                  value={serviceForm.preferredDate}
                  onChange={handleServiceChange}
                  required
                  style={styles.input}
                />

                <select
                  name="timeSlot"
                  value={serviceForm.timeSlot}
                  onChange={handleServiceChange}
                  required
                  style={styles.input}
                  disabled={!serviceForm.preferredDate || availableSlots.length === 0}
                >
                  <option value="">Select Time Slot</option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>

                {serviceForm.preferredDate && availableSlots.length === 0 && (
                  <p style={{ color: "red", margin: 0 }}>
                    No available time slots for the selected day.
                  </p>
                )}

                <textarea
                  name="notes"
                  placeholder="Additional Notes"
                  value={serviceForm.notes}
                  onChange={handleServiceChange}
                  style={styles.textarea}
                />

                <button type="submit" style={styles.button}>
                  Submit Service Request
                </button>
              </form>
            )}

            {serviceMessage && (
              <p style={{ marginTop: "15px", fontWeight: "bold" }}>
                {serviceMessage}
              </p>
            )}
          </div>

          <div style={{ ...styles.card, gridColumn: "1 / span 2" }}>
            <h2 style={styles.cardTitle}>My Service Requests</h2>

            {serviceBookings.length === 0 ? (
              <p>No service requests found.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.cell}>Vehicle ID</th>
                    <th style={styles.cell}>Service Type</th>
                    <th style={styles.cell}>Preferred Date</th>
                    <th style={styles.cell}>Time Slot</th>
                    <th style={styles.cell}>Notes</th>
                    <th style={styles.cell}>Status</th>
                    <th style={styles.cell}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td style={styles.cell}>{booking.carId}</td>
                      <td style={styles.cell}>{booking.serviceType}</td>
                      <td style={styles.cell}>{booking.preferredDate}</td>
                      <td style={styles.cell}>{booking.timeSlot}</td>
                      <td style={styles.cell}>{booking.notes || "-"}</td>
                      <td style={styles.cell}>{booking.status}</td>
                      <td style={styles.cell}>
                        {booking.status === "PENDING" ? (
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            style={styles.cancelButton}
                          >
                            Cancel
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>                   
         </div>
      </div>

      <button
        onClick={() => setShowChat(!showChat)}
        style={styles.chatToggleButton}
      >
        💬 {showChat ? "Close" : "Chat"}
      </button>

      {showChat && (
        <div style={styles.chatPopup}>
          <div style={styles.chatHeader}>
            <h3 style={{ margin: 0, color: "white" }}>Support Chat</h3>
            <button
              onClick={() => setShowChat(false)}
              style={styles.chatCloseButton}
            >
              ×
            </button>
          </div>

          <div style={styles.chatBody}>
            {chatMessages.length === 0 ? (
              <p style={{ padding: "10px", opacity: 0.7 }}>
                Start a conversation with our team
              </p>
            ) : (
              chatMessages.map((msg) => (
                <div key={msg.id} style={styles.chatMessage}>
                  <small style={{ opacity: 0.7 }}>
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ""}
                  </small>
                  <p>{msg.message}</p>
                  {msg.status === "PENDING" && (
                    <span style={{ color: "orange", fontSize: "12px" }}>
                      (Unread)
                    </span>
                  )}
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleSendMessage} style={styles.chatForm}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type message..."
              style={styles.chatInput}
              required
            />
            <button type="submit" style={styles.button}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    background: "#f5f5f5",
    minHeight: "100vh"
  },
  heading: {
    marginBottom: "30px",
    color: "#111"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px"
  },
  card: {
    background: "white",
    borderRadius: "10px",
    padding: "25px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },
  cardTitle: {
    marginBottom: "15px",
    color: "#e4002b"
  },
  vehicleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  },
  vehicleCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    background: "#fafafa"
  },
  vehicleImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxWidth: "600px"
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px"
  },
  textarea: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
    minHeight: "100px"
  },
  button: {
    padding: "12px 16px",
    background: "#e4002b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  cancelButton: {
    padding: "6px 10px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px"
  },
  cell: {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "left"
  },
  chatToggleButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "#e4002b",
    color: "white",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(228,0,43,0.4)",
    zIndex: 1000
  },
  chatPopup: {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "320px",
    maxHeight: "500px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
    overflow: "hidden"
  },
  chatHeader: {
    background: "#e4002b",
    color: "white",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  chatCloseButton: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "24px",
    cursor: "pointer",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  chatBody: {
    flex: 1,
    padding: "15px",
    background: "#f9f9f9",
    overflowY: "auto",
    maxHeight: "350px"
  },
  chatMessage: {
    background: "white",
    marginBottom: "10px",
    padding: "12px",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  },
  chatForm: {
    display: "flex",
    padding: "12px",
    gap: "8px",
    borderTop: "1px solid #eee"
  },
  chatInput: {
    flex: 1,
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: "20px",
    fontSize: "14px",
    outline: "none"
  }
};

export default CustomerDashboard;