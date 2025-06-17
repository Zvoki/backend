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
('Svart-T Shirt', 'SKU001', '199 SEK'),
 ('Vit-T Shirt', 'SKU002', '199 SEK'),
 ('Grön-T Shirt', 'SKU003', '199 SEK'),
 ('Gray-T Shirt', 'SKU004', '199 SEK'),
 ('Rosa-T Shirt', 'SKU005', '199 SEK'),
 ('Blå-T Shirt', 'SKU006', '199 SEK'),
 ('Brun-T Shirt', 'SKU007', '199 SEK'),
 ('Röd-T Shirt', 'SKU008', '199 SEK');
