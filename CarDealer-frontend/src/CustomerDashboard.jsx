import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

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

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    if (!storedUser) {
      navigate("/customer-login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    fetch(`http://localhost:8084/api/customer-vehicles/${parsedUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOwnedCars(data);
        setLoadingCars(false);
      })
      .catch((error) => {
        console.error("Error fetching owned vehicles:", error);
        setLoadingCars(false);
      });

    fetch(`http://localhost:8084/api/service-bookings/${parsedUser.email}`)
      .then((res) => res.json())
      .then((data) => setServiceBookings(data))
      .catch((error) =>
        console.error("Error fetching service bookings:", error)
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
          const response = await fetch(
            `http://localhost:8084/api/service-bookings/available-slots?date=${value}`
          );
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
      const response = await fetch("http://localhost:8084/api/service-bookings", {
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

        const updatedBookings = await fetch(
          `http://localhost:8084/api/service-bookings/${user.email}`
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
      const response = await fetch(
        `http://localhost:8084/api/service-bookings/cancel/${id}`,
        {
          method: "PATCH"
        }
      );

      if (response.ok) {
        setServiceMessage("Booking cancelled successfully.");

        const updatedBookings = await fetch(
          `http://localhost:8084/api/service-bookings/${user.email}`
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

  if (!user) {
    return <h2 style={{ padding: "40px" }}>Loading dashboard...</h2>;
  }

  return (
    <div>
      <Navbar />

      <div style={styles.page}>
        <h1 style={styles.heading}>Customer Dashboard</h1>

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
                    <img
                      src={`http://localhost:8084/images/${car.image}`}
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
  }
};

export default CustomerDashboard;