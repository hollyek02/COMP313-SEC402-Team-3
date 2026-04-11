import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8084/api/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  return (
    <div>
      <Navbar />

      <video autoPlay muted loop width="100%">
        <source src="/video/car.mp4" type="video/mp4" />
      </video>

      <div style={{ textAlign: "center", margin: "20px" }}>
        <img
          src="/images/featured.png"
          style={{ width: "100%", height: "500px", objectFit: "cover" }}
          alt="Featured Toyota"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "30px",
          padding: "60px"
        }}
      >
        {cars.slice(0, 6).map((car) => (
          <div
            key={car.id}
            onClick={() => navigate(`/car/${car.id}`)}
            style={{
              width: "400px",
              maxWidth: "90%",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              textAlign: "center"
            }}
          >
            <img
              src={`http://localhost:8084/images/${car.image}`}
              alt={car.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "contain",
                backgroundColor: "#f5f5f5",
                borderRadius: "10px"
              }}
            />

            <h3 style={{ marginTop: "10px" }}>{car.name}</h3>
            <p style={{ fontWeight: "bold" }}>
              {Number(car.price).toLocaleString("en-CA", {
                style: "currency",
                currency: "CAD"
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;