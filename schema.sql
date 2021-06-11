DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
id INT NOT NULL auto_increment,
name VARCHAR(50) NOT NULL,
primary key (id)
);

CREATE TABLE role (
id INT NOT NULL auto_increment,
title VARCHAR(30) NOT NULL,
salary decimal NOT NULL,
department_id INT NOT NULL,
primary key (id)
);

CREATE TABLE employee (
id INT NOT NULL auto_increment,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT NOT NULL,
primary key (id)
);