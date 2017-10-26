-- Drop bamazon_db if it already exists currently --
DROP DATABASE IF EXISTS bamazon_db;

-- Create the bamazon_db database --
CREATE DATABASE bamazon_db;

--  Make database usable and react to code
USE bamazon_db;

-- Products table inside database
CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(10) NOT NULL,
PRIMARY KEY (item_id)
);

-- To select from products table
SELECT * FROM products;

-- Table products
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Sony Blu-Ray Player", "Electronics", 79.99, 100);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Apple TV 4k", "Electronics", 149.99, 250);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Amazon Firestick", "Electronics", 39.99, 150);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Impractical Jokers Seasons 1-6", "Entertainment", 49.99, 75);


INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Coming to America", "Entertainment", 9.99, 15);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Tumi 22-in Carry-On", "Luggage", 399.99, 5);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("OGIO Backpack", "Luggage", 35.99, 50);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Toaster Over", "Kitchen", 29.99, 25);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("George Foreman Grill", "Kitchen", 44.99, 150);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Vitamix", "Kitchen", 299.99, 7);



