CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

create table buckets ( 
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    username VARCHAR(50) NOT NULL UNIQUE, 
    b1 VARCHAR(50), b2 VARCHAR(50), 
    b3 VARCHAR(50), b4 VARCHAR(50), 
    b5 VARCHAR(50), b6 VARCHAR(50), 
    b7 VARCHAR(50), b8 VARCHAR(50), 
    b9 VARCHAR(50), b10 VARCHAR(50)
);

create table track ( 
    id INT NOT NULL, 
    username VARCHAR(50) NOT NULL UNIQUE, 
    income FLOAT(10), 
    b1 FLOAT(10), b2 FLOAT(10), 
    b3 FLOAT(10), b4 FLOAT(10), 
    b5 FLOAT(10), b6 FLOAT(10), 
    b7 FLOAT(10), b8 FLOAT(10), 
    b9 FLOAT(10), b10 FLOAT(10)
);


use income;

select * from buckets;

delete from users where id=3;
