DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);


CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY(department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

CREATE TABLE allInfo (
    SELECT employee.id AS id, 
    CONCAT(employee.first_name," ",employee.last_name) AS 'Full Name', 
    department.name AS 'department', 
    role.title AS 'role', 
    role.salary AS 'salary', 
    manager_id AS manager_id,
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id);
