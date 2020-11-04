  

DROP DATABASE IF EXISTS employee_appDB;
CREATE DATABASE employee_appDB;

USE employee_appDB;

/* Create new table for role with a primary key that auto-increments, and a text field */
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(7,2),
    department_id INT,
    PRIMARY KEY (id)

); 


/* Create new table for employee with a primary key that auto-increments, and a text field */
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,  
  role_id INT,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

 CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30), 
    PRIMARY KEY (id)
  );