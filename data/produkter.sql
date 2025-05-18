CREATE TABLE produkter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    brand TEXT NOT NULL
);

INSERT INTO produkter (name, price, brand) VALUES
('Svart T-Shirt', '199 SEK', 'Levis'),
('Svart T-Shirt', '199 SEK', 'Levis'),
('Svart T-Shirt', '199 SEK', 'Levis'),
( 'Svart T-Shirt', '199 SEK', 'Levis'),
('Svart T-Shirt', '199 SEK', 'Levis'),
('Svart T-Shirt', '199 SEK', 'Levis'),
('Svart T-Shirt', '199 SEK', 'Levis'),
('Svart T-Shirt', '199 SEK', 'Levis');

DROP TABLE produkter;
