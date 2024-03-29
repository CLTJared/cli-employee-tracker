-- Creates the database & table structure that is needed
-- -- -- -- -- -- -- -- -- --
-- Department
-- | id *
-- | name
-- Role
-- | id **
-- | title
-- | salary
-- | department_id *
-- Employee
-- | id
-- | first_name
-- | last_name
-- | role_id **
-- | manager_id
-- -- -- -- -- -- -- -- -- --
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE IF NOT EXISTS employees_db;

USE employees_db;

CREATE TABLE department (
    id      int         NOT NULL    AUTO_INCREMENT,
    name    VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id              INT         NOT NULL    AUTO_INCREMENT,
    title           VARCHAR(30) NOT NULL,
    salary          DECIMAL     NOT NULL,
    department_id   INT         NOT NULL,
    FOREIGN KEY(department_id)  REFERENCES department(id)   ON DELETE CASCADE,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id          INT         NOT NULL    AUTO_INCREMENT,
    first_name  VARCHAR(30) NOT NULL,
    last_name   VARCHAR(30) NOT NULL,
    role_id     INT         NOT NULL,
    manager_id  INT,
    FOREIGN KEY(role_id)    REFERENCES role(id) ON DELETE CASCADE,
    PRIMARY KEY(id)
);