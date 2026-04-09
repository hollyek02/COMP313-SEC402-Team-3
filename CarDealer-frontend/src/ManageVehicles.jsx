import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
function ManageVehicles() {
    const [cars, setCars] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        
        description: ""
    });

    const [file, setFile] = useState(null);

    const [editingId, setEditingId] = useState(null);

    const fetchCars = () => {
        fetch("http://localhost:8084/api/cars",{credentials: "include"})
            .then((res) => res.json())
            .then((data) => setCars(data))
            .catch((error) => console.error("Error fetching cars:", error));
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId
        ? `http://localhost:8084/api/cars/${editingId}`
        : "http://localhost:8084/api/cars";

    const method = editingId ? "PUT" : "POST";

    try {

        // ❌ REMOVE JSON approach
        /*
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
        */

        // ✅ USE FORM DATA INSTEAD
        const formDataToSend = new FormData();

        formDataToSend.append("name", formData.name);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("description", formData.description);

        // ✅ add file
        if (file) {
            formDataToSend.append("file", file);
        }

        const response = await fetch(url, {
            method: method,
            credentials: "include",
            body: formDataToSend
        });

        if (response.ok) {
            fetchCars();

            // reset form
            setFormData({
                name: "",
                price: "",
                description: ""
            });

            setFile(null); // ✅ reset file

            setEditingId(null);
        } else {
            alert("Failed to save vehicle.");
        }

    } catch (error) {
        console.error("Error saving vehicle:", error);
        alert("Error saving vehicle.");
    }
};

   const handleEdit = (car) => {
    setFormData({
        name: car.name,
        price: car.price,
        description: car.description
    });

    // ❌ REMOVE THIS (since we no longer use filename)
    // image: car.image

    setEditingId(car.id);
};

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this vehicle?");
        if (!confirmed) return;

        try {
            const response = await fetch(`http://localhost:8084/api/cars/${id}`, {
                method: "DELETE",credentials: "include"
            });

            if (response.ok) {
                fetchCars();
            } else {
                alert("Failed to delete vehicle.");
            }
        } catch (error) {
            console.error("Error deleting vehicle:", error);
            alert("Error deleting vehicle.");
        }
    };

   const handleCancelEdit = () => {
    setEditingId(null);

    setFormData({
        name: "",
        price: "",
        description: ""
    });

    setFile(null); // ✅ reset file

    // ❌ REMOVE THIS
    // image: ""
};

    return (
        <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "40px", flex: 1 }}>
                <h1>Manage Vehicle Listings</h1>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        maxWidth: "600px",
                        marginBottom: "40px"
                    }}
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Vehicle Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                   { /*<input
                        type="text"
                        name="image"
                        placeholder="Image filename (example: 2026_RAV4.jpg)"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />*/}

     <input
    type="file"
    onChange={(e) => setFile(e.target.files[0])}
    required={!editingId}
/>

                    

                    

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        style={inputStyle}
                    />

                    <div style={{ display: "flex", gap: "10px" }}>
                        <button type="submit" style={primaryButton}>
                            {editingId ? "Update Vehicle" : "Add Vehicle"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                style={secondaryButton}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                {cars.length === 0 ? (
                    <p>No vehicles found.</p>
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
                                <th style={cellStyle}>Name</th>
                                <th style={cellStyle}>Price</th>
                                <th style={cellStyle}>Image</th>
                                <th style={cellStyle}>Description</th>
                                <th style={cellStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map((car) => (
                                <tr key={car.id}>
                                    <td style={cellStyle}>{car.id}</td>
                                    <td style={cellStyle}>{car.name}</td>
                                    <td style={cellStyle}>${car.price}</td>
                                    <td style={cellStyle}>
    <img 
        src={car.image} 
        alt={car.name}
        style={{ width: "100px", height: "60px", objectFit: "cover" }}
    />
</td>
                                    <td style={cellStyle}>{car.description}</td>
                                    <td style={cellStyle}>
                                        <button
                                            onClick={() => handleEdit(car)}
                                            style={{ ...primaryButton, marginRight: "10px", marginBottom:"10px",width:"90%" }}
                                        >
                                            Edit
                                        </button>
                                        
                                        <button
                                            onClick={() => handleDelete(car.id)}
                                            style={{...deleteButton,width:"90%"}}
                                        >
                                            Delete
                                        </button>
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

const inputStyle = {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px"
};

const primaryButton = {
    padding: "10px 16px",
    background: "#e4002b",
    border: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: "6px"
};

const secondaryButton = {
    padding: "10px 16px",
    background: "#666",
    border: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: "6px"
};

const deleteButton = {
    padding: "10px 16px",
    background: "black",
    border: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: "6px"
};

export default ManageVehicles;