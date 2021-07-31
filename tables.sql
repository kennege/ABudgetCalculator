CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

create table track ( 
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    username VARCHAR(50) NOT NULL UNIQUE, 
    b1 VARCHAR(50), b2 VARCHAR(50), 
    b3 VARCHAR(50), b4 VARCHAR(50), 
    b5 VARCHAR(50), b6 VARCHAR(50), 
    b7 VARCHAR(50), b8 VARCHAR(50), 
    b9 VARCHAR(50), b10 VARCHAR(50)
);

create table spending_saving ( 
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    username VARCHAR(50) NOT NULL UNIQUE, 
    b1 VARCHAR(50), b2 VARCHAR(50), 
    b3 VARCHAR(50), b4 VARCHAR(50), 
    b5 VARCHAR(50), b6 VARCHAR(50), 
    b7 VARCHAR(50), b8 VARCHAR(50), 
    b9 VARCHAR(50), b10 VARCHAR(50)
);

create table budget ( 
    id INT NOT NULL, 
    username VARCHAR(50) NOT NULL UNIQUE, 
    income FLOAT(10), 
    n_buckets INT(10),
    b1 VARCHAR(50), b2 VARCHAR(50), 
    b3 VARCHAR(50), b4 VARCHAR(50), 
    b5 VARCHAR(50), b6 VARCHAR(50), 
    b7 VARCHAR(50), b8 VARCHAR(50), 
    b9 VARCHAR(50), b10 VARCHAR(50)
);


use income;

select * from bu;

delete from users where id=3;

alter table track modify column b1 varchar(1000);

alter table track add dates varchar(10000);
