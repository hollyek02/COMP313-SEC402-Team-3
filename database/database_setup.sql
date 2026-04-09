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


CREATE TABLE inquiry (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    car_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE test_drive_request (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    preferred_date DATE NOT NULL,
    car_id BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE admins (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100),
    password VARCHAR(100)
);

INSERT INTO admins (username, password)
VALUES ('Rubiya', 'admin123');
