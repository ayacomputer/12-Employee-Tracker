USE employees_db;
CREATE TABLE allInfo AS(
    SELECT employee.id AS id, 
    CONCAT(employee.first_name," ",employee.last_name) AS 'Full Name', 
    department.name AS 'department', 
    role.title AS 'role', 
    role.salary AS 'salary', 
    manager_id AS manager_id
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id);