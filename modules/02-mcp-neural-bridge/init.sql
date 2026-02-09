CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO transactions (amount, category) VALUES 
(150.00, 'Food'),
(2000.00, 'Rent'),
(45.50, 'Transport');