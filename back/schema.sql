DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS stock;
DROP TABLE IF EXISTS user_stock;
DROP TABLE IF EXISTS favorite_stock;


CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cpf TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    balance INTEGER DEFAULT 100000
);

CREATE TABLE stock (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE user_stock (
    user_id INTEGER,
    stock_id INTEGER,
    quantity INTEGER,
    price INTEGER,
    PRIMARY KEY (user_id, stock_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (stock_id) REFERENCES stock(id)
);

CREATE TABLE favorite_stock (
    user_id INTEGER,
    stock_id INTEGER,
    PRIMARY KEY (user_id, stock_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (stock_id) REFERENCES stock(id)
);
