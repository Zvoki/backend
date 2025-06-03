CREATE TABLE produkter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
     image_url TEXT NOT NULL,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    brand TEXT NOT NULL,
);

INSERT INTO produkter (image_url, namn, price, brand) VALUES
('https://example.com/image1.jpg', 'Svart T-Shirt', '199 SEK', 'Levis'),
('https://example.com/image2.jpg', 'Svart T-Shirt', '199 SEK', 'Levis'),
('https://example.com/image3.jpg', 'Svart T-Shirt', '199 SEK', 'Levis'),
('https://example.com/image4.jpg', 'Svart T-Shirt', '199 SEK', 'Levis'),
('https://example.com/image5.jpg', 'Svart T-Shirt', '199 SEK', 'Levis'),
('https://example.com/image6.jpg', 'Svart T-Shirt', '199 SEK', 'Levis'),
('https://example.com/image7.jpg', 'Svart T-Shirt', '199 SEK', 'Levis'),
('https://example.com/image8.jpg', 'Svart T-Shirt', '199 SEK', 'Levis');

DROP TABLE produkter;
