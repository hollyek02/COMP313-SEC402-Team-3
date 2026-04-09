import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    return (
        <nav style={styles.nav}>
            <div style={styles.logo} onClick={() => navigate("/")}>
                TOYOTA
            </div>

            <div style={styles.menu}>
                <button style={styles.button} onClick={() => navigate("/browse-vehicles")}>
                    Browse Vehicles
                </button>

                <button
                    style={styles.button}
                    onClick={() => navigate("/submit-form")}
                >
                    Submit Inquiry
                </button>

                <button
                    style={styles.button}
                    onClick={() => navigate("/request-test-drive")}
                >
                    Request Test Drive
                </button>

               

                

                <button style={styles.button}
                onClick={() => navigate("/")}
                >
                    Home
                </button>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 40px",
        background: "black",
        color: "white",
        alignItems: "center"
    },

    logo: {
        fontSize: "22px",
        fontWeight: "bold",
        cursor: "pointer"
    },

    menu: {
        display: "flex",
        alignItems: "center",
        gap: "10px"
    },

    button: {
        padding: "8px 15px",
        background: "#e4002b",
        border: "none",
        color: "white",
        cursor: "pointer"
    },

    sign: {
        padding: "8px 15px",
        background: "#c62828",
        border: "none",
        color: "white",
        cursor: "pointer"
    }
};

export default Navbar;