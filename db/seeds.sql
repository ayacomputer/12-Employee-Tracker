USE employees_db;
INSERT INTO department (name)
VALUES ("department A"),
("department B"),
("department C"),
("department D"),
("department E");

INSERT INTO role (title, salary, department_id)
VALUES ("role A", 100,1),
       ("role B", 200,2),
       ("role C", 300,3),
       ("role D", 400,4),
       ("role E", 500,5);

       

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Elliot", "Smith",1,null),
       ("Amira", "Afzal",2,1),
       ("Christoper", "Lee",3,2),
       ("Verónica", "Rodriguez",4,3),
       ("Igor", "Stein",5,4);
       
