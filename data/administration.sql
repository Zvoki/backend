
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    namn TEXT NOT NULL,
    SKU TEXT UNIQUE,
    pris TEXT NOT NULL
);
INSERT INTO products (id,namn,SKU, price)
VALUES
 ('id''namn', 'SKU', '199 SEK'),
 ('id''namn', 'SKU', '199 SEK'),
 ('id''namn', 'SKU', '199 SEK'),
 ('id','namn', 'SKU', '199 SEK'),
 ('id','namn', 'SKU', '199 SEK'),
 ('od','namn', 'SKU', '199 SEK'),
 ('id' ,'namn', 'SKU', '199 SEK'),
 ('id','namn', 'SKU', '199 SEK');


