import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8084/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch((error) => console.error("Error fetching car:", error));
  }, [id]);

  if (!car) return <h2>Loading...</h2>;

  return (
    <div>
      <Navbar />
         

      <div style={{ padding: "60px",display: "flex",
    justifyContent: "flex-start",   // centers horizontally
    alignItems: "center",//vertical alignment
    flexDirection: "column",}}>
        <h1>{car.name}</h1>

        <img
          src={car.image}
          alt={car.name}
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "300px",
            objectFit: "cover",
            borderRadius: "10px"
          }}
        />

        <h2>Price: ${car.price}</h2>
        {/* Description section */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <p style={{ fontWeight: "bold", marginBottom: "5px" }}>Description:</p>
        <p>{car.description}</p>
      </div>
      </div>
    </div>
  );
}

export default CarDetails;