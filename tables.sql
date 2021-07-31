CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

create table track ( 
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    username VARCHAR(50) NOT NULL UNIQUE, 
    b1 TEXT(5000), b2 TEXT(5000), 
    b3 TEXT(5000), b4 TEXT(5000), 
    b5 TEXT(5000), b6 TEXT(5000), 
    b7 TEXT(5000), b8 TEXT(5000), 
    b9 TEXT(5000), b10 TEXT(5000)
);

create table spending_saving ( 
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    username VARCHAR(50) NOT NULL UNIQUE, 
    b1 TEXT(5000), b2 TEXT(5000), 
    b3 TEXT(5000), b4 TEXT(5000), 
    b5 TEXT(5000), b6 TEXT(5000), 
    b7 TEXT(5000), b8 TEXT(5000), 
    b9 TEXT(5000), b10 TEXT(5000),
    dates TEXT(5000)
);

create table budget ( 
    id INT NOT NULL, 
    username VARCHAR(50) NOT NULL UNIQUE, 
    income FLOAT(10), 
    n_buckets INT(10),
    b1 TEXT(5000), b2 TEXT(5000), 
    b3 TEXT(5000), b4 TEXT(5000), 
    b5 TEXT(5000), b6 TEXT(5000), 
    b7 TEXT(5000), b8 TEXT(5000), 
    b9 TEXT(5000), b10 TEXT(5000)
);


use income;

select * from bu;

delete from users where id=3;

alter table track modify column b1 varchar(1000);

alter table track add dates TEXT(5000);
