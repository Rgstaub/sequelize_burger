DROP DATABASE IF EXISTS burger_db;

CREATE DATABASE burger_db;
      
USE burger_db;
      
CREATE TABLE burgers (
    id INT(10) NOT NULL AUTO_INCREMENT,
    date TIMESTAMP,
    devoured BOOLEAN DEFAULT false,
    burger_name VARCHAR(128) DEFAULT "Anonymous",
    bun VARCHAR(128) NOT NULL DEFAULT "Sesame Seed",
    patty VARCHAR(128) DEFAULT "Beef",
    pickles BOOLEAN DEFAULT false,
    ketchup BOOLEAN DEFAULT false,
    mustard BOOLEAN DEFAULT false,
    onions BOOLEAN DEFAULT false,
    cheese BOOLEAN DEFAULT false,
    tomato BOOLEAN DEFAULT false,
    bacon BOOLEAN DEFAULT false,
    lettuce BOOLEAN DEFAULT false,
    special VARCHAR(128),
    PRIMARY KEY(id)
);  
    