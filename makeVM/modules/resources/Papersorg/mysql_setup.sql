ALTER USER 'root'@'localhost' IDENTIFIED BY 'Its4321?!';
CREATE DATABASE papersorg;
USE papersorg;

CREATE TABLE `papers` (
    `id` CHAR(16) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `publisher` CHAR(16) NOT NULL,
    `price` INT NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
    `id` CHAR(16) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `privilege` INT NOT NULL,
    `password` CHAR(32) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE (`email`)
);

FLUSH PRIVILEGES;
