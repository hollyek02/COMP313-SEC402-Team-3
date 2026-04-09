✅ FULL DATABASE SCRIPT
-- =========================
-- DATABASE
-- =========================
CREATE DATABASE IF NOT EXISTS car_dealership;
USE car_dealership;

-- =========================
-- CAR TABLE
-- =========================
CREATE TABLE car (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price VARCHAR(100),
    image VARCHAR(255),
    description TEXT
);

INSERT INTO car (name, price, image, description)
VALUES
('2027 Toyota Highlander', '42000', '2027_Highlander.jpg', 'Spacious family SUV with modern safety features'),
('2026 Toyota RAV4', '32000', '2026_RAV4.jpg', 'Compact SUV with strong performance and reliability'),
('2026 Toyota bZ', '38000', '2026_bZ-2.jpg', 'Fully electric SUV with advanced technology'),
('2025 Toyota RAV4', '30000', '2025_RAV4.jpg', 'Versatile SUV perfect for city and outdoor driving'),
('2025 Toyota Camry', '29000', '2025_Camry.jpg', 'Comfortable midsize sedan with excellent fuel efficiency'),
('2024 Toyota Tacoma', '35000', '2024_Tacoma.jpg', 'Powerful pickup truck designed for off-road capability');

-- =========================
-- ADMIN TABLE
-- =========================
CREATE TABLE admins (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100),
    password VARCHAR(100)
);

INSERT INTO admins (username, password)
VALUES ('Rubiya', 'admin123');

-- =========================
-- USER TABLE (CUSTOMERS)
-- =========================
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'CUSTOMER'
);

-- =========================
-- INQUIRY TABLE
-- =========================
CREATE TABLE inquiry (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    car_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TEST DRIVE REQUEST
-- =========================
CREATE TABLE test_drive_request (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    preferred_date DATE NOT NULL,
    car_id BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- CUSTOMER VEHICLES
-- =========================
CREATE TABLE customer_vehicle (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    car_name VARCHAR(255),
    purchase_date DATE,
    status VARCHAR(50),
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =========================
-- SERVICE BOOKINGS
-- =========================
CREATE TABLE service_booking (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    vehicle_id BIGINT NOT NULL,
    service_date DATE NOT NULL,
    time_slot VARCHAR(50),
    service_type VARCHAR(100),
    status VARCHAR(50) DEFAULT 'BOOKED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES customer_vehicle(id) ON DELETE CASCADE
);