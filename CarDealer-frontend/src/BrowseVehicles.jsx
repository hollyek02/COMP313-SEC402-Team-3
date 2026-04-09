import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function BrowseVehicles() {

  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const carsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8084/api/cars")
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setFilteredCars(data);
      })
      .catch(err => console.error(err));
  }, []);

  // 🔍 FILTER LOGIC
  useEffect(() => {
    let filtered = cars;

    // search by name
    if (search) {
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // filter by price
    if (maxPrice) {
      filtered = filtered.filter(car =>
        parseFloat(car.price) <= parseFloat(maxPrice)
      );
    }

    setFilteredCars(filtered);
    setCurrentPage(1); // reset page after filtering

  }, [search, maxPrice, cars]);

  // 📄 PAGINATION
  const indexOfLast = currentPage * carsPerPage;
  const indexOfFirst = indexOfLast - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  return (
    <div>

      <Navbar />

      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Browse Vehicles
      </h2>

      {/* 🔍 SEARCH + FILTER */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        margin: "20px"
      }}>

        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", width: "200px" }}
        />

        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ padding: "8px", width: "150px" }}
        />

      </div>

      {/* 🚗 CAR LIST */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
        
       
        
      }}>

        {currentCars.length === 0 && <p>No vehicles found</p>}

        {currentCars.map(car => (

          <div
            key={car.id}
            onClick={() => navigate(`/car/${car.id}`)}
            style={{
              width: "30%",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              textAlign: "center",
              
            }}
          >

            <img
              src={car.image}
              alt={car.name}
              style={{
  width: "100%",
  height: "300px",
  objectFit: "contain",
  objectPosition: "center",
  backgroundColor: "#f5f5f5",
  padding: "2px",
  borderRadius: "2px"
}}
            />

            <h3>{car.name}</h3>
            <p>Price: ${car.price}</p>

          </div>

        ))}

      </div>

      {/* ⏮️ PAGINATION CONTROLS */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>

        <button
          onClick={() => setCurrentPage(prev => prev - 1)}
          disabled={currentPage === 1}
          style={{
            margin: "5px",
            padding: "8px 12px",
            cursor: "pointer"
          }}
        >
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          style={{
            margin: "5px",
            padding: "8px 12px",
            cursor: "pointer"
          }}
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default BrowseVehicles;